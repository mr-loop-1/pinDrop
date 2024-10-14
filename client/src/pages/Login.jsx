import { loginUser } from "api/auth";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/hooks/use-toast";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setUser } from "@/store";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Login() {
  const { toast } = useToast();
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const showToast = (toast, msg) => {
    toast({
      variant: "destructive",
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
      showToast(toast, error?.response?.data?.error || error.message);
    }
  };
  return (
    <Card className="mx-6 mt-6 pt-6 px-6 h-screen md:mx-14 lg:mx-auto max-auto lg:max-w-2xl">
      <Card className="pt-6 px-4 flex flex-col">
        <h2 className="text-center font-semibold text-1xl lg:text-2xl text-gray-800">
          Login
        </h2>
        <form
          method="POST"
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col"
        >
          <label className="mt-5 uppercase text-sm font-semibold">Email*</label>
          <Input
            id="email"
            type="email"
            name="email"
            minLength={5}
            maxLength={20}
            placeholder="email"
            className="mt-2"
            {...register("email")}
            required
          />

          <label className="mt-5 uppercase text-sm font-semibold">
            password*
          </label>
          <Input
            id="password"
            type="password"
            name="password"
            minLength={5}
            maxLength={50}
            placeholder="password"
            className="mt-2"
            {...register("password")}
            required
          />

          <Button type="submit" className="mt-10">
            Login
          </Button>

          <div className="sm:flex sm:flex-wrap mt-8 sm:mb-4 text-sm text-center">
            <Link to="/register" className="flex-2 underline">
              Create an Account
            </Link>
          </div>
        </form>
      </Card>
    </Card>
  );
}
