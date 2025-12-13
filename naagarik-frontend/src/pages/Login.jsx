import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";
import logo from "../assets/naagarik-logo.png";

export default function Login() {
  const { t, i18n } = useTranslation();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/auth/login", form);
      alert("Logged in!");
    } catch (error) {
      alert("Error: " + error.response?.data?.message);
    }
  };

  const changeLanguage = (lang) => i18n.changeLanguage(lang);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-teal-50 via-white to-blue-100">
      <header className="w-full bg-white/80 backdrop-blur-lg shadow-md border-b border-teal-200 fixed top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-3">
            <img
              src={logo}
              alt="Naagarik Logo"
              className="h-9 w-auto object-contain"
            />
          </Link>

          <select
            onChange={(e) => changeLanguage(e.target.value)}
            value={i18n.language}
            className="px-5 py-2 rounded-full bg-white border border-teal-300 text-teal-700 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
          >
            <option value="en">English</option>
            <option value="np">नेपाली</option>
          </select>
        </div>
      </header>

      <main className="flex flex-1 pt-28">
        <div className="w-1/2 flex flex-col justify-center px-16">
          <Link
            to="/"
            className="w-fit mb-8 px-2 py-1 text-xs border border-teal-300 text-teal-700 rounded-md hover:bg-teal-50 transition"
          >
            ← {t("Back")}
          </Link>

          <h1 className="text-4xl font-bold mb-2 text-teal-900">
            {t("Welcome back")}
          </h1>

          <p className="text-sm mb-6 text-slate-700">
           {t("dontHaveAccount")}{" "}
            <Link to="/register" className="text-teal-600 font-semibold">
              {t("Sign Up")}
            </Link>
          </p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder={t("Email")}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-teal-400"
              onChange={handleChange}
            />

            <input
              type="password"
              name="password"
              placeholder={t("Password")}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-teal-400"
              onChange={handleChange}
            />

            <button className="w-full bg-gradient-to-r from-teal-500 to-blue-600 text-white p-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition">
              {t("Login")} →
            </button>
          </form>
        </div>

        <div className="w-1/2 bg-gradient-to-br from-teal-400 to-blue-600 flex flex-col justify-center items-center text-white p-10">
          <div className="bg-white/20 p-6 rounded-2xl">
            <svg width="50" height="50" fill="white">
              <circle cx="25" cy="25" r="25" opacity="0.3" />
            </svg>
          </div>

          <h1 className="text-4xl font-bold mt-6">
            {t("Report. Track. Resolve.")}
          </h1>

          <p className="text-lg mt-3 max-w-md text-center">
            {t(
              "Join the community-driven platform that makes local governance transparent and responsive."
            )}
          </p>
        </div>
      </main>
    </div>
  );
}
