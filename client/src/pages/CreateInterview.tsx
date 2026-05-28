import { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import DashboardLayout from '../layouts/DashboardLayout';

const categories = ['Frontend', 'Backend', 'React', 'Node', 'DevOps'];
const difficulties = ['Easy', 'Medium', 'Hard'];

type CreateInterviewForm = {
  title: string;
  category: string;
  difficulty: string;
};

function CreateInterview() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit } = useForm<CreateInterviewForm>({
    defaultValues: {
      title: '',
      category: categories[0],
      difficulty: difficulties[0],
    },
  });

  const onSubmit = async (data: CreateInterviewForm) => {
    try {
      setLoading(true);
      await axios.post('http://localhost:5000/api/interview/create', data);
      toast.success('Interview created successfully');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Unable to create interview. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="mx-auto w-full max-w-3xl rounded-[2rem] bg-white p-8 shadow-sm">
        <div className="mb-8 flex flex-col gap-4">
          <p className="text-sm uppercase tracking-[0.24em] text-blue-600">New session</p>
          <h1 className="text-3xl font-semibold text-slate-900">Create Interview</h1>
          <p className="max-w-2xl text-sm text-slate-500">
            Build a structured interview session with category and difficulty so your AI practice stays focused.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Interview Title</label>
            <input
              {...register('title', { required: true })}
              placeholder="e.g. React component design"
              className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-slate-900 outline-none transition focus:border-blue-500"
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Category</label>
              <select
                {...register('category')}
                className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm outline-none transition focus:border-blue-500"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Difficulty</label>
              <select
                {...register('difficulty')}
                className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm outline-none transition focus:border-blue-500"
              >
                {difficulties.map((difficulty) => (
                  <option key={difficulty} value={difficulty}>
                    {difficulty}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="rounded-3xl border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="rounded-3xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? 'Creating...' : 'Create Interview'}
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}

export default CreateInterview;
