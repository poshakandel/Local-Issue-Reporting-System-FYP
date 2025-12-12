import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";

export default function Signup() {
  const { t, i18n } = useTranslation();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert(t("Passwords do not match!"));
      return;
    }

    try {
      await axios.post("/api/auth/signup", form);
      alert(t("Account created successfully!"));
    } catch (error) {
      alert("Error: " + error.response?.data?.message);
    }
  };

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <div className="min-h-screen flex">

      {/* LEFT SECTION */}
      <div className="w-1/2 flex flex-col justify-center p-16">

        {/* BACK BUTTON */}
       <Link
  to="/"
  className="w-fit mb-8 px-2 py-1 text-xs border border-gray-300 rounded-md shadow-sm hover:bg-gray-100 transition"
>
  ← {t("Back")}
</Link>


        {/* LANGUAGE SWITCHER */}
        <div className="flex gap-3 absolute top-6 right-6">
          <button
            onClick={() => changeLanguage("en")}
            className="px-3 py-1 border rounded hover:bg-gray-100"
          >
            EN
          </button>
          <button
            onClick={() => changeLanguage("np")}
            className="px-3 py-1 border rounded hover:bg-gray-100"
          >
            NP
          </button>
        </div>

        <h1 className="text-4xl font-bold mb-2">{t("Create Account")}</h1>
        <p className="text-sm mb-6">
          {t("Already have an account?")}{" "}
          <Link to="/login" className="text-blue-500 font-semibold">
            {t("Login")}
          </Link>
        </p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder={t("Full Name")}
            className="w-full p-3 border rounded-lg"
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder={t("Email")}
            className="w-full p-3 border rounded-lg"
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="phone"
            placeholder={t("Phone Number")}
            className="w-full p-3 border rounded-lg"
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder={t("Password")}
            className="w-full p-3 border rounded-lg"
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder={t("Confirm Password")}
            className="w-full p-3 border rounded-lg"
            onChange={handleChange}
            required
          />

          <button className="w-full bg-gradient-to-r from-teal-500 to-blue-600 text-white p-3 rounded-lg font-semibold">
            {t("Sign Up")} →
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

        <h1 className="text-4xl font-bold mt-6">{t("Join the community!")}</h1>
        <p className="text-lg mt-3 max-w-md text-center">
          {t("Be a part of a transparent and responsive local governance experience.")}
        </p>
      </div>
    </div>
  );
}
