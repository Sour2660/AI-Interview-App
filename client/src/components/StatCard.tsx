import { motion } from "framer-motion";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  className?: string;
}

function StatCard({ title, value, subtitle, className = "" }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-3xl p-6 shadow-lg text-white ${className}`}
    >
      <p className="text-sm uppercase tracking-[0.2em] text-white/80">{title}</p>
      <p className="mt-4 text-4xl font-semibold">{value}</p>
      <p className="mt-2 text-sm text-white/80">{subtitle}</p>
    </motion.div>
  );
}

export default StatCard;
