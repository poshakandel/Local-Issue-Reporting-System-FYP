// src/pages/LandingPage.jsx
import React from "react";
import { useTranslation } from "react-i18next";
import { ArrowRight, AlertCircle, MapPin, Users, CheckCircle } from "lucide-react";

const LandingPage = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-cyan-50 font-sans">
      {/* Navbar */}
      <header className="w-full bg-white/80 backdrop-blur-lg shadow-md border-b border-gray-100 fixed top-0 left-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-800 rounded-xl flex items-center justify-center shadow-lg">
              <AlertCircle className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-700 to-cyan-600 bg-clip-text text-transparent">
              {t("app_name") || "Sewakosh"}
            </h1>
          </div>

          <select
            value={i18n.language}
            onChange={(e) => changeLanguage(e.target.value)}
            className="px-5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-200 shadow-sm"
          >
            <option value="en">English</option>
            <option value="np">नेपाली</option>
          </select>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex items-center justify-center px-6 pt-32 pb-20">
        <div className="max-w-5xl w-full text-center">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6 shadow-sm">
            <MapPin className="w-4 h-4" />
            {t("tagline") || "Report Local Issues • Get Quick Action"}
          </div>

          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
            <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              {t("welcome_part1") || "Your Voice"}
            </span>
            <br />
            <span className="text-gray-800">
              {t("welcome_part2") || "Makes Our Community Better"}
            </span>
          </h1>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
            {t("description") ||
              "Report potholes, garbage, water leaks, streetlights, and other local problems in seconds. Your reports help local authorities act faster."}
          </p>

          {/* Feature Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
            {[
              { icon: MapPin, title: t("feature1_title") || "Pinpoint Location", desc: t("feature1_desc") || "Mark exact location with GPS" },
              { icon: AlertCircle, title: t("feature2_title") || "Instant Report", desc: t("feature2_desc") || "Submit issue in under 30 seconds" },
              { icon: CheckCircle, title: t("feature3_title") || "Track Progress", desc: t("feature3_desc") || "See updates from authorities" },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="bg-white/70 backdrop-blur-sm border border-gray-100 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <feature.icon className="w-10 h-10 text-blue-600 mx-auto mb-4" />
                <h3 className="font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a href="/register">
              <button className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-lg font-semibold rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center gap-3">
                {t("get_started") || "Get Started Free"}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </a>

            <a href="/login">
              <button className="px-8 py-4 border-2 border-blue-600 text-blue-700 hover:bg-blue-50 text-lg font-semibold rounded-xl transition-all duration-300 backdrop-blur-sm">
                {t("login")}
              </button>
            </a>
          </div>
        </div>
      </main>

      {/* Decorative Background Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-cyan-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-10 left-1/3 w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Footer */}
      <footer className="bg-white/90 backdrop-blur-md border-t border-gray-200 py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-600 font-medium">
              © 2025 <span className="font-bold text-blue-700">Sewakosh</span> — {t("footer") || "Serving Communities Across Nepal"}
            </p>
            <div className="flex gap-6 text-sm text-gray-500">
              <a href="#" className="hover:text-blue-600 transition">Privacy</a>
              <a href="#" className="hover:text-blue-600 transition">Terms</a>
              <a href="#" className="hover:text-blue-600 transition">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;