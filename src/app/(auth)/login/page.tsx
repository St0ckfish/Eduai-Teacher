"use client"
import { Text } from "~/_components/Text";

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
        <div className="flex h-full w-full justify-end max-[1040px]:hidden">
          <div className="flex h-full w-[700px] items-center justify-end">
            <img className="h-full w-full" src="images/login.png" alt="#" />
          </div>
        </div>
        <div className="gird items-center justify-center text-center">
          <div className="mb-10 grid">
            <Text font={"bold"} size={"4xl"} className="mb-2">
              Log in
            </Text>
            <Text font={"medium"} size={"lg"} color={"gray"}>
              Sign in to enjoy the feature of EduAI
            </Text>
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
                  error={typeof errors.username?.message === 'string' ? errors.username.message : ''}
                  placeholder="Username"
                  theme="transparent"
                />
                {errors.username && (
                  <p className="mt-1 text-sm text-error">
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
                  <p className="mt-1 text-sm text-error">
                    {errors.password.message?.toString()}
                  </p>
                )}
              </label>
              <div className="flex gap-2 items-center">
              Remember Me
                <input type="checkbox" name="remember" id="" />
              </div>
              <div className="flex justify-center text-center">
              <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Login..." : "Login"}
                </Button>
              </div>
              <div className="flex items-center justify-center gap-2 text-center">
                <Text font={"medium"} size={"md"} color={"muted"}>
                  Need an account?
                </Text>
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
