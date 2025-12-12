import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import logo from "../assets/naagarik-logo.png";

const LandingPage = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-teal-50 via-white to-blue-100">
      {/* Header */}
      <header className="w-full bg-white/80 backdrop-blur-lg shadow-md border-b border-teal-200 fixed top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img
              src={logo}
              alt="Naagarik Logo"
              className="h-9 w-auto object-contain"
            />
          </div>

          {/* Language Switcher */}
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

      {/* Hero Section */}
      <main className="flex-1 flex items-center justify-center px-6 pt-32 pb-20">
        <div className="text-center max-w-3xl mx-auto">
          {/* Title */}
          <h2 className="text-5xl md:text-6xl font-extrabold text-teal-900 leading-tight mb-6 drop-shadow">
            <span className="text-teal-600">{t("Nagarik")}</span>
          </h2>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-slate-700 font-light leading-relaxed max-w-2xl mx-auto mb-12">
            {t("description")}
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link to="/login">
              <button className="px-10 py-4 bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white text-lg font-semibold rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                {t("login")}
              </button>
            </Link>

            <Link to="/register">
              <button className="px-10 py-4 border-2 border-teal-600 text-teal-700 hover:bg-teal-600 hover:text-white text-lg font-semibold rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                {t("register")}
              </button>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white/90 border-t border-teal-200 py-8 shadow-inner">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-slate-700 text-sm tracking-wide">
            © 2025 <span className="font-semibold text-teal-600">Naagarik</span>{" "}
            — All Rights Reserved
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
