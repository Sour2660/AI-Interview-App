import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import DashboardLayout from '../layouts/DashboardLayout';
import InterviewCard from '../components/InterviewCard';
import StatCard from '../components/StatCard';
import Loader from '../components/Loader';
import { FiPlus } from 'react-icons/fi';
import { getInterviews } from '../services/interviewService';

const statCards = [
  { title: 'Total interviews', subtitle: 'Sessions created', gradient: 'from-blue-500 to-blue-600' },
  { title: 'Active plans', subtitle: 'Ready to start', gradient: 'from-emerald-500 to-teal-600' },
  { title: 'Categories', subtitle: 'Topics covered', gradient: 'from-violet-500 to-fuchsia-600' },
];

function Dashboard() {
  const navigate = useNavigate();
  const [interviews, setInterviews] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const filteredInterviews = useMemo(
    () =>
      interviews.filter((item) =>
        [item.title, item.category, item.difficulty].some((value) =>
          String(value).toLowerCase().includes(search.toLowerCase())
        )
      ),
    [interviews, search]
  );

  const categories = useMemo(() => new Set(interviews.map((item) => item.category)).size, [interviews]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await getInterviews();
      setInterviews(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-[2rem] bg-gradient-to-br from-slate-900 to-blue-700 p-8 text-white shadow-xl"
        >
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-slate-300">Welcome back, {user.name || 'Candidate'}</p>
              <h2 className="mt-4 text-4xl font-semibold">Drive your AI interview prep forward.</h2>
              <p className="mt-3 max-w-2xl text-sm text-slate-200">
                Your agile interview workspace helps you create sessions, review key details, and launch practice flows with polished UI.
              </p>
            </div>
            <button
              type="button"
              onClick={() => navigate('/create-interview')}
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
            >
              <FiPlus />
              Create interview
            </button>
          </div>
        </motion.section>

        <section className="grid gap-6 xl:grid-cols-3">
          {statCards.map((card, index) => (
            <StatCard
              key={card.title}
              title={card.title}
              value={index === 0 ? interviews.length : index === 1 ? interviews.length : categories}
              subtitle={card.subtitle}
              className={`bg-gradient-to-r ${card.gradient}`}
            />
          ))}
        </section>

        <section className="space-y-6 rounded-[2rem] bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 rounded-3xl bg-slate-50 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-xl font-semibold text-slate-900">Recent Interviews</h3>
              <p className="text-sm text-slate-500">Manage your interview sessions and jump into details quickly.</p>
            </div>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by title, category or difficulty"
              className="w-full max-w-sm rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-500"
            />
          </div>

          {loading ? (
            <Loader />
          ) : filteredInterviews.length === 0 ? (
            <div className="rounded-[1.75rem] border border-dashed border-slate-200 bg-slate-50 p-10 text-center text-slate-500">
              No interviews found. Create a new session to get started.
            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {filteredInterviews.map((interview) => (
                <InterviewCard
                  key={interview._id}
                  interview={interview}
                  onClick={() => navigate(`/interview/${interview._id}`)}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;