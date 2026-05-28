import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getInterviewById } from '../services/interviewService';
import DashboardLayout from '../layouts/DashboardLayout';

const difficultyClasses: Record<string, string> = {
  Easy: 'bg-emerald-100 text-emerald-700',
  Medium: 'bg-amber-100 text-amber-700',
  Hard: 'bg-rose-100 text-rose-700',
};

function InterviewDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [interview, setInterview] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchInterview = async () => {
    try {
      if (id) {
        setLoading(true);
        const data = await getInterviewById(id);
        setInterview(data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInterview();
  }, [id]);

  if (loading || !interview) {
    return (
      <DashboardLayout>
        <div className="rounded-[2rem] bg-white p-10 shadow-sm">
          Loading interview details…
        </div>
      </DashboardLayout>
    );
  }

  const createdAt = new Date(interview.createdAt).toLocaleDateString();

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <div className="rounded-[2rem] bg-white p-8 shadow-sm">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-blue-600">Interview overview</p>
              <h1 className="mt-3 text-4xl font-semibold text-slate-900">{interview.title}</h1>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600">
                Review key session details before you start your AI-powered interview practice.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-700">{interview.category}</span>
              <span className={`rounded-full px-4 py-2 text-sm font-semibold ${difficultyClasses[interview.difficulty] || 'bg-slate-100 text-slate-700'}`}>
                {interview.difficulty}
              </span>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="rounded-[2rem] bg-white p-8 shadow-sm">
            <div className="space-y-5">
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-400">Instructions</p>
                <p className="mt-3 text-lg font-semibold text-slate-900">Prepare for structured answers and keep your response concise.</p>
              </div>
              <ul className="space-y-4 text-sm text-slate-600">
                <li className="flex gap-3">
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-blue-600" />
                  Focus on technical clarity, tradeoffs, and architecture.
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-blue-600" />
                  Use examples from past experience to support your answers.
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-blue-600" />
                  Review the difficulty scope before starting the timer.
                </li>
              </ul>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-[2rem] bg-white p-6 shadow-sm">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Session details</p>
              <div className="mt-4 space-y-4 text-slate-700">
                <div className="flex items-center justify-between rounded-3xl bg-slate-50 px-4 py-3">
                  <span>Created</span>
                  <span>{createdAt}</span>
                </div>
                <div className="flex items-center justify-between rounded-3xl bg-slate-50 px-4 py-3">
                  <span>Estimated duration</span>
                  <span>15 min</span>
                </div>
                <div className="flex items-center justify-between rounded-3xl bg-slate-50 px-4 py-3">
                  <span>Focus area</span>
                  <span>{interview.category}</span>
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() =>
                navigate(`/start-interview/${id}`, {
                  state: {
                    category: interview.category,
                    difficulty: interview.difficulty,
                  },
                })
              }
              className="w-full rounded-3xl bg-blue-600 px-6 py-4 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
            >
              Start Interview
            </button>
          </div>
        </div>
      </motion.div>
    </DashboardLayout>
  );
}

export default InterviewDetails;
