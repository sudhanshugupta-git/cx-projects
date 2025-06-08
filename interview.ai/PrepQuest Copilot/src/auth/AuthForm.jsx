import React, { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import "./AuthForm.css";

const AuthForm = () => {
  const { login } = useAuth();
  const [isSignup, setIsSignup] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const url = isSignup
      ? "http://localhost:3001/api/v1/user/signup"
      : "http://localhost:3001/api/v1/user/signin";
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Auth failed");
      if (isSignup) {
        setIsSignup(false); // Switch to sign in after successful signup
        // setForm({ name: "", email: "", password: "" }); // Optionally clear form
        setError("Signup successful! Please sign in.");
      } else {
        login(data.user, data.token);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-form-container">
      <h2>{isSignup ? "Sign Up" : "Sign In"}</h2>
      <form onSubmit={handleSubmit}>
        {isSignup && (
          <input
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
          />
        )}
        <input
          name="email"
          placeholder="Email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          name="password"
          placeholder="Password"
          type="password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button type="submit">{isSignup ? "Sign Up" : "Sign In"}</button>
      </form>
      <button onClick={() => setIsSignup((v) => !v)} className="switch-btn">
        {isSignup
          ? "Already have an account? Sign In"
          : "Don't have an account? Sign Up"}
      </button>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default AuthForm;
