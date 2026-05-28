import { FiLogOut, FiSearch } from "react-icons/fi";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";

interface NavbarProps {
  userName?: string;
}

function Navbar({ userName }: NavbarProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between bg-white/80 backdrop-blur border-b border-slate-200 px-6 py-5 shadow-sm"
    >
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">AI Interview Prep</h1>
        <p className="text-sm text-slate-500">Modern interview practice built for candidates.</p>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex items-center gap-2 border border-slate-200 rounded-full px-4 py-2 bg-slate-50">
          <FiSearch className="text-slate-400" />
          <input
            type="text"
            placeholder="Search interviews"
            className="w-full bg-transparent outline-none text-sm text-slate-700"
            disabled
          />
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm font-medium text-slate-900">{userName || "Guest"}</p>
            <p className="text-xs text-slate-500">Candidate</p>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex items-center gap-2 rounded-full bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-red-700"
          >
            <FiLogOut />
            Logout
          </button>
        </div>
      </div>
    </motion.header>
  );
}

export default Navbar;
