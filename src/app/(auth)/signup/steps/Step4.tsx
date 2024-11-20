/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
import Image from "next/image";
import Link from "next/link";
import React from "react";
import type { Control, FieldErrors, FieldValues } from "react-hook-form";
import Button from "~/_components/Button";
import Input from "~/_components/Input";
import SearchableSelect from "~/_components/SearchSelect";
import Spinner from "~/_components/Spinner";
import { useGetAllCountries, useGetAllNationalities } from "~/APIs/hooks/useAuth";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

type StepFourProps = {
  prevStep: () => void;
  control: Control;
  errors: FieldErrors<FieldValues>;
};

const StepFour: React.FC<StepFourProps> = ({ prevStep, errors, control }) => {
  interface CountryResponse {
    data: Record<string, string>;
  }
  const { data, isLoading } = useGetAllCountries() as {
    data: CountryResponse;
    isLoading: boolean;
  };
  const { data: nationalities, isLoading: isNationalities } = useGetAllNationalities() as {
    data: Record<string, string>;
    isLoading: boolean;
  };

  const optionsNationalities =
  (nationalities?.data &&
  Object.entries(nationalities.data).map(([key, value]) => ({
    value: key,
    label: `${value}`,
  }))) || [];

  const countryOptions =
    data?.data &&
    Object.entries(data.data).map(([key, value]) => ({
      value: key,
      label: `+${key} (${value})`,
    }));

  const stepsDescription = [
    "Location & School",
    "Personal Details 1",
    "Personal Details 2",
    "Authentication",
  ];
  if (isLoading || isNationalities) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bgSecondary duration-300 ease-in">
        <Spinner />
      </div>
    );
  }
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
              
                <SearchableSelect
                  control={control}
                  errors={errors}
                  name="nationality"
                  placeholder="Select Nationality"
                  options={optionsNationalities}
                />
            </label>

            <label htmlFor="gender" className="block">
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MALE">MALE</SelectItem>
                  <SelectItem value="FEMALE">Female</SelectItem>
                </SelectContent>
              </Select>
            </label>
            
            <label htmlFor="nationalId" className="block">
              <Input
                placeholder="National ID"
                className="-mt-1"
                theme="transparent"
              />
            </label>

            <label htmlFor="birth" className="block">
              <Input
                type="date"
                placeholder="Date of birth"
                className="-mb-6 -mt-7"
                theme="transparent"
              />
            </label>

            <div className="items- flex space-x-2">
              <label htmlFor="country_code" className="w-1/3">
                <SearchableSelect
                  control={control}
                  errors={errors}
                  name="countryCode"
                  placeholder="Select Country"
                  options={countryOptions}
                />
              </label>

              <label htmlFor="phone" className="w-2/3 translate-y-1">
                <Input
                  type="tel"
                  placeholder="Phone Number"
                  className="-mt-[4px]"
                  theme="transparent"
                  pattern="^\+?[1-9]\d{1,14}$"
                />
              </label>
            </div>

            {/* Navigation Buttons */}
            <div className="mt-8 flex justify-center space-x-4">
              <Button type="button" onClick={prevStep} theme="outline">
                Prev
              </Button>
              <Button type="button">Sign Up</Button>
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
