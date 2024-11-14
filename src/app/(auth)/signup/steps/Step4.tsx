import Image from "next/image";
import Link from "next/link";
import React from "react";
import Button from "~/_components/Button";
import Input from "~/_components/Input";

type StepFourProps = {
  prevStep: () => void;
};

const StepFour: React.FC<StepFourProps> = ({ prevStep }) => {
  const stepsDescription = [
    "Location & School",
    "Personal Details 1",
    "Personal Details 2",
    "Authentication",
  ];

  return (
    <>
      <div className="flex min-h-screen items-center justify-center bg-bgSecondary duration-300 ease-in">
        <div className="absolute left-4 top-4 md:left-8 md:top-8">
          <Link href="/">
            <Image
              src="/images/logo.png"
              alt="Logo"
              width={150}
              height={40}
              className="w-[120px] md:w-[150px]"
            />
          </Link>
        </div>
        <div className="flex w-full max-w-lg flex-col items-center p-4 md:p-8">
          <h1 className="mb-6 text-3xl font-bold text-black md:text-4xl">
            Sign Up
          </h1>

          {/* Steps */}
          <div className="mb-20 flex w-full items-center justify-between">
            <div className="flex items-center">
              {[1, 2, 3, 4].map((step, index) => (
                <React.Fragment key={step}>
                  <div
                    className={`relative flex h-8 w-8 items-center justify-center rounded-full bg-primary font-bold text-white`}
                  >
                    {step}
                    <span className="absolute -left-[15px] top-10 w-[100px] text-[10px] text-black sm:left-[-22px] sm:w-[120px] sm:text-xs">
                      {stepsDescription[index]}
                    </span>{" "}
                  </div>
                  {index < 3 && (
                    <hr className="h-[5px] w-20 bg-primary sm:w-[105px]" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Form */}
          <form className="w-full space-y-6">
            <label htmlFor="nationality" className="block">
              <select
                name="nationality"
                id="nationality"
                className="w-full rounded-lg border border-gray-400 bg-bgSecondary p-3 text-gray-700 outline-none transition duration-200 ease-in"
              >
                <option value="nationality">Select Nationality</option>
              </select>
            </label>

            <label htmlFor="gender" className="block">
              <select
                name="gender"
                id="gender"
                className="w-full rounded-lg border border-gray-400 bg-bgSecondary p-3 text-gray-700 outline-none transition duration-200 ease-in"
              >
                <option value="gender">Select Gender</option>
              </select>
            </label>

            <label htmlFor="religion" className="block">
              <select
                name="religion"
                id="religion"
                className="w-full rounded-lg border border-gray-400 bg-bgSecondary p-3 text-gray-700 outline-none transition duration-200 ease-in"
              >
                <option value="religion">Select Religion</option>
              </select>
            </label>

            <label htmlFor="nationalId" className="block">
              <Input placeholder="National ID" className="-mt-1 w-full" />
            </label>

            <label htmlFor="birth" className="block">
              <Input
                type="date"
                placeholder="Date of birth"
                className="-mb-6 -mt-7 w-full"
              />
            </label>

            <div className="flex space-x-2">
              <label htmlFor="country_code" className="w-1/3">
                <select
                  name="country_code"
                  id="country_code"
                  className="w-full rounded-lg border border-gray-400 bg-bgSecondary p-3 text-gray-700 outline-none"
                >
                  <option value="+20">+20</option>
                </select>
              </label>

              <label htmlFor="phone" className="w-2/3">
                <Input
                  type="tel"
                  placeholder="Phone Number"
                  className="-mt-[4px] w-full"
                  pattern="^\+?[1-9]\d{1,14}$"
                />
              </label>
            </div>

            {/* Navigation Buttons */}
            <div className="mt-8 flex justify-center space-x-4">
              <Button
                type="button"
                onClick={prevStep}
                theme="outline"
              >
                Prev
              </Button>
              <Button
                type="button"
              >
                Sign Up
              </Button>
            </div>

            {/* Sign-in Prompt */}
            <div className="mt-6 flex items-center justify-center space-x-2">
              <p className="text-sm text-gray-500">Already have an account?</p>
              <Link
                href="/login"
                className="text-sm font-semibold text-primary hover:underline"
              >
                Sign In
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default StepFour;
