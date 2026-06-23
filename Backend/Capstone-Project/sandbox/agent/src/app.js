import express from "express";
import morgan from "morgan";
import fs from "fs";
import path from "path";
import { Server } from "socket.io";
import http from "http";
import pty from "node-pty";
import os from "os";
import cors from "cors";

const WORKING_DIR = path.resolve(process.env.WORKING_DIR || "/workspace");

const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PATCH"],
  },
});

app.use(morgan("dev"));
app.use(cors({
    methods: [ "GET", "POST", "PATCH", "DELETE" ],
    origin: "*",
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Hello from sandbox agent!",
    status: "success",
  });
});

const shell = process.env.SHELL || 'bash';
let ptyProcess;

try {
  ptyProcess = pty.spawn(shell, [], {
    name: 'xterm-color',
    cols: 80,
    rows: 30,
    cwd: WORKING_DIR,
    env: process.env
  });

  ptyProcess.onData(data => {
    console.log("Emitting terminal-output:", data.toString().slice(0, 50));
    io.emit("terminal-output", data.toString());
  });

  ptyProcess.onExit(({ exitCode, signal }) => {
    console.log(`PTY process exited with code ${exitCode} and signal ${signal}`);
    io.emit("terminal-exit", { exitCode, signal });
  });

  console.log("PTY process initialized successfully");
} catch (error) {
  console.error("Failed to spawn PTY process:", error);
}

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  socket.on("terminal-input", (data) => {
    if (ptyProcess) {
      ptyProcess.write(data);
      console.log("Terminal input written:", data.slice(0, 50));
    } else {
      socket.emit("terminal-error", "PTY process not available");
    }
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });

  socket.on("error", (error) => {
    console.error("Socket error:", error);
  });
});

/**
 * @route GET /list-files
 * @description Lists all files in the working directory and its subdirectories. Returns a JSON object with the file paths relative to the working directory. exclude directories like node_modules, .git,dist, etc.
 * - eg. {
 *     "files": [
 *         "file1.txt",
 *         "src/file2.txt",
 *         "src/subdir/file3.txt"
 *     ]
 * }
 */
app.get("/list-files", async (req, res) => {
  const excludedDirs = ["node_modules", ".git", "dist", "build"];
  const walkDir = async (dir, baseDir) => {
    let results = [];
    const list = await fs.promises.readdir(dir);
    for (const file of list) {
      const filePath = path.join(dir, file);
      const stat = await fs.promises.stat(filePath);
      if (stat && stat.isDirectory()) {
        if (!excludedDirs.includes(file)) {
          const subDirResults = await walkDir(filePath, baseDir);
          results = results.concat(subDirResults);
        }
      } else {
        results.push(path.relative(baseDir, filePath).replace(/\\/g, "/"));
      }
    }
    return results;
  };

  try {
    const files = await walkDir(WORKING_DIR, WORKING_DIR);
    res.status(200).json({
      message: "Files listed successfully",
      files,
    });
  } catch (err) {
    res.status(500).json({
      message: `Error listing files: ${err.message}`,
      status: "error",
    });
  }
});

/**
 * @route GET /read-files
 * @description Reads the content of all files requested in the query parameter 'files' and returns their content as a JSON object.
 * - eg. /read-files?files=file1.txt,/src/file2.txt
 */
app.get("/read-files", async (req, res) => {
  const files = req.query.files;

  if (!files) {
    return res.status(400).json({
      message: "No files specified in query parameter",
      status: "error",
    });
  }

  const fileList = files.split(",");
  const resolvedWorkingDir = path.resolve(WORKING_DIR);

  const results = await Promise.all(
    fileList.map(async (file) => {
      const safeFile = file.replace(/\\/g, path.sep);
      const filePath = path.resolve(resolvedWorkingDir, safeFile);
      const normalizedWorkingDir = resolvedWorkingDir.replace(/\\/g, "/");
      const normalizedFilePath = filePath.replace(/\\/g, "/");
      const responseKey = normalizedFilePath.replace(normalizedWorkingDir, "");

      try {
        const content = await fs.promises.readFile(filePath, "utf-8");
        return {
          [responseKey]: content,
        };
      } catch (err) {
        return {
          [responseKey]: `Error reading file: ${err.message}`,
        };
      }
    }),
  );

  res.status(200).json({
    message: "File contents",
    files: results,
  });
});

/**
 * @route PATCH /update-files
 * @description Updates the content of files specified in the request body. The request body should container a property 'updates' with a JSON Array of object, each object should have a 'file' property specifying the file path (relative to the working directory) and a 'content' property specifying the new content for the file.
 */
app.patch("/update-files", async (req, res) => {
  const updates = req.body.updates;

  if (!updates || !Array.isArray(updates)) {
    return res.status(400).json({
      message:
        'Invalid request body. Expected a JSON object with an "updates" property containing an array of file updates.',
      status: "error",
    });
  }

  const resolvedWorkingDir = path.resolve(WORKING_DIR);

  const results = await Promise.all(
    updates.map(async (update) => {
      const { file, content } = update;
      const safeFile = file.replace(/\\/g, path.sep);
      const filePath = path.resolve(resolvedWorkingDir, safeFile);
      try {
        console.log(path.dirname(filePath), filePath);

        await fs.promises.mkdir(path.dirname(filePath), { recursive: true });
        await fs.promises.writeFile(filePath, content, "utf-8");
        return {
          [filePath.replace(/\\/g, "/")]: "File updated successfully",
        };
      } catch (err) {
        return {
          [filePath.replace(/\\/g, "/")]: `Error updating file: ${err.message}`,
        };
      }
    }),
  );

  res.status(200).json({
    message: "File update results",
    results,
  });
});

/**
 * @route POST /create-files
 * @description Creates new files with the content specified in the request body. The request body should contain a property 'files' with a JSON Array of objects, each object should have a 'file' property specifying the file path (relative to the working directory) and a 'content' property specifying the content for the new file.
 */
app.post("/create-files", async (req, res) => {
  const files = req.body.files;

  if (!files || !Array.isArray(files)) {
    return res.status(400).json({
      message:
        'Invalid request body. Expected a JSON object with a "files" property containing an array of file objects.',
      status: "error",
    });
  }

  const resolvedWorkingDir = path.resolve(WORKING_DIR);

  const results = await Promise.all(
    files.map(async (fileObj) => {
      const { file, content } = fileObj;
      const safeFile = file.replace(/\\/g, path.sep);
      const filePath = path.resolve(resolvedWorkingDir, safeFile);
      try {
        await fs.promises.mkdir(path.dirname(filePath), { recursive: true });
        await fs.promises.writeFile(filePath, content, "utf-8");
        return {
          [filePath.replace(/\\/g, "/")]: "File created successfully",
        };
      } catch (err) {
        return {
          [filePath.replace(/\\/g, "/")]: `Error creating file: ${err.message}`,
        };
      }
    }),
  );

  res.status(200).json({
    message: "File creation results",
    results,
  });
});

export default httpServer;
