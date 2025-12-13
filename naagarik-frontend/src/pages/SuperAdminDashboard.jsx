import { useState, useEffect } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import logo from "../assets/naagarik-logo.png";

export default function SuperAdminDashboard() {
  const { t, i18n } = useTranslation();
  const [wardAdmins, setWardAdmins] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "", ward: "" });

  const token = localStorage.getItem("token");

  const fetchWardAdmins = async () => {
    try {
      const res = await axios.get("/api/dashboard/ward-admins", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setWardAdmins(res.data);
    } catch (error) {
      alert(error.response?.data?.message || "Error fetching ward admins");
    }
  };

  useEffect(() => {
    fetchWardAdmins();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/dashboard/super-admin/create-ward-admin", form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Ward Admin created!");
      setForm({ name: "", email: "", phone: "", password: "", ward: "" });
      fetchWardAdmins();
    } catch (error) {
      alert(error.response?.data?.message || "Error creating ward admin");
    }
  };

  const changeLanguage = (lang) => i18n.changeLanguage(lang);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-teal-50 via-white to-blue-100">
      <header className="w-full bg-white/80 backdrop-blur-lg shadow-md border-b border-teal-200 fixed top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
          <img src={logo} alt="Naagarik Logo" className="h-9 w-auto object-contain" />
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

      <main className="flex flex-col pt-28 px-16 w-full">
        <h1 className="text-4xl font-bold mb-6 text-teal-900">{t("Super Admin Dashboard")}</h1>

        {/* Create Ward Admin */}
        <div className="mb-10 p-6 bg-white rounded-lg shadow-md max-w-lg">
          <h2 className="text-2xl font-semibold mb-4">{t("Add Ward Admin")}</h2>
          <form className="space-y-3" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder={t("Full Name")}
              className="w-full p-2 border rounded-lg"
              value={form.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder={t("Email")}
              className="w-full p-2 border rounded-lg"
              value={form.email}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="phone"
              placeholder={t("Phone Number")}
              className="w-full p-2 border rounded-lg"
              value={form.phone}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder={t("Password")}
              className="w-full p-2 border rounded-lg"
              value={form.password}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="ward"
              placeholder={t("Ward")}
              className="w-full p-2 border rounded-lg"
              value={form.ward}
              onChange={handleChange}
              required
            />
            <button className="w-full bg-gradient-to-r from-teal-500 to-blue-600 text-white p-2 rounded-lg font-semibold">
              {t("Create")}
            </button>
          </form>
        </div>

        {/* List of Ward Admins */}
        <div className="p-6 bg-white rounded-lg shadow-md max-w-3xl">
          <h2 className="text-2xl font-semibold mb-4">{t("Existing Ward Admins")}</h2>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b">
                <th className="p-2">{t("Name")}</th>
                <th className="p-2">{t("Email")}</th>
                <th className="p-2">{t("Phone")}</th>
                <th className="p-2">{t("Ward")}</th>
              </tr>
            </thead>
            <tbody>
              {wardAdmins.map((admin) => (
                <tr key={admin.id} className="border-b">
                  <td className="p-2">{admin.name}</td>
                  <td className="p-2">{admin.email}</td>
                  <td className="p-2">{admin.phone}</td>
                  <td className="p-2">{admin.ward}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
