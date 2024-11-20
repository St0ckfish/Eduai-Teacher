import Input from "~/_components/Input";
import { Text } from "~/_components/Text";

/* eslint-disable @next/next/no-img-element */
const Login = () => {
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
          <div className="grid items-center justify-center">
            <form className="grid gap-5">
              <label
                htmlFor="email"
              >
                <Input theme="transparent" id="email" placeholder="Enter Your Email" />
              </label>
              <label
                htmlFor="password"
              >
                <Input
                  theme="transparent"
                  id="password"
                  placeholder="Enter Your Password"
                  type="password"
                />
              </label>
              <div className="flex justify-end text-end">
                <a href="/forget-password">
                  <Text font={"medium"} size={"md"} color={"muted"}>
                    Forgot Password ?
                  </Text>
                </a>
              </div>
              <div className="flex justify-center text-center">
                <button
                  type="submit"
                  className="hover:bg-hover w-[450px] rounded-xl bg-primary px-4 py-2 text-[18px] font-bold text-white duration-300 ease-in hover:shadow-xl max-[471px]:w-[350px]"
                >
                  Login
                </button>
              </div>
              <div className="flex items-center justify-center gap-2 text-center">
                <Text font={"medium"} size={"md"} color={"muted"}>
                  Need an account?
                </Text>
                <a
                  href="/signup"
                  className="flex font-sans font-medium text-primary hover:underline"
                >
                  Create Account
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
