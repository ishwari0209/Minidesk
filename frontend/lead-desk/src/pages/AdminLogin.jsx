import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
  
  const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000").replace(/\/$/, "");

  const response = await fetch(`${API_BASE_URL}/admin/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

      const data = await response.json();

      if (!response.ok) {
        alert(data.detail);
        setLoading(false);
        return;
      }

      // Save JWT token
      localStorage.setItem("token", data.access_token);

      alert("Login Successful!");

      navigate("/admin/dashboard");

    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-5">

      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-10">

        <div className="text-center">

          <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-500 flex items-center justify-center text-white text-2xl font-bold">
            L
          </div>

          <h1 className="text-4xl font-bold mt-5 text-gray-900">
            Admin Login
          </h1>

          <p className="text-gray-500 mt-2">
            Login to access the LeadDesk dashboard
          </p>

        </div>

        <form onSubmit={handleLogin} className="mt-8 space-y-5">

          <div>
            <label className="font-semibold">
              Email Address
            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-2 w-full border rounded-xl px-4 py-3 outline-none focus:border-indigo-600"
            />
          </div>

          <div>
            <label className="font-semibold">
              Password
            </label>

            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
              className="mt-2 w-full border rounded-xl px-4 py-3 outline-none focus:border-indigo-600"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-500 text-white font-semibold hover:opacity-90 transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        <div className="text-center mt-6">

          <p className="text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/admin/signup"
              className="text-indigo-600 font-semibold hover:underline"
            >
              Sign Up
            </Link>
          </p>

          <div className="mt-4">
            <Link
              to="/"
              className="text-gray-500 hover:text-indigo-600"
            >
              ← Back to Landing Page
            </Link>
          </div>

        </div>

      </div>

    </div>
  );
}