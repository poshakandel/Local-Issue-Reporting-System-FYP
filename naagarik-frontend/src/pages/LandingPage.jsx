// src/pages/LandingPage.jsx
import React from "react";
import { useTranslation } from "react-i18next";

const LandingPage = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-white font-sans">

      {/* Navbar */}
      <header className="w-full bg-white shadow-sm border-b border-gray-200 fixed top-0 left-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-blue-800 tracking-tight">
            Local Issue Reporting System
          </h1>

          <select
            value={i18n.language}
            onChange={(e) => changeLanguage(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition"
          >
            <option value="en">English</option>
            <option value="np">नेपाली</option>
          </select>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex items-center justify-center px-6 pt-24">
        <div className="max-w-3xl text-center bg-white rounded-2xl shadow-lg p-12 border border-gray-100">

          {/* Hero Heading */}
          <h1 className="text-5xl font-extrabold text-gray-900 mb-6 leading-tight tracking-tight">
            {t("welcome")}
          </h1>

          {/* Subtext */}
          <p className="text-lg text-gray-600 max-w-xl mx-auto mb-10">
            {t("description")}
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mt-6">
            <a href="/login">
              <button className="w-48 py-4 bg-blue-700 hover:bg-blue-800 text-white text-lg font-semibold rounded-lg shadow-md transition-all duration-200">
                {t("login")}
              </button>
            </a>

            <a href="/register">
              <button className="w-48 py-4 border-2 border-blue-700 text-blue-700 hover:bg-blue-50 text-lg font-semibold rounded-lg transition-all duration-200">
                {t("register")}
              </button>
            </a>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-6 mt-12">
        <p className="text-center text-sm text-gray-500 font-medium">
          © 2025 Local Issue Reporting System — All Rights Reserved
        </p>
      </footer>
    </div>
  );
};

export default LandingPage;
