import { motion } from "framer-motion";

interface InterviewCardProps {
  interview: any;
  onClick: () => void;
}

const difficultyStyles: Record<string, string> = {
  Easy: "bg-emerald-500",
  Medium: "bg-amber-500",
  Hard: "bg-rose-500",
};

function InterviewCard({ interview, onClick }: InterviewCardProps) {
  return (
    <motion.button
      type="button"
      whileHover={{ y: -4 }}
      className="group w-full text-left rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-lg"
      onClick={onClick}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">{interview.category}</p>
          <h3 className="mt-3 text-xl font-semibold text-slate-900">{interview.title}</h3>
        </div>
        <span className={`rounded-full px-3 py-1 text-xs font-semibold text-white ${difficultyStyles[interview.difficulty] ?? "bg-slate-400"}`}>
          {interview.difficulty}
        </span>
      </div>
      <div className="mt-5 flex items-center justify-between text-sm text-slate-500">
        <span>{new Date(interview.createdAt).toLocaleDateString()}</span>
        <span className="rounded-full bg-slate-100 px-3 py-1">Click to view</span>
      </div>
    </motion.button>
  );
}

export default InterviewCard;
