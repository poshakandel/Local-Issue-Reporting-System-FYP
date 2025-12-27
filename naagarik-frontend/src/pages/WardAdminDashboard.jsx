import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from "../assets/naagarik-logo.png";

export default function WardAdminDashboard() {
  const [complaints, setComplaints] = useState([]);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    fetchComplaints();
    fetchUsers();
  }, []);

  const fetchComplaints = async () => {
    const res = await axios.get(
      "http://localhost:4000/api/ward-admin/complaints",
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setComplaints(res.data);
  };

  const fetchUsers = async () => {
    const res = await axios.get(
      "http://localhost:4000/api/ward-admin/users",
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setUsers(res.data);
  };

  const updateStatus = async (id, status) => {
    await axios.patch(
      `http://localhost:4000/api/ward-admin/complaints/${id}/status`,
      { status },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchComplaints();
  };

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 via-white to-blue-100">

      {/* TOP HEADER (LOGO + LOGOUT ONLY) */}
      <header className="w-full bg-white/80 backdrop-blur-lg shadow-md border-b border-teal-200 fixed top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
          <img src={logo} alt="Naagarik" className="h-9" />

          <button
            onClick={logout}
            className="px-6 py-2 rounded-full bg-gradient-to-r from-red-500 to-red-600
                       text-white text-sm font-semibold shadow-md
                       hover:shadow-xl hover:scale-105 transition-all"
          >
            Logout
          </button>
        </div>
      </header>

      {/* PAGE HEADER */}
      <section className="pt-32 pb-12 text-center">
        <h1 className="text-4xl font-extrabold text-teal-900 mb-3">
          Ward Administration Panel
        </h1>
        <p className="text-slate-600 text-lg">
          Manage complaints and citizens in your ward efficiently
        </p>
      </section>

      {/* MAIN CONTENT */}
      <main className="max-w-7xl mx-auto px-6 pb-20">

        {/* ACTION BAR */}
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-2xl font-bold text-teal-800">
            Complaints Management
          </h2>

          <button
            className="px-6 py-3 rounded-full bg-gradient-to-r from-teal-500 to-blue-600
                       text-white font-semibold shadow-lg
                       hover:shadow-2xl hover:scale-105 transition-all"
          >
            + Add User
          </button>
        </div>

        {/* COMPLAINTS LIST */}
        <div className="grid gap-6 mb-16">
          {complaints.length === 0 && (
            <p className="text-slate-600 text-center">
              No complaints found.
            </p>
          )}

          {complaints.map((c) => (
            <div
              key={c._id}
              className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6
                         hover:shadow-2xl transition"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold text-teal-900">
                    {c.title}
                  </h3>
                  <p className="text-slate-600 mt-1">
                    {c.description}
                  </p>
                  <p className="text-sm text-slate-400 mt-2">
                    Current Status: <span className="font-medium">{c.status}</span>
                  </p>
                </div>

                <select
                  value={c.status}
                  onChange={(e) => updateStatus(c._id, e.target.value)}
                  className="px-4 py-2 rounded-full border border-teal-300
                             focus:ring-2 focus:ring-teal-400 text-sm"
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </div>
          ))}
        </div>

        {/* USERS SECTION */}
        <section>
          <h2 className="text-2xl font-bold text-teal-800 mb-6">
            Ward Citizens
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {users.map((u) => (
              <div
                key={u._id}
                className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6
                           hover:shadow-2xl transition"
              >
                <h3 className="text-lg font-semibold text-teal-900">
                  {u.name}
                </h3>
                <p className="text-slate-600">{u.email}</p>
                <p className="text-sm text-slate-400 mt-1">{u.role}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

     
    </div>
  );
}
