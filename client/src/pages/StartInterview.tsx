import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { generateQuestions, evaluateAnswer } from '../services/aiService';
import DashboardLayout from '../layouts/DashboardLayout';
import Timer from '../components/Timer';
import { motion } from 'framer-motion';

function StartInterview() {
  const location = useLocation();
  const navigate = useNavigate();
  const { category, difficulty } = (location.state || {}) as any;

  const [questions, setQuestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [answers, setAnswers] = useState<string[]>([]);
  const [time, setTime] = useState(0);
  const [evaluation, setEvaluation] = useState<any>(null);

  useEffect(() => {
    if (!category || !difficulty) {
      navigate('/dashboard');
      return;
    }

    const fetchQuestions = async () => {
      try {
        setLoading(true);
        const data = await generateQuestions(category, difficulty);
        setQuestions(data);
        setAnswers(Array(data.length).fill(''));
      } catch (error) {
        toast.error('Failed to load questions.');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [category, difficulty, navigate]);

  useEffect(() => {
    const timer = setInterval(() => setTime((prev) => prev + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (questions.length) {
      setAnswer(answers[currentIndex] || '');
    }
  }, [currentIndex, answers, questions.length]);

  const saveCurrentAnswer = () => {
    const updated = [...answers];
    updated[currentIndex] = answer;
    setAnswers(updated);
  };

  const handleNext = () => {
    saveCurrentAnswer();
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    saveCurrentAnswer();
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleEvaluate = async () => {
    try {
      const result = await evaluateAnswer(questions[currentIndex], answer);
      setEvaluation(result);
      toast.success('Answer evaluated');
    } catch (error) {
      toast.error('Evaluation failed.');
      console.error(error);
    }
  };

  const handleFinish = () => {
    toast.success('Interview completed. Great work!');
    navigate('/dashboard');
  };

  const progress = questions.length ? ((currentIndex + 1) / questions.length) * 100 : 0;

  if (loading) {
    return (
      <DashboardLayout>
        <div className="rounded-[2rem] bg-white p-10 shadow-sm">Loading AI questions…</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid gap-6 lg:grid-cols-[0.95fr_0.5fr]"
      >
        <div className="space-y-6 rounded-[2rem] bg-white p-8 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Live interview</p>
              <h1 className="mt-2 text-3xl font-semibold text-slate-900">AI Interview Session</h1>
              <p className="mt-2 text-sm text-slate-500">Answer the current question, evaluate your response, and move between prompts.</p>
            </div>
            <div className="rounded-3xl bg-slate-50 px-5 py-4 text-sm text-slate-700 shadow-sm">
              <span className="block text-slate-500">Current question</span>
              <span className="mt-2 block text-2xl font-semibold text-slate-900">{currentIndex + 1}/{questions.length}</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-3xl bg-slate-50 p-4 text-sm text-slate-600">
              <p>
                Category: <span className="font-semibold text-slate-900">{category}</span>
              </p>
              <p>
                Difficulty: <span className="font-semibold text-slate-900">{difficulty}</span>
              </p>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-slate-200">
              <div className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400" style={{ width: `${progress}%` }} />
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-6">
            <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Question</p>
            <h2 className="mt-4 text-2xl font-semibold text-slate-900">{questions[currentIndex]}</h2>
          </div>

          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            rows={8}
            placeholder="Type your answer here..."
            className="w-full rounded-[1.75rem] border border-slate-200 bg-white px-5 py-4 text-sm text-slate-900 outline-none shadow-sm transition focus:border-blue-500"
          />

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="rounded-3xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Previous
              </button>
              <button
                type="button"
                onClick={handleNext}
                disabled={currentIndex === questions.length - 1}
                className="rounded-3xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Next
              </button>
            </div>
            <button
              type="button"
              onClick={handleEvaluate}
              className="rounded-3xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
            >
              Evaluate answer
            </button>
          </div>

          <button
            type="button"
            onClick={handleFinish}
            className="w-full rounded-3xl bg-slate-900 px-5 py-4 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
          >
            Finish interview
          </button>

          {evaluation && (
            <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-6">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-400">AI evaluation</p>
              <div className="mt-4 space-y-3 text-slate-700">
                <p className="text-lg font-semibold text-slate-900">Score: {evaluation.score}/10</p>
                <p>{evaluation.feedback}</p>
              </div>
            </div>
          )}
        </div>

        <aside className="space-y-6 rounded-[2rem] bg-white p-6 shadow-sm">
          <Timer seconds={time} />
          <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-5">
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Question list</p>
            <div className="mt-4 space-y-3">
              {questions.map((question, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setCurrentIndex(index)}
                  className={`w-full rounded-3xl px-4 py-3 text-left text-sm transition ${
                    index === currentIndex ? 'bg-blue-600 text-white' : 'bg-white text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <span className="font-semibold">Q{index + 1}</span>
                  <p className="mt-1 overflow-hidden text-ellipsis whitespace-nowrap text-slate-500">{question}</p>
                </button>
              ))}
            </div>
          </div>
        </aside>
      </motion.div>
    </DashboardLayout>
  );
}

export default StartInterview;
