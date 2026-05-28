import { useForm } from "react-hook-form";
import authService from "../services/authService";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";

type FormData = {
  name: string;
  email: string;
  password: string;
};

function Register() {

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset
  } = useForm<FormData>();


  const onSubmit = async (
    data: FormData
  ) => {

    try {

      await authService.register(data);

      alert(
        "Registration successful"
      );

      reset();

      navigate("/");

    } catch (error: any) {

      alert(
        error.response?.data?.message ||
        "Registration failed"
      );

    }

  };

  return (

    <AuthLayout>

      <h1 className="text-3xl font-bold text-center mb-6">

        Register

      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4"
      >

        <input
          {...register("name")}
          placeholder="Name"
          className="w-full border border-gray-300 p-3 rounded-lg"
        />

        <input
          {...register("email")}
          placeholder="Email"
          className="w-full border border-gray-300 p-3 rounded-lg"
        />

        <input
          {...register("password")}
          type="password"
          placeholder="Password"
          className="w-full border border-gray-300 p-3 rounded-lg"
        />

        <button
          type="submit"
          className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700"
        >

          Register

        </button>

      </form>

      <p className="text-center mt-4">

        Already have an account?

        <Link
          to="/"
          className="text-blue-600 ml-2"
        >

          Login

        </Link>

      </p>

    </AuthLayout>

  );

}

export default Register;