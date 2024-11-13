/* eslint-disable @next/next/no-img-element */
const Login = () => {
  return (
    <>
      <div className="grid h-screen grid-cols-2 items-center justify-center bg-bgSecondary duration-300 ease-in max-[1040px]:grid-cols-1">
        <div className="flex h-full w-full justify-end">
          <div className="flex h-full w-[700px] items-center justify-end max-[1040px]:hidden">
            <img className="h-full w-full" src="images/login.png" alt="#" />
          </div>
        </div>
        <div className="gird items-center justify-center text-center">
          <div className="mb-10 grid">
            <h1 className="font-sans text-[28px] font-bold text-black">
              Log in
            </h1>
            <p className="font-sans text-[20px] font-semibold text-gray-400">
              Sign in to enjoy the feature of EduAI
            </p>
          </div>
          <div className="grid items-center justify-center">
            <form className="grid gap-10">
              <label
                htmlFor="email"
                className="grid text-start font-sans text-[18px] font-semibold text-black"
              >
                <input
                  id="email"
                  placeholder="Enter Your Email"
                  className={`text-textPrimary w-[450px] rounded-xl border px-4 py-3 outline-none max-[471px]:w-[350px]`}
                />
              </label>
              <label
                htmlFor="password"
                className="grid text-start font-sans text-[18px] font-semibold text-black"
              >
                <input
                  id="password"
                  placeholder="Enter Your Password"
                  className={`text-textPrimary w-[450px] rounded-xl border px-4 py-3 outline-none max-[471px]:w-[350px]`}
                  type="password"
                />
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
                <button
                  type="submit"
                  className="hover:bg-hover w-[450px] rounded-xl bg-primary px-4 py-2 text-[18px] font-bold text-white duration-300 ease-in hover:shadow-xl max-[471px]:w-[350px]"
                >
                  Login
                </button>
              </div>
              <div className="flex items-center justify-center gap-2 text-center">
                <p className="font-sans font-medium text-black">
                  Need an account?
                </p>
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
