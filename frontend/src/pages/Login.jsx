import { useState, useEffect } from "react";
import API from "../api/axios";
import { useNavigate, Link } from "react-router-dom";
import "../App.css";

export default function Login() {
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    // Clear any existing token to force manual login
    localStorage.removeItem("token");
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/login", form);
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (error) {
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="container">
      <div>
        <h1 className="auth-header">Student Grievance Management System</h1>
        <div className="card auth-card">
          <h2>Login</h2>

          <form onSubmit={submit}>
            <input
              type="email"
              placeholder="Email"
              value={form.email || ""}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={form.password || ""}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
            <button>Login</button>
          </form>

          <p>
            Don't have an account? <Link to="/">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
}