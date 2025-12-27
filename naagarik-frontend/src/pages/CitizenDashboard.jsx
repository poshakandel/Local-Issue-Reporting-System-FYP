import { NavLink, Link } from "react-router-dom";
import logo from "../assets/naagarik-logo.png";

export default function CitizenDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F3FAF9] via-white to-[#EEF7F6]">

      {/* ================= NAVBAR ================= */}
      <header className="bg-white shadow fixed top-0 w-full z-50 border-b border-[#9FE3DD]">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          
          <div className="flex items-center gap-3">
            <img src={logo} alt="Logo" className="h-9" />
          </div>

          <nav className="flex items-center gap-6 text-sm font-medium text-[#1F2937]">
            <NavLink
              to="/citizen"
              className={({ isActive }) =>
                isActive
                  ? "text-[#0AA89E] font-semibold"
                  : "hover:text-[#0AA89E]"
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/report"
              className={({ isActive }) =>
                isActive
                  ? "text-[#0AA89E] font-semibold"
                  : "hover:text-[#0AA89E]"
              }
            >
              + Report Issue
            </NavLink>

            <NavLink
              to="/map"
              className={({ isActive }) =>
                isActive
                  ? "text-[#0AA89E] font-semibold"
                  : "hover:text-[#0AA89E]"
              }
            >
              Map View
            </NavLink>

            <NavLink
              to="/issues"
              className={({ isActive }) =>
                isActive
                  ? "text-[#0AA89E] font-semibold"
                  : "hover:text-[#0AA89E]"
              }
            >
              Issues
            </NavLink>

            <NavLink
              to="/profile"
              className={({ isActive }) =>
                isActive
                  ? "text-[#0AA89E] font-semibold"
                  : "hover:text-[#0AA89E]"
              }
            >
              Profile
            </NavLink>

            {/* LANGUAGE SWITCH */}
            <select
              className="ml-4 px-3 py-1 rounded-full
                         border border-[#9FE3DD]
                         text-[#0AA89E] bg-white
                         focus:outline-none focus:ring-2 focus:ring-[#0AA89E]"
            >
              <option value="en">English</option>
              <option value="np">नेपाली</option>
            </select>
          </nav>
        </div>
      </header>

      {/* ================= HERO ================= */}
      <section className="pt-32 pb-20 text-center max-w-4xl mx-auto px-6">
        <h1 className="text-4xl font-extrabold text-[#0AA89E] mb-4">
          Report Local Issues. Make Real Change.
        </h1>
        <p className="text-[#6B7280] mb-8">
          Naagarik empowers citizens to report local problems and track their
          resolution transparently.
        </p>

        <Link to="/report">
          <button className="px-8 py-3 bg-[#0AA89E] text-white rounded-full shadow
                             hover:bg-[#2563EB] hover:scale-105 transition">
            + Report an Issue
          </button>
        </Link>
      </section>

      {/* ================= STATS ================= */}
      <section className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
        {[
          "Issues Reported",
          "Issues Pending",
          "Issues Resolved",
          "Total Issues",
        ].map((item) => (
          <div
            key={item}
            className="bg-[#FFFFFF] p-6 rounded-xl shadow
                       border border-[#9FE3DD]
                       text-center hover:shadow-lg transition"
          >
            <h3 className="text-sm text-[#6B7280]">{item}</h3>
            <p className="text-3xl font-bold text-[#0AA89E] mt-2">--</p>
          </div>
        ))}
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="max-w-7xl mx-auto px-6 mb-20">
        <h2 className="text-3xl font-bold text-center mb-12 text-[#1F2937]">
          How Naagarik Works?
        </h2>

        <div className="grid md:grid-cols-4 gap-6">
          {[
            "Interactive Map",
            "Analytics Dashboard",
            "Community Engagement",
            "Emergency Reporting",
          ].map((feature) => (
            <div
              key={feature}
              className="bg-[#FFFFFF] p-6 rounded-xl shadow
                         border border-[#9FE3DD]
                         hover:shadow-xl transition"
            >
              <div className="h-24 bg-[#F3FAF9] rounded mb-4"></div>
              <h3 className="font-semibold mb-2 text-[#1F2937]">
                {feature}
              </h3>
              <button className="text-[#0AA89E] text-sm hover:underline">
                Learn More →
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ================= RECENT ISSUES ================= */}
      <section className="max-w-7xl mx-auto px-6 mb-20">
        <h2 className="text-2xl font-bold mb-6 text-[#1F2937]">
          Recent Issues
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-[#FFFFFF] p-4 rounded shadow
                         border border-[#9FE3DD]
                         hover:shadow-lg transition"
            >
              <h4 className="font-semibold mb-2 text-[#1F2937]">
                Issue Title
              </h4>
              <p className="text-sm text-[#6B7280]">
                Short description of the reported issue...
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="bg-white py-16 text-center shadow-inner border-t border-[#9FE3DD]">
        <h2 className="text-3xl font-bold mb-4 text-[#1F2937]">
          Ready to Make a Difference?
        </h2>
        <Link to="/report">
          <button className="px-8 py-3 bg-[#0AA89E] text-white rounded-full
                             hover:bg-[#2563EB] transition">
            + Report Your Issue
          </button>
        </Link>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-white border-t border-[#9FE3DD] py-6 text-center text-sm text-[#6B7280]">
        © 2025 <span className="font-semibold text-[#0AA89E]">Naagarik</span>. All
        rights reserved.
      </footer>
    </div>
  );
}
