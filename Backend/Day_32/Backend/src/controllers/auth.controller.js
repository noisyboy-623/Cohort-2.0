import { userModel } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { sendEmail } from "../services/mail.service.js";

export async function registerController(req, res) {
  const { username, email, password } = req.body;

  const isUserAlreadyExists = await userModel.findOne({
    $or: [{ email }, { username }],
  });

  if (isUserAlreadyExists) {
    return res.status(400).json({
      message: "User with this email or username already exists",
      success: false,
      err: "User already exists",
    });
  }

  const user = await userModel.create({ username, email, password });
  const emailVerificaton = jwt.sign(
    {
      email: user.email,
    },
    process.env.JWT_SECRET,
  );

  await sendEmail({
    to: email,
    subject: "Welcome to Perplexity!",
    html: `
                <p>Hi ${username},</p>
                <p>Thank you registering at <strong>Perplexity</strong>, We're excited to have you onboard!</p>
                <P>Please verify your email by clicking on the link below: </p>
                <a href="http://localhost:3000/api/auth/verify-email/?token=${emailVerificaton}">Verify Email </a>
                <p> If it wasn't you , please ignore this email. </p>
                <p>Best Regards, <br>The Perplexity Team </p>
                `,
  });

  return res.status(201).json({
    message: "User registered successfully",
    success: true,
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  });
}

export async function verifyEmail(req, res) {
  const { token } = req.query;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findOne({
      email: decoded.email,
    });
    if (!user) {
      return res.status(400).json({
        message: "Invalid token",
        success: false,
        err: "User not found",
      });
    }

    user.verified = true;
    await user.save();

    const html = `
  <h1> Email verified successfully!</h1>
  <p> Your email has been verified. You can now login to your account. </p>
  <a href="http://localhost:3000/api/auth/login">Go to login. </a>
  `;

    return res.send(html);
  } catch (err) {
    return res.status(400).json({
      message: "Invalid or expired token",
      success: false,
      err: err.message,
    });
  }
}

export async function loginController(req, res) {
  const { email, password } = req.body;

  const user = await userModel.findOne({
    email
  });

  if (!user) {
    return res.status(400).json({
      message: "Invalid email or password",
      success: false,
      err: "User not found",
    });
  }
  const isPasswordMatch = await user.comparePassword(password);

  if (!isPasswordMatch) {
    return res.status(400).json({
      message: "Invalid email or password",
      success: false,
      err: "Incorrect password",
    });
  }

  if (!user.verified) {
    return res.status(400).json({
      message: "Please verify your email before logging in",
      success: false,
      err: "Email not verified",
    });
  }

  const token = jwt.sign(
    {
      id:user._id,
      username: user.username,
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" },
  );

  res.cookie("token", token);

  res.status(201).json({
    message: "User logged-in successfully",
    success: true,
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  });
}

export async function getMeController(req, res) {

    const userId = req.user.id
    console.log(req.user)

    const user = await userModel.findById(userId).select("-password")

    if(!user){
        return res.status(404).json({
            message: "User not found",
            success: false,
            err: "User not found"
        })
    }

    res.status(200).json({
        message: "User details fetched successfully",
        success: true,
        user
    })
}
