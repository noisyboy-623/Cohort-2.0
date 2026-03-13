import React, { useState } from "react";
import "../style/login.scss";
import FromGroup from "../components/FormGroup";
import { Link, Navigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router";

const Login = () => {
  const { handleLogin } = useAuth();

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    await handleLogin({ email, password });
    navigate("/");
  }

  return (
    <main className="auth-page">
      <div className="form-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <FromGroup
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            label="Email"
            placeholder="Enter your email"
          />
          <FromGroup
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            label="Password"
            placeholder="Enter your password"
          />
          <button className="button" type="submit">
            Login
          </button>
        </form>
        <p className="redirect">
          Don't have an account?<Link to="/register">Register here</Link>
        </p>
      </div>
    </main>
  );
};

export default Login;
