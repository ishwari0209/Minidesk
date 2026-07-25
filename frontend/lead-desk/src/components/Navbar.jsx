import { LayoutDashboard } from "lucide-react";
import { Link } from "react-router-dom";
export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 ">
      <nav className="max-w-7xl mx-auto bg-white/90 backdrop-blur-md rounded-2xl shadow-lg px-8 py-3 flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-500 flex items-center justify-center text-white">
            <LayoutDashboard size={20} />
          </div>

          <h1 className="text-3xl font-bold text-slate-900">
            Lead<span className="text-indigo-600">Desk</span>
          </h1>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-10 font-medium text-gray-700">
          {/* <a href="#" className="hover:text-indigo-600 transition-colors">
            Home
          </a> */}

          {/* <a href="#" className="hover:text-indigo-600 transition-colors">
            Features
          </a>

          <a href="#" className="hover:text-indigo-600 transition-colors">
            How It Works
          </a>

          <a href="#" className="hover:text-indigo-600 transition-colors">
            Contact
          </a> */}
        </div>

        {/* Button */}
        <Link
  to="/admin/login"
  className="bg-gradient-to-r from-indigo-600 to-blue-500 px-8 py-3 rounded-xl text-white font-semibold shadow-lg hover:opacity-90 transition"
>
  Admin Login
</Link>

      </nav>
    </header>
  );
}