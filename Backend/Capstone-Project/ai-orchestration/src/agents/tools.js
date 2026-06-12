import axios from "axios";
import { tool } from "langchain";
import { write } from "fs";
import * as z from "zod";

export const listFiles = tool(
  async ({}, config) => {
    const writer = config.writer;
    writer("Invoking listFiles tool\n");
    const response = await axios.get(
      `http://sandbox-service-${config.context.projectId}:3000/list-files`,
    );
    writer("Received response from listFiles tool\n"+ response.data.files.join(", ") + "\n");
    return JSON.stringify(response.data.files);
  },
  {
    name: "list_files",
    description:
      "List all files in the project directory. This is useful for understanding what files are available to work with.",
    schema: z.object({}),
  },
);

export const readFile = tool(
  async ({ files = [] }, config) => {
    const writer = config.writer;
    writer(`Invoking readFile tool with files: ${files.join(", ")}\n`);
    const response = await axios.get(
      `http://sandbox-service-${config.context.projectId}:3000/read-files?files=${files.join(",")}`,
    );

    writer("Received response from readFile tool\n");
    return JSON.stringify(response.data);
  },
  {
    name: "read_files",
    description:
      "Read the contents of specified files. This is useful for understanding the content of files that are relevent to the task in hand.",
    schema: z.object({
      files: z
        .array(z.string())
        .nonempty("At least one file must be specified")
        .describe(
          "The list of all files absolute paths to read. The file paths should be relative to the project directory.",
        ),
    }),
  },
);

export const updateFile = tool(
  async ({ files }, config) => {
    const writer = config.writer;
    writer(`Invoking updateFile tool with files: ${files.map(f => f.file).join(", ")}\n`);
    const response = await axios.patch(
      `http://sandbox-service-${config.context.projectId}:3000/update-files`,
      { updates: files },
    );

    writer("Received response from updateFile tool\n");
    return JSON.stringify(response.data.results);
  },
  {
    name: "update_file",
    description:
      "Update the content of a specified file. This is useful for making changes to files based on the requirements of the task. This tool can also be used to create new files if the specified file does not already exist.",
    schema: z.object({
      files: z.array(z.object({
                file: z.string().describe("The absolute path of the file to update"),
                content: z.string().describe("The new content for the file, the content should support json format.")
            })).describe("The list of files to update and their new contents")
        })
  },
);
