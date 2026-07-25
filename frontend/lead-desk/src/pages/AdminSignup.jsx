import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { API_BASE_URL } from "../config";
export default function AdminSignup() {
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

  const handleSignup = async (e) => {
    e.preventDefault();

    setLoading(true);

  try {
    const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000").replace(/\/$/, "");

    const response = await fetch(
      `${API_BASE_URL}/admin/signup`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );
      const data = await response.json();

      if (!response.ok) {
        alert(data.detail);
        return;
      }

      alert("Admin registered successfully!");

      navigate("/admin/login");

    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex justify-center items-center">

      <form
        onSubmit={handleSignup}
        className="bg-white p-10 rounded-2xl shadow-xl w-[420px]"
      >

        <div className="text-center">

  

  <h1 className="text-4xl font-bold mt-5 text-gray-900">
    Create Acoount
  </h1>

  <p className="mt-3 text-center text-gray-500 text-sm leading-6">
    Create your admin account to securely manage leads and access the dashboard.
  </p>

</div>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border rounded-xl px-4 py-3 mb-5"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full border rounded-xl px-4 py-3 mb-6"
          required
        />

        <button
          className="w-full bg-indigo-600 text-white py-3 rounded-xl"
        >
          {loading ? "Creating..." : "Create Admin"}
        </button>

        <p className="text-center mt-6">
          Already have an account?{" "}
          <Link
            className="text-indigo-600 font-semibold"
            to="/admin/login"
          >
            Login
          </Link>
        </p>

      </form>

    </div>
  );
}