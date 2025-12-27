import { useState, useEffect } from "react";
import axios from "axios";
import { UserPlus, ShieldCheck, Trash2, Power, X } from "lucide-react";
import logo from "../assets/naagarik-logo.png";

export default function SuperAdminDashboard() {
  const token = localStorage.getItem("token");

  /* ================= STATE ================= */
  const [activeTab, setActiveTab] = useState("admins");

  const [wardAdmins, setWardAdmins] = useState([]);
  const [users, setUsers] = useState([]);
  const [complaints, setComplaints] = useState([]);

  const [selectedUserWard, setSelectedUserWard] = useState("");
  const [selectedComplaintWard, setSelectedComplaintWard] = useState("");

  const [showAddUser, setShowAddUser] = useState(false);
  const [showAddAdmin, setShowAddAdmin] = useState(false);

  const [userForm, setUserForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    ward: "",
  });

  const [adminForm, setAdminForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    ward: "",
  });

  const auth = { headers: { Authorization: `Bearer ${token}` } };

  /* ================= FETCH ================= */
  useEffect(() => {
    fetchWardAdmins();
    fetchUsers();
  }, []);

  const fetchWardAdmins = async () => {
    const res = await axios.get(
      "http://localhost:4000/api/dashboard/ward-admins",
      auth
    );
    setWardAdmins(res.data || []);
  };

  const fetchUsers = async () => {
    const res = await axios.get(
      "http://localhost:4000/api/super-admin/users",
      auth
    );
    setUsers(res.data || []);
  };

  const fetchWardComplaints = async (ward) => {
    setSelectedComplaintWard(ward);
    const res = await axios.get(
      `http://localhost:4000/api/super-admin/complaints?ward=${ward}`,
      auth
    );
    setComplaints(res.data || []);
  };

  /* ================= ACTIONS ================= */
  const addUser = async () => {
    await axios.post(
      "http://localhost:4000/api/super-admin/create-user",
      { ...userForm, role: "user" },
      auth
    );
    setShowAddUser(false);
    setUserForm({ name: "", email: "", phone: "", password: "", ward: "" });
    fetchUsers();
  };

  const addWardAdmin = async () => {
    await axios.post(
      "http://localhost:4000/api/super-admin/create-ward-admin",
      { ...adminForm, role: "wardAdmin" },
      auth
    );
    setShowAddAdmin(false);
    setAdminForm({ name: "", email: "", phone: "", password: "", ward: "" });
    fetchWardAdmins();
  };

  const removeUser = async (id) => {
    if (!confirm("Remove this account?")) return;
    await axios.delete(
      `http://localhost:4000/api/super-admin/users/${id}`,
      auth
    );
    fetchUsers();
    fetchWardAdmins();
  };

  const toggleUserStatus = async (id) => {
    await axios.patch(
      `http://localhost:4000/api/super-admin/users/${id}/toggle`,
      {},
      auth
    );
    fetchWardAdmins();
  };

  /* ================= UI ================= */
  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 via-white to-blue-100">

      {/* HEADER */}
      <header className="bg-white/80 backdrop-blur-lg shadow-md border-b border-teal-200 fixed top-0 w-full z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <img src={logo} alt="logo" className="h-9" />
          <button
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/";
            }}
            className="px-5 py-2 rounded-full border border-red-400 text-red-600 hover:bg-red-500 hover:text-white transition text-sm"
          >
            Logout
          </button>
        </div>
      </header>

      {/* PAGE */}
      <main className="pt-32 px-6 pb-20 max-w-7xl mx-auto">

        {/* TITLE */}
        <h1 className="text-3xl font-extrabold text-teal-900 mb-8 flex items-center gap-3">
          <ShieldCheck className="text-teal-600" />
          Super Admin Dashboard
        </h1>

        {/* ACTION BAR */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setShowAddUser(true)}
            className="px-6 py-2.5 bg-gradient-to-r from-teal-500 to-blue-600 text-white rounded-full shadow-lg hover:scale-105 transition text-sm"
          >
            Add User
          </button>
          <button
            onClick={() => setShowAddAdmin(true)}
            className="px-6 py-2.5 border-2 border-teal-600 text-teal-700 rounded-full hover:bg-teal-600 hover:text-white transition text-sm"
          >
            Add Ward Admin
          </button>
        </div>

        {/* TABS */}
        <div className="flex gap-8 border-b border-teal-200 mb-8">
          {[
            { key: "admins", label: "Ward Admins" },
            { key: "users", label: "Users" },
            { key: "complaints", label: "Complaints" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`pb-3 font-semibold text-sm transition ${
                activeTab === tab.key
                  ? "border-b-2 border-teal-600 text-teal-700"
                  : "text-slate-500 hover:text-teal-600"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* CONTENT CARD */}
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl p-8">

          {/* ADMINS */}
          {activeTab === "admins" && (
            <>
              {wardAdmins.length === 0 && (
                <p className="text-slate-500 text-sm">
                  No ward admins created yet.
                </p>
              )}
              {wardAdmins.map((a) => (
                <div
                  key={a._id}
                  className="flex justify-between items-center py-4 border-b last:border-b-0"
                >
                  <div>
                    <p className="font-semibold">{a.name}</p>
                    <p className="text-sm text-slate-500">
                      Ward {a.ward} • {a.email}
                    </p>
                  </div>
                  <div className="flex gap-4">
                    <button
                      onClick={() => toggleUserStatus(a._id)}
                      className="p-2 rounded-full hover:bg-green-100 text-green-600"
                    >
                      <Power size={16} />
                    </button>
                    <button
                      onClick={() => removeUser(a._id)}
                      className="p-2 rounded-full hover:bg-red-100 text-red-600"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </>
          )}

          {/* USERS */}
          {activeTab === "users" && (
            <>
              <select
                value={selectedUserWard}
                onChange={(e) => setSelectedUserWard(e.target.value)}
                className="border border-teal-300 rounded-full px-4 py-2 mb-6 text-sm focus:outline-none"
              >
                <option value="">Select Ward</option>
                {[...Array(33)].map((_, i) => (
                  <option key={i} value={i + 1}>
                    Ward {i + 1}
                  </option>
                ))}
              </select>

              {selectedUserWard &&
                users.filter((u) => u.ward == selectedUserWard).length === 0 && (
                  <p className="text-slate-500 text-sm">
                    No users registered in this ward.
                  </p>
                )}

              {users
                .filter((u) => u.ward == selectedUserWard)
                .map((u) => (
                  <div
                    key={u._id}
                    className="flex justify-between items-center py-3 border-b"
                  >
                    <span>{u.name}</span>
                    <button
                      onClick={() => removeUser(u._id)}
                      className="p-2 rounded-full hover:bg-red-100 text-red-600"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
            </>
          )}

          {/* COMPLAINTS */}
          {activeTab === "complaints" && (
            <>
              <select
                onChange={(e) => fetchWardComplaints(e.target.value)}
                className="border border-teal-300 rounded-full px-4 py-2 mb-6 text-sm"
              >
                <option value="">Select Ward</option>
                {[...Array(33)].map((_, i) => (
                  <option key={i} value={i + 1}>
                    Ward {i + 1}
                  </option>
                ))}
              </select>

              {selectedComplaintWard && complaints.length === 0 && (
                <p className="text-slate-500 text-sm">
                  No complaints reported for this ward.
                </p>
              )}

              {complaints.map((c) => (
                <div key={c._id} className="py-3 border-b">
                  <p className="font-semibold">{c.title}</p>
                  <p className="text-sm text-slate-500">
                    {c.status} • {c.priority}
                  </p>
                </div>
              ))}
            </>
          )}
        </div>
      </main>

      {/* MODAL */}
      {(showAddUser || showAddAdmin) && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-96 p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-teal-700">
                {showAddUser ? "Add User" : "Add Ward Admin"}
              </h3>
              <button
                onClick={() => {
                  setShowAddUser(false);
                  setShowAddAdmin(false);
                }}
              >
                <X size={18} />
              </button>
            </div>

            {["name", "email", "phone", "password", "ward"].map((f) => (
              <input
                key={f}
                type={f === "password" ? "password" : "text"}
                placeholder={f}
                className="w-full border rounded-full px-4 py-2 mb-3 text-sm"
                onChange={(e) =>
                  showAddUser
                    ? setUserForm({ ...userForm, [f]: e.target.value })
                    : setAdminForm({ ...adminForm, [f]: e.target.value })
                }
              />
            ))}

            <button
              onClick={showAddUser ? addUser : addWardAdmin}
              className="w-full mt-2 bg-gradient-to-r from-teal-500 to-blue-600 text-white py-2.5 rounded-full shadow-lg"
            >
              Create
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
