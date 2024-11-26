"use client";
import { Controller, useForm } from "react-hook-form";
import Button from "~/_components/Button";
import Container from "~/_components/Container";
import Input from "~/_components/Input";
import SearchableSelect from "~/_components/SearchSelect";
import { Text } from "~/_components/Text";
import { SignUpFormData } from "~/types";

const Bus = () => {
  const {
    control,
    handleSubmit,
    register,
    trigger,
    formState: { errors },
  } = useForm<SignUpFormData>({
    shouldUnregister: false,
  });

  const classOptions = [
    { label: "Class 1", value: "class-1" },
    { label: "Class 2", value: "class-2" },
    { label: "Class 3", value: "class-3" },
    { label: "Class 4", value: "class-4" },
    { label: "Class 5", value: "class-5" },
  ];

  const examOptions = [
    { label: "Regular", value: "regular" },
    { label: "Special", value: "special" },
  ];

  const examBeginningOptions = [
    { label: "1st", value: "1st" },
    { label: "2nd", value: "2nd" },
    { label: "3rd", value: "3rd" },
    { label: "4th", value: "4th" },
  ];

  const examEndingOptions = [
    { label: "1st", value: "1st" },
    { label: "2nd", value: "2nd" },
    { label: "3rd", value: "3rd" },
    { label: "4th", value: "4th" },
  ];
  return (
    <>
      <Container>
        <div className="mt-8 w-full overflow-x-hidden rounded-xl bg-bgPrimary p-4">
          <Text font={"bold"} size={"4xl"}>
            Add Exam
          </Text>
          <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2 w-full md:w-3/4">
            <div>
              <Input
                name="title"
                placeholder="title"
                theme="transparent"
                border="gray"
              />
            </div>
            <div>
              <Input
                name="score"
                placeholder="score"
                theme="transparent"
                border="gray"
              />
            </div>
            <div>
              <label htmlFor="schoolId" className="block">
                <Controller
                  name="schoolId"
                  control={control}
                  rules={{ required: "Class selection is required" }}
                  defaultValue=""
                  render={({ field: { onChange, value } }) => (
                    <SearchableSelect
                      error={errors.schoolId?.message?.toString() ?? ""}
                      value={value}
                      onChange={onChange}
                      placeholder="Select Class"
                      options={classOptions}
                      bgColor="bg-bgPrimary"
                      border="border-border"
                    />
                  )}
                />
              </label>
            </div>
            <div>
              <label htmlFor="schoolId" className="block">
                <Controller
                  name="schoolId"
                  control={control}
                  rules={{ required: "Class selection is required" }}
                  defaultValue=""
                  render={({ field: { onChange, value } }) => (
                    <SearchableSelect
                      error={errors.schoolId?.message?.toString() ?? ""}
                      value={value}
                      onChange={onChange}
                      placeholder="Exam Type"
                      options={examOptions}
                      bgColor="bg-bgPrimary"
                      border="border-border"
                    />
                  )}
                />
              </label>
            </div>
            <div>
              <label htmlFor="schoolId" className="block">
                <Controller
                  name="schoolId"
                  control={control}
                  rules={{ required: "Class selection is required" }}
                  defaultValue=""
                  render={({ field: { onChange, value } }) => (
                    <SearchableSelect
                      error={errors.schoolId?.message?.toString() ?? ""}
                      value={value}
                      onChange={onChange}
                      placeholder="Exam Beginning"
                      options={examBeginningOptions}
                      bgColor="bg-bgPrimary"
                      border="border-border"
                    />
                  )}
                />
              </label>
            </div>
            <div>
              <label htmlFor="schoolId" className="block">
                <Controller
                  name="schoolId"
                  control={control}
                  rules={{ required: "Class selection is required" }}
                  defaultValue=""
                  render={({ field: { onChange, value } }) => (
                    <SearchableSelect
                      error={errors.schoolId?.message?.toString() ?? ""}
                      value={value}
                      onChange={onChange}
                      placeholder="Exam ending"
                      options={examEndingOptions}
                      bgColor="bg-bgPrimary"
                      border="border-border"
                    />
                  )}
                />
              </label>
            </div>
            <div>
              <label htmlFor="birthDate" className="block">
                <Input
                  type="date"
                  placeholder="Exam Date"
                  className="!mb-2 !mt-2"
                  theme="transparent"
                  border="gray"
                />
              </label>
            </div>
            <div></div>
            <div>
              <Button>Continue</Button>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Bus;
