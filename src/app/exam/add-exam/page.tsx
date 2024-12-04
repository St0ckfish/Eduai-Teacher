"use client";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Button from "~/_components/Button";
import Container from "~/_components/Container";
import Input from "~/_components/Input";
import SearchableSelect from "~/_components/SearchSelect";
import { Text } from "~/_components/Text";
import { useCreateExam } from "~/APIs/hooks/useExam";
import { type ExamFormData } from "~/types";

const Bus = () => {
  const { mutate, isPending} = useCreateExam()
  const {
    control,
    handleSubmit,
    register,
    trigger,
    formState: { errors },
  } = useForm<ExamFormData>({
    shouldUnregister: false,
  });

  const onSubmit = (data: ExamFormData) => {
    mutate(data, {
      onSuccess: () => {
        toast.success("Form submitted successfully!");
      },
      onError: (err: Error & { response?: { data: { message: string; data: [] } } }) => {
        if (err.response?.data) {
          toast.error(err.response.data.message);
        } else {
          toast.error(err.message);
        }
      },
    });
  };

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
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2 w-full md:w-3/4">
              <div>
                <label htmlFor="teacherId" className="block">
                  <Controller
                    name="teacherId"
                    control={control}
                    rules={{ required: "Teacher selection is required" }}
                    render={({ field: { onChange, value } }) => (
                      <SearchableSelect
                        error={errors.teacherId?.message?.toString() ?? ""}
                        value={value}
                        onChange={onChange}
                        placeholder="Teacher Id"
                        options={examEndingOptions}
                        bgColor="bg-bgPrimary"
                        border="border-border"
                      />
                    )}
                  />
                </label>
              </div>
              <div>
                <label htmlFor="courseId" className="block">
                  <Controller
                    name="courseId"
                    control={control}
                    rules={{ required: "Course selection is required" }}
                    render={({ field: { onChange, value } }) => (
                      <SearchableSelect
                        error={errors.courseId?.message?.toString() ?? ""}
                        value={value}
                        onChange={onChange}
                        placeholder="Course Id"
                        options={examEndingOptions}
                        bgColor="bg-bgPrimary"
                        border="border-border"
                      />
                    )}
                  />
                </label>
              </div>
              <div>
                <label htmlFor="classroomId" className="block">
                  <Controller
                    name="classroomId"
                    control={control}
                    rules={{ required: "Classroom selection is required" }}
                    render={({ field: { onChange, value } }) => (
                      <SearchableSelect
                        error={errors.classroomId?.message?.toString() ?? ""}
                        value={value}
                        onChange={onChange}
                        placeholder="Classroom Id"
                        options={examEndingOptions}
                        bgColor="bg-bgPrimary"
                        border="border-border"
                      />
                    )}
                  />
                </label>
              </div>
              <label htmlFor="name" className="">
                  <Input
                    {...register("name", { required: "name is required" })}
                    error={errors.name?.message?.toString() ?? ""}
                    placeholder="name"
                    theme="transparent"
                    className="border border-gray-200"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.name.message?.toString()}
                    </p>
                  )}
                </label>
              <label htmlFor="examTypeId" className="">
                  <Input
                    {...register("examTypeId", { required: "examTypeId is required" })}
                    error={errors.examTypeId?.message?.toString() ?? ""}
                    placeholder="examTypeId"
                    theme="transparent"
                    className="border border-gray-200"
                  />
                  {errors.examTypeId && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.examTypeId.message?.toString()}
                    </p>
                  )}
                </label>
              <label htmlFor="examDate" className="">
                  <Input
                    {...register("examDate", { required: "examDate is required" })}
                    error={errors.examDate?.message?.toString() ?? ""}
                    placeholder="examDate"
                    type="date"
                    theme="transparent"
                    className="border border-gray-200"
                  />
                  {errors.examDate && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.examDate.message?.toString()}
                    </p>
                  )}
                </label>
              <label htmlFor="examBeginning" className="">
                  <Input
                    {...register("examBeginning", { required: "examBeginning is required" })}
                    error={errors.examBeginning?.message?.toString() ?? ""}
                    placeholder="examBeginning"
                    type="time"
                    theme="transparent"
                    className="border border-gray-200"
                  />
                  {errors.examBeginning && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.examBeginning.message?.toString()}
                    </p>
                  )}
                </label>
              <label htmlFor="examEnding" className="">
                  <Input
                    {...register("examEnding", { required: "examEnding is required" })}
                    error={errors.examEnding?.message?.toString() ?? ""}
                    placeholder="examEnding"
                    type="time"
                    theme="transparent"
                    className="border border-gray-200"
                  />
                  {errors.examEnding && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.examEnding.message?.toString()}
                    </p>
                  )}
                </label>
              <div>
                <Button type="submit" disabled={isPending}>{isPending ? "Continue..." : "Continue"}</Button>
              </div>
            </div>
          </form>
        </div>
      </Container>
    </>
  );
};

export default Bus;
