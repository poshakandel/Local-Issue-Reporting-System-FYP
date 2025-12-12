import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";

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

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <div className="min-h-screen flex relative">

      {/* LANGUAGE BUTTONS */}
      <div className="flex gap-3 absolute top-6 right-6 z-10">
        <button
          onClick={() => changeLanguage("en")}
          className="px-3 py-1 border rounded-lg bg-white/80 hover:bg-white"
        >
          EN
        </button>
        <button
          onClick={() => changeLanguage("np")}
          className="px-3 py-1 border rounded-lg bg-white/80 hover:bg-white"
        >
          NP
        </button>
      </div>

      {/* LEFT SECTION */}
      <div className="w-1/2 flex flex-col justify-center p-16 relative">

        {/* BACK BUTTON */}
       <Link
  to="/"
  className="w-fit mb-8 px-2 py-1 text-xs border border-gray-300 rounded-md shadow-sm hover:bg-gray-100 transition"
>
  ← {t("Back")}
</Link>


        <h1 className="text-4xl font-bold mb-2">{t("Welcome back")}</h1>

        <p className="text-sm mb-6">
          {t("Don’t have an account?")}{" "}
          <Link to="/signup" className="text-blue-500 font-semibold">
            {t("Sign Up")}
          </Link>
        </p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder={t("Email")}
            className="w-full p-3 border rounded-lg"
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder={t("Password")}
            className="w-full p-3 border rounded-lg"
            onChange={handleChange}
          />

          <button className="w-full bg-gradient-to-r from-teal-500 to-blue-600 text-white p-3 rounded-lg font-semibold">
            {t("Login")} →
          </button>
        </form>
      </div>

      {/* RIGHT SECTION */}
      <div className="w-1/2 bg-gradient-to-br from-teal-400 to-blue-600 flex flex-col justify-center items-center text-white p-10">
        <div className="bg-white/20 p-6 rounded-2xl">
          <svg width="50" height="50" fill="white">
            <circle cx="25" cy="25" r="25" opacity="0.3" />
          </svg>
        </div>

        <h1 className="text-4xl font-bold mt-6">{t("Report. Track. Resolve.")}</h1>

        <p className="text-lg mt-3 max-w-md text-center">
          {t(
            "Join the community-driven platform that makes local governance transparent and responsive."
          )}
        </p>
      </div>
    </div>
  );
}
