"use client"
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Button from "~/_components/Button";
import Input from "~/_components/Input";
import { useLogin } from "~/APIs/hooks/useAuth";
import Cookie from "js-cookie";
const Login = () => {
  const router = useRouter();
  
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    shouldUnregister: false,
  });

  const { mutate, isPending: isSubmitting } = useLogin();
  const onSubmit = (data: any) => {
    mutate(data, {
      onSuccess: (response: any) => {
        toast.success("Login successfully!");
        Cookie.set("token", response.data);
        router.replace("/");
      },
      onError: (err: any) => {
        console.log('Login Error:', err.response.data);
        toast.error(err.response.data.message)
      },
    });
  };
  return (
    <>
      <div className="grid h-screen grid-cols-2 items-center justify-center bg-bgSecondary duration-300 ease-in max-[1040px]:grid-cols-1">
        <div className="flex h-full w-full justify-end">
          <div className="flex h-full w-[700px] items-center justify-end max-[1040px]:hidden">
            <img className="h-full w-full" src="images/login.png" alt="#" />
          </div>
        </div>
        <div className="gird items-center justify-center">
          <div className="mb-10 grid text-center">
            <h1 className="font-sans text-[28px] font-bold text-black">
              Log in
            </h1>
            <p className="font-sans text-[20px] font-semibold text-gray-400">
              Sign in to enjoy the feature of EduAI
            </p>
          </div>
          <div className="w-full flex items-center justify-center">
            <form className="grid gap-10 w-full px-10 sm:px-20 md:px-32 lg:mx-40 xl:mx-52 !m-0" onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="username" className="">
                <Input
                  {...register("username", {
                    required: "Username is required",
                    minLength: {
                      value: 3,
                      message: "Username must be at least 3 characters",
                    },
                  })}
                  error={errors.username?.message?.toString() ?? ""}
                  placeholder="Username"
                  theme="transparent"
                />
                {errors.username && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.username.message?.toString()}
                  </p>
                )}
              </label>
              <label htmlFor="password" className="w-full">
                <Input
                  error={errors.password?.message?.toString() ?? ""}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                  placeholder="Password"
                  type="password"
                  theme="transparent"
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.password.message?.toString()}
                  </p>
                )}
              </label>
              <div className="flex justify-end text-end">
                <a
                  href="/forget-password"
                  className="flex font-sans text-[12px] font-medium text-gray-400 hover:underline"
                >
                  Forgot password ?
                </a>
              </div>
              <div className="flex justify-center text-center">
              <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Login..." : "Login"}
                </Button>
              </div>
              <div className="flex items-center justify-center gap-2 text-center">
                <p className="font-sans font-medium text-black">
                  Need an account?
                </p>
                <Link
                  href="/signup"
                  className="flex font-sans font-medium text-primary hover:underline"
                >
                  Create Account
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
