import { NavLink } from "react-router-dom";
import { FiHome, FiPlusCircle, FiFileText } from "react-icons/fi";
import { motion } from "framer-motion";

const navItems = [
  { label: "Dashboard", path: "/dashboard", icon: FiHome },
  { label: "Create Interview", path: "/create-interview", icon: FiPlusCircle },
  { label: "My Sessions", path: "/dashboard", icon: FiFileText },
];

function Sidebar() {
  return (
    <motion.aside
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="hidden lg:flex lg:w-72 shrink-0 flex-col gap-4 rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm"
    >
      <div className="space-y-1">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Navigation</p>
        <h2 className="text-xl font-semibold text-slate-900">Workspace</h2>
      </div>
      <div className="flex flex-col gap-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${
                  isActive
                    ? "bg-blue-600 text-white shadow"
                    : "text-slate-700 hover:bg-slate-100"
                }`
              }
            >
              <Icon className="h-5 w-5" />
              {item.label}
            </NavLink>
          );
        })}
      </div>
      <div className="mt-auto rounded-3xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
        <p className="font-semibold text-slate-900">Interview workspace</p>
        <p className="mt-2 text-xs leading-5">Launch real interview sessions, track your progress, and keep interview practice organized in one central hub.</p>
      </div>
    </motion.aside>
  );
}

export default Sidebar;
