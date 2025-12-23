import { useState } from "react";
import authApi from "../api/authApi";

export default function RegisterPage() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    storeId: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await authApi.register(form);
      window.location.href = "/login";
    } catch (err) {
      setError("Registration failed");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow" style={{ width: "450px" }}>
        <h3 className="text-center mb-3">Register</h3>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          
          <div className="mb-3">
            <label>Store</label>
            <select
              className="form-control"
              name="storeId"
              value={form.storeId}
              onChange={handleChange}
              required
            >
              <option value="">Select Store</option>
              <option value="211">Flower Store</option>
              <option value="212">Medical Store</option>
              <option value="213">Grocery Store</option>
              <option value="214">Electronics Store</option>
            </select>
          </div>

          <div className="mb-3">
            <label>Username</label>
            <input
              type="text"
              className="form-control"
              name="username"
              value={form.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <button className="btn btn-success w-100 mt-2">Register</button>
        </form>
      </div>
    </div>
  );
}
