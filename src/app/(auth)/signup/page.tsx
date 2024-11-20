"use client";

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Image from "next/image";
import Link from "next/link";
import Button from "~/_components/Button";
import SearchableSelect from "~/_components/SearchSelect";
import Spinner from "~/_components/Spinner";
import Input from "~/_components/Input";
import MultiSelectComponent from "~/_components/MultiSelect";
import {
  useGetAllRegions,
  useGetAllSchools,
  useGetAllCountries,
  useGetAllNationalities,
  useSignUp,
} from "~/APIs/hooks/useAuth";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { toast } from "react-toastify";
import { Text } from "~/_components/Text";

const Signup = () => {
  const [step, setStep] = useState(1);
  const {
    control,
    handleSubmit,
    register,
    trigger,
    formState: { errors },
  } = useForm({
    shouldUnregister: false,
  });

  const nextStep = async () => {
    const valid = await triggerValidation();
    if (valid) setStep((prev) => prev + 1);
  };

  const [errorMessage, setErrorMessage] = useState<[]>([]);

  const prevStep = () => setStep((prev) => prev - 1);

  const stepsDescription = [
    "Location & School",
    "Personal Details 1",
    "Personal Details 2",
    "Authentication",
  ];

  const { data: schoolData, isLoading: isSchools } = useGetAllSchools() as {
    data: { data: [] };
    isLoading: boolean;
  };
  const { data: regionData, isLoading: isRegions } = useGetAllRegions() as {
    data: { data: [] };
    isLoading: boolean;
  };
  const { data: countryData, isLoading: isCountries } =
    useGetAllCountries() as { data: { data: [] }; isLoading: boolean };
  const { data: nationalityData, isLoading: isNationalities } =
    useGetAllNationalities() as {
      data: Record<string, string>;
      isLoading: boolean;
    };

  const schoolOptions =
    schoolData?.data?.map(
      (school: {
        cityName: string;
        countryName: string;
        regionName: string;
        id: number;
        name: string;
      }) => ({
        value: school.id,
        label: `${school.name} - ${school.regionName}, ${school.cityName}, ${school.countryName}`,
      }),
    ) || [];

  const regionOptions =
    regionData?.data?.map(
      (region: {
        cityName: string;
        countryName: string;
        regionName: string;
        regionId: number;
        name: string;
      }) => ({
        value: region.regionId,
        label: `${region.regionName} - ${region.cityName}`,
      }),
    ) || [];

  const countryOptions = countryData?.data
    ? Object.entries(countryData.data).map(
        ([key, value]: [string, string]) => ({
          value: key,
          label: `+${key} (${value})`,
        }),
      )
    : [];

  const optionsNationalities = nationalityData?.data
    ? Object.entries(nationalityData.data).map(([key, value]) => ({
        value: key,
        label: `${value}`,
      }))
    : [];

  const { mutate, isPending: isSubmitting } = useSignUp();

  const onSubmit = (data: any) => {
    mutate(data, {
      onSuccess: () => {
        toast.success("Form submitted successfully!");
        // Optionally, redirect the user to another page
        // router.push("/welcome");
      },
      onError: (err: any) => {
        toast.error(err.response.data.message);
        setErrorMessage(err.response.data.data);
        // Optionally, set a form-level error
      },
    });
  };

  // Function to trigger validation for the current step
  const triggerValidation = async () => {
    let fieldsToValidate: string[] = [];
    switch (step) {
      case 1:
        fieldsToValidate = ["username", "email", "schoolId", "regionId"];
        break;
      case 2:
        fieldsToValidate = ["name_en", "name_fr", "name_ar", "subjects"];
        break;
      case 3:
        fieldsToValidate = ["qualification", "password"];
        break;
      case 4:
        fieldsToValidate = [
          "nationality",
          "gender",
          "nid",
          "birthDate",
          "countryCode",
          "number",
        ];
        break;
      default:
        break;
    }
    const result = await trigger(fieldsToValidate);
    return result;
  };

  if (isSchools || isRegions || isCountries || isNationalities) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bgSecondary duration-300 ease-in">
        <Spinner />
      </div>
    );
  }

  return (
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
        <Text font={"bold"} size={"4xl"} className="mb-4">
          Sign Up
        </Text>

        {/* Steps */}
        <div className="mb-20 flex w-full items-center justify-between">
          <div className="flex items-center">
            {[1, 2, 3, 4].map((stepIndex, index) => (
              <React.Fragment key={stepIndex}>
                <div
                  className={`relative flex h-8 w-8 items-center justify-center rounded-full ${
                    index < step ? "bg-primary" : "bg-gray-300"
                  } font-bold text-white`}
                >
                  {stepIndex}
                  <Text className="absolute -left-[15px] top-10 w-[100px] text-[10px] text-textPrimary sm:left-[-22px] sm:w-[120px] sm:text-xs">
                    {stepsDescription[index]}
                  </Text>
                </div>
                {index < 3 && (
                  <hr
                    className={`h-[5px] w-20 ${
                      index < step - 1 ? "bg-primary" : "bg-gray-300"
                    } sm:w-[105px]`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Form */}
        <form className="w-full space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {step === 1 && (
            <>
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
              <label htmlFor="email" className="block">
                <Input
                  error={errors.email?.message?.toString() ?? ""}
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                      message: "Invalid email address",
                    },
                  })}
                  placeholder="E-mail"
                  theme="transparent"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.email.message?.toString()}
                  </p>
                )}
              </label>

              <label htmlFor="school" className="block">
                <Controller
                  name="schoolId"
                  control={control}
                  rules={{ required: "School selection is required" }}
                  defaultValue="" // Initialize with a default value
                  render={({ field: { onChange, value } }) => (
                    <SearchableSelect
                      error={errors.schoolId?.message?.toString() ?? ""}
                      value={value}
                      onChange={onChange}
                      placeholder="Select School"
                      options={schoolOptions}
                    />
                  )}
                />
              </label>
              <label htmlFor="regionId" className="block">
                <Controller
                  name="regionId"
                  control={control}
                  rules={{ required: "Region selection is required" }}
                  defaultValue="" // Initialize with a default value
                  render={({ field: { onChange, value } }) => (
                    <SearchableSelect
                      error={errors.regionId?.message?.toString() ?? ""}
                      value={value}
                      onChange={onChange}
                      placeholder="Select Region"
                      options={regionOptions}
                    />
                  )}
                />
              </label>
              <div className="flex justify-end">
                <Button
                  type="button"
                  onClick={nextStep}
                  disabled={isSubmitting}
                >
                  Next
                </Button>
              </div>
            </>
          )}
          {step === 2 && (
            <>
              <label htmlFor="name_en" className="block">
                <Input
                  error={errors.name_en?.message?.toString() ?? ""}
                  {...register("name_en", {
                    required: "English name is required",
                  })}
                  placeholder="Full Name (English)"
                  theme="transparent"
                />
                {errors.name_en && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.name_en.message?.toString()}
                  </p>
                )}
              </label>
              <label htmlFor="name_fr" className="block">
                <Input
                  error={errors.name_fr?.message?.toString() ?? ""}
                  {...register("name_fr", {
                    required: "French name is required",
                  })}
                  placeholder="Full Name (French)"
                  theme="transparent"
                />
                {errors.name_fr && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.name_fr.message?.toString()}
                  </p>
                )}
              </label>
              <label htmlFor="name_ar" className="block">
                <Input
                  error={errors.name_ar?.message?.toString() ?? ""}
                  {...register("name_ar", {
                    required: "Arabic name is required",
                  })}
                  placeholder="Full Name (Arabic)"
                  theme="transparent"
                />
                {errors.name_ar && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.name_ar.message?.toString()}
                  </p>
                )}
              </label>

              <label htmlFor="subjects" className="block">
                <Controller
                  name="subjects"
                  control={control}
                  rules={{ required: "At least one interest is required" }}
                  render={({ field: { onChange, value } }) => (
                    <MultiSelectComponent
                      value={value}
                      onChange={onChange}
                      options={[
                        { value: "ARABIC", label: "Arabic" },
                        { value: "MUSIC", label: "Music" },
                        { value: "ART", label: "Art" },
                        {
                          value: "FOREIGN_LANGUAGE",
                          label: "Foreign Language",
                        },
                        { value: "ENGLISH", label: "English" },
                        { value: "SOCIAL_STUDIES", label: "Social Studies" },
                        { value: "FRENCH", label: "French" },
                        { value: "MATHEMATICS", label: "Mathematics" },
                        {
                          value: "COMPUTER_SCIENCE",
                          label: "Computer Science",
                        },
                        { value: "CHEMISTRY", label: "Chemistry" },
                        { value: "ECONOMICS", label: "Economics" },
                        { value: "SCIENCE", label: "Science" },
                        { value: "PHYSICS", label: "Physics" },
                        { value: "GEOGRAPHY", label: "Geography" },
                        { value: "HISTORY", label: "History" },
                      ]}
                      placeholder="Select Interests"
                      error={errors.subjects?.message?.toString()}
                    />
                  )}
                />
              </label>
              <div className="flex space-x-4">
                <Button type="button" onClick={prevStep} theme="outline">
                  Prev
                </Button>
                <Button
                  type="button"
                  onClick={nextStep}
                  disabled={isSubmitting}
                >
                  Next
                </Button>
              </div>
            </>
          )}
          {step === 3 && (
            <>
              <label htmlFor="qualification" className="block">
                <Controller
                  name="qualification"
                  control={control}
                  rules={{ required: "Qualification is required" }}
                  defaultValue=""
                  render={({ field: { onChange, value } }) => (
                    <Select onValueChange={onChange} value={value}>
                      <SelectTrigger
                        className={`w-full border ${errors.qualification ? "border-error" : ""}`}
                      >
                        <SelectValue placeholder="Select Qualification" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="HIGH_SCHOOL_DIPLOMA">
                          High School Diploma
                        </SelectItem>
                        <SelectItem value="MASTER_DEGREE">
                          Master Degree
                        </SelectItem>
                        <SelectItem value="BACHELOR_DEGREE">
                          Bachelor Degree
                        </SelectItem>
                        <SelectItem value="DOCTORATE_DEGREE">
                          Doctorate Degree
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.qualification && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.qualification.message?.toString()}
                  </p>
                )}
              </label>

              <label htmlFor="password" className="block">
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
              <label htmlFor="about" className="block">
                <textarea
                  {...register("about")}
                  id="about"
                  placeholder="Write a brief summary about yourself. (Optional)"
                  className="w-full rounded-lg border border-borderPrimary bg-bgSecondary p-3 text-gray-700 outline-none transition duration-200 ease-in"
                ></textarea>
              </label>

              {/* Navigation Buttons */}
              <div className="mt-8 flex justify-center space-x-4">
                <Button type="button" onClick={prevStep} theme="outline">
                  Prev
                </Button>
                <Button
                  type="button"
                  onClick={nextStep}
                  disabled={isSubmitting}
                >
                  Next
                </Button>
              </div>
            </>
          )}
          {step === 4 && (
            <>
              <label htmlFor="nationality" className="block">
                <Controller
                  name="nationality"
                  control={control}
                  rules={{ required: "Nationality is required" }}
                  defaultValue="" // Initialize with a default value
                  render={({ field: { onChange, value } }) => (
                    <SearchableSelect
                      error={errors.nationality?.message?.toString() ?? ""}
                      value={value}
                      onChange={onChange}
                      placeholder="Select Nationality"
                      options={optionsNationalities}
                    />
                  )}
                />
              </label>

              <label htmlFor="gender" className="block">
                <Controller
                  name="gender"
                  control={control}
                  rules={{ required: "Gender is required" }}
                  defaultValue="" // Initialize with a default value
                  render={({ field: { onChange, value } }) => (
                    <Select onValueChange={onChange} value={value}>
                      <SelectTrigger
                        className={`w-full border ${errors.gender ? "border-error" : ""}`}
                      >
                        <SelectValue placeholder="Select Gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="MALE">Male</SelectItem>
                        <SelectItem value="FEMALE">Female</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.gender && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.gender.message?.toString()}
                  </p>
                )}
              </label>

              <label htmlFor="nid" className="block">
                <Input
                  {...register("nid", {
                    required: "National ID is required",
                    pattern: {
                      value: /^[A-Za-z0-9]+$/,
                      message: "Invalid National ID format",
                    },
                  })}
                  error={errors.nid?.message?.toString()}
                  placeholder="National ID"
                  className="-mt-1"
                  theme="transparent"
                />
                {errors.nid && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.nid.message?.toString()}
                  </p>
                )}
              </label>

              <label htmlFor="birthDate" className="block">
                <Input
                  {...register("birthDate", {
                    required: "Date of birth is required",
                    validate: (value) => {
                      const today = new Date();
                      const birthDate = new Date(value);
                      let age = today.getFullYear() - birthDate.getFullYear();
                      const monthDifference =
                        today.getMonth() - birthDate.getMonth();

                      // Adjust age if the current month and day are before the birth month and day
                      if (
                        monthDifference < 0 ||
                        (monthDifference === 0 &&
                          today.getDate() < birthDate.getDate())
                      ) {
                        age--;
                      }

                      return age >= 20 || "You must be at least 20 years old";
                    },
                  })}
                  error={errors.birthDate?.message?.toString()}
                  type="date"
                  placeholder="Date of birth"
                  className="!mb-2 !mt-2"
                  theme="transparent"
                />
                {errors.birthDate && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.birthDate.message?.toString()}
                  </p>
                )}
              </label>

              <div className="mt-3 flex space-x-2">
                <label htmlFor="country_code" className="block w-1/3">
                  <Controller
                    name="countryCode"
                    control={control}
                    rules={{ required: "Country code is required" }}
                    defaultValue="" // Initialize with a default value
                    render={({ field: { onChange, value } }) => (
                      <SearchableSelect
                        error={errors.countryCode?.message?.toString() ?? ""}
                        value={value}
                        onChange={onChange}
                        placeholder="Country"
                        options={countryOptions}
                      />
                    )}
                  />
                </label>

                <label htmlFor="number" className="block w-2/3 translate-y-1">
                  <Input
                    {...register("number", {
                      required: "Phone number is required",
                      pattern: {
                        value: /^\+?[1-9]\d{1,14}$/,
                        message: "Invalid phone number format",
                      },
                    })}
                    type="tel"
                    error={errors.number?.message?.toString()}
                    placeholder="Phone Number"
                    className="-mt-[4px]"
                    theme="transparent"
                  />
                  {errors.number && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.number?.message?.toString()}
                    </p>
                  )}
                </label>
              </div>

              {/* Navigation Buttons */}
              <div className="mt-8 flex justify-center space-x-4">
                <Button type="button" onClick={prevStep} theme="outline">
                  Prev
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Sign Up..." : "Sign Up"}
                </Button>
              </div>

              {/* Display Submission Error */}
              <p className="mt-4 text-center text-sm text-red-500">
                {Array.isArray(errorMessage) &&
                  errorMessage.map((err: string, index: number) => (
                    <div key={index}>
                      <p>{err}</p>
                    </div>
                  ))}
              </p>
            </>
          )}
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
  );
};

export default Signup;
