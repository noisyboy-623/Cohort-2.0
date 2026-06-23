import "dotenv/config";
import express from "express";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import passport from "passport";
import cookies from "cookie-parser";
import morgan from "morgan";
import authRoutes from "./routes/auth.routes.js";
import cors from "cors";
import jwt from 'jsonwebtoken'

const app = express();

app.use(morgan("dev"));
app.use(cookies());
app.use(cors({
  origin: "http://localhost:5173",
    credentials: true
}));
app.use(passport.initialize());

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, profile);
    },
  )
);

app.set('trust proxy', true)
app.get("/_status/healthz", (req, res) => {
  res.status(200).send("OK");
});

app.get("/_status/readyz", (req, res) => {
  res.status(200).send("OK");
});

app.use("/api/auth", authRoutes);

export default app;
