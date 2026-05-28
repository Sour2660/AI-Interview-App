import { useForm } from "react-hook-form";
import authService from "../services/authService";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/authSlice";
import AuthLayout from "../components/AuthLayout";

type FormData = {
  email: string;
  password: string;
};

function Login() {

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit
  } = useForm<FormData>();


  const onSubmit = async (
    data: FormData
  ) => {

    try {

      const response =
      await authService.login(data);

      dispatch(
        setUser(response)
      );

      navigate("/dashboard");

    } catch (error: any) {

      alert(
        error.response?.data?.message ||
        "Login failed"
      );

    }

  };

  return (

<AuthLayout>

<h1 className="text-3xl font-bold text-center mb-6">

Login

</h1>

<form
onSubmit={handleSubmit(onSubmit)}
className="space-y-4"
>

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
className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700"
>

Login

</button>

</form>

<p className="text-center mt-4">

No account?

<Link
to="/register"
className="text-blue-600 ml-2"
>

Register

</Link>

</p>

</AuthLayout>

);

}

export default Login;