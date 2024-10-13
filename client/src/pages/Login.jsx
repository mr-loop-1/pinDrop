import { loginUser } from "api/auth";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/hooks/use-toast";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "@/store";

export default function Login() {
  const { toast } = useToast();
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const showToast = (toast, msg) => {
    toast({
      title: "Some Error Occured",
      description: msg,
      action: <ToastAction altText="Close">Close</ToastAction>,
    });
  };

  const onSubmit = async (data) => {
    const auth = {
      email: data.email,
      password: data.password,
    };
    try {
      const result = await loginUser(auth);
      if (result.status != 200) {
        return showToast(toast, result.data.error || result.data.message);
      }

      dispatch(setUser(result.data.user));
      localStorage.setItem("token", result.data.token);
      localStorage.setItem("user", JSON.stringify(result.data.user));
      navigate("/");
    } catch (error) {
      showToast(toast, error.message);
    }
  };
  return (
    <div>
      <form method="POST" onSubmit={handleSubmit(onSubmit)}>
        <label>Username</label>
        <input
          id="email"
          type="email"
          name="email"
          placeholder="email"
          {...register("email")}
          required
        />

        <label>password</label>
        <input
          id="password"
          type="password"
          name="password"
          placeholder="password"
          {...register("password")}
          required
        />

        <button>Register</button>
      </form>
    </div>
  );
}
