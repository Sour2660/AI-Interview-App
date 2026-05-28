import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import authService from '../services/authService';
import AuthLayout from '../components/AuthLayout';

type FormData = {
  name: string;
  email: string;
  password: string;
};

function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, reset } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      await authService.register(data);
      toast.success('Registration successful');
      reset();
      navigate('/');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Registration failed');
      console.error(error);
    }
  };

  return (
    <AuthLayout>
      <div className="space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-semibold text-slate-900">Create your account</h1>
          <p className="text-sm text-slate-500">Start your AI interview journey with a secure account.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
              <FiUser /> Name
            </label>
            <input
              {...register('name', { required: true })}
              placeholder="Your name"
              className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-slate-900 outline-none transition focus:border-blue-500"
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
              <FiMail /> Email
            </label>
            <input
              {...register('email', { required: true })}
              type="email"
              placeholder="you@example.com"
              className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-slate-900 outline-none transition focus:border-blue-500"
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
              <FiLock /> Password
            </label>
            <div className="relative">
              <input
                {...register('password', { required: true })}
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4 pr-14 text-sm text-slate-900 outline-none transition focus:border-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>

          <button className="w-full rounded-3xl bg-blue-600 px-5 py-4 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700">
            Create account
          </button>
        </form>

        <p className="text-center text-sm text-slate-500">
          Already have an account?{' '}
          <Link to="/" className="font-semibold text-blue-600 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}

export default Register;
