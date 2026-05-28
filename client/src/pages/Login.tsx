import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import authService from '../services/authService';
import { setUser } from '../redux/authSlice';
import AuthLayout from '../components/AuthLayout';

type FormData = {
  email: string;
  password: string;
};

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const { register, handleSubmit } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      const response = await authService.login(data);
      dispatch(setUser(response));
      toast.success('Welcome back!');
      navigate('/dashboard');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Login failed');
      console.error(error);
    }
  };

  return (
    <AuthLayout>
      <div className="space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-semibold text-slate-900">Sign in</h1>
          <p className="text-sm text-slate-500">Access your AI interview dashboard and practice sessions.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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
            Continue
          </button>
        </form>

        <p className="text-center text-sm text-slate-500">
          Don’t have an account?{' '}
          <Link to="/register" className="font-semibold text-blue-600 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}

export default Login;