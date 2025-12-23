import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import authApi from "../api/authApi";
import { AuthContext } from "../context/AuthContext";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [form, setForm] = useState({
    username: "",
    password: "",
    storeId: "" 
  });

  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.storeId) {
      setError("Please select a store");
      return;
    }

    try {
      const res = await authApi.login({
        username: form.username,
        password: form.password,
        // storeId: Number(form.storeId) 
      }
    );

      sessionStorage.setItem("storeId", form.storeId);

      login({
        ...res.data,
        storeId: form.storeId 
      });

      navigate("/");
    } catch (err) {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow" style={{ width: "400px" }}>
        <h3 className="text-center mb-3">Login</h3>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>


          <div className="mb-3">
            <label className="form-label">Username</label>
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
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>


          <div className="mb-3">
            <label className="form-label">Select Store</label>
            <select
              className="form-select"
              name="storeId"
              value={form.storeId}
              onChange={handleChange}
              required
            >
              <option value="">-- Choose Store --</option>
              <option value="211">Flower Store</option>
              <option value="212">Medical Store</option>
              <option value="213">Grocery Store</option>
              <option value="214">Electronics Store</option>
            </select>
          </div>


          <button className="btn btn-primary w-100 mt-2">Login</button>
        </form>


        <p className="text-center mt-3">
          Don’t have an account?{" "}
          <span
            className="text-primary"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/register")}
          >
            Create an account
          </span>
        </p>
      </div>
    </div>
  );
}
