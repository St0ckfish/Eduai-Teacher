"use client";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Button from "~/_components/Button";
import Container from "~/_components/Container";
import Input from "~/_components/Input";
import SearchableSelect from "~/_components/SearchSelect";
import { Text } from "~/_components/Text";
import { useCreateExam, useGetAllClasses, useGetAllCourses, useGetAllExamTypesId } from "~/APIs/hooks/useExam";
import useLanguageStore from "~/APIs/store";
import { type ExamFormData } from "~/types";

const Bus = () => {
  const { mutate, isPending } = useCreateExam();
  const {
    control,
    handleSubmit,
    register,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ExamFormData>({
    shouldUnregister: false,
  });

  const language = useLanguageStore((state) => state.language);
  const translate = (en: string, fr: string, ar: string) => {
    return language === "fr" ? fr : language === "ar" ? ar : en;
  };

  const onSubmit = (data: ExamFormData) => {
    mutate(data, {
      onSuccess: () => {
        toast.success(translate("Form submitted successfully!", "Formulaire soumis avec succès!", "تم إرسال النموذج بنجاح!"));
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

  const { data: classes, isLoading: isClasses } = useGetAllClasses();
  const { data: courses, isLoading: isCourses } = useGetAllCourses();
  const { data: examType, isLoading: isExamType } = useGetAllExamTypesId(watch("courseId")?.toString());

  const examTypeOptions =
    examType?.data?.map(
      (type: { examTypeId: number; name: string; examGrade: number }) => ({
        value: type.examTypeId,
        label: `${type.name} (${type.examGrade} points)`,
      })
    ) || [];

  const classesOptions =
    classes?.data?.map(
      (school: { classroomId: string; classroomName: string; classroomStudyLevel: string }) => ({
        value: school.classroomId,
        label: `${school.classroomStudyLevel} - ${school.classroomName}`,
      })
    ) || [];
    
  const coursesOptions =
    courses?.data?.map(
      (school: { courseId: string; courseName: string; courseCode: string }) => ({
        value: school.courseId,
        label: `${school.courseName} - ${school.courseCode}`,
      })
    ) || [];

  return (
    <>
      <Container>
        <div className="mt-8 w-full overflow-x-hidden rounded-xl bg-bgPrimary p-4">
          <Text font={"bold"} size={"4xl"}>
            {translate("Add Exam", "Ajouter un examen", "إضافة امتحان")}
          </Text>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2 w-full md:w-3/4">
              <div>
                <label htmlFor="courseId" className="block">
                  <Controller
                    name="courseId"
                    control={control}
                    rules={{ required: translate("Course selection is required", "La sélection du cours est obligatoire", "يجب اختيار المادة") }}
                    render={({ field: { onChange, value } }) => (
                      <SearchableSelect
                        error={errors.courseId?.message?.toString() ?? ""}
                        value={value}
                        onChange={(val) => {
                          onChange(val);
                          setValue('examTypeId', 0);
                        }}
                        placeholder={translate("Course Id", "ID du cours", "معرف المادة")}
                        options={coursesOptions}
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
                    rules={{ required: translate("Classroom selection is required", "La sélection de la classe est obligatoire", "يجب اختيار الفصل") }}
                    render={({ field: { onChange, value } }) => (
                      <SearchableSelect
                        error={errors.classroomId?.message?.toString() ?? ""}
                        value={value}
                        onChange={onChange}
                        placeholder={translate("Classroom Id", "ID de la classe", "معرف الفصل")}
                        options={classesOptions}
                        bgColor="bg-bgPrimary"
                        border="border-border"
                      />
                    )}
                  />
                </label>
              </div>
              <label htmlFor="name" className="">
                <Input
                  {...register("name", { required: translate("Name is required", "Le nom est requis", "الاسم مطلوب") })}
                  error={errors.name?.message?.toString() ?? ""}
                  placeholder={translate("Name", "Nom", "الاسم")}
                  theme="transparent"
                  className="border border-gray-200 dark:border-gray-600"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-500">{errors.name.message?.toString()}</p>
                )}
              </label>
              <div>
                <label htmlFor="examTypeId" className="block">
                  <Controller
                    name="examTypeId"
                    control={control}
                    rules={{ required: translate("Exam Type selection is required", "La sélection du type d'examen est obligatoire", "يجب اختيار نوع الامتحان") }}
                    render={({ field: { onChange, value } }) => (
                      <SearchableSelect
                        error={errors.examTypeId?.message?.toString() ?? ""}
                        value={value}
                        onChange={onChange}
                        placeholder={translate("Exam Type", "Type d'examen", "نوع الامتحان")}
                        options={examTypeOptions}
                        bgColor="bg-bgPrimary"
                        border="border-border"
                        isDisabled={!watch("courseId")}
                      />
                    )}
                  />
                </label>
              </div>
              <label htmlFor="examDate" className="">
                <Input
                  {...register("examDate", { required: translate("Exam Date is required", "La date de l'examen est requise", "تاريخ الامتحان مطلوب") })}
                  error={errors.examDate?.message?.toString() ?? ""}
                  placeholder={translate("Exam Date", "Date de l'examen", "تاريخ الامتحان")}
                  type="date"
                  theme="transparent"
                  className="border border-gray-200 dark:border-gray-600"
                />
                {errors.examDate && (
                  <p className="mt-1 text-sm text-red-500">{errors.examDate.message?.toString()}</p>
                )}
              </label>
              <label htmlFor="examBeginning" className="">
                <Input
                  {...register("examBeginning", { required: translate("Exam Beginning is required", "Le début de l'examen est requis", "بداية الامتحان مطلوبة") })}
                  error={errors.examBeginning?.message?.toString() ?? ""}
                  placeholder={translate("Exam Beginning", "Début de l'examen", "بداية الامتحان")}
                  type="time"
                  theme="transparent"
                  className="border border-gray-200 dark:border-gray-600"
                />
                {errors.examBeginning && (
                  <p className="mt-1 text-sm text-red-500">{errors.examBeginning.message?.toString()}</p>
                )}
              </label>
              <label htmlFor="examEnding" className="">
                <Input
                  {...register("examEnding", { required: translate("Exam Ending is required", "La fin de l'examen est requise", "نهاية الامتحان مطلوبة") })}
                  error={errors.examEnding?.message?.toString() ?? ""}
                  placeholder={translate("Exam Ending", "Fin de l'examen", "نهاية الامتحان")}
                  type="time"
                  theme="transparent"
                  className="border border-gray-200 dark:border-gray-600"
                />
                {errors.examEnding && (
                  <p className="mt-1 text-sm text-red-500">{errors.examEnding.message?.toString()}</p>
                )}
              </label>
              <div>
                <Button type="submit" disabled={isPending}>
                  {isPending
                    ? translate("Submitting...", "En cours de soumission...", "جارٍ الإرسال...")
                    : translate("Submit", "Soumettre", "إرسال")}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </Container>
    </>
  );
};

export default Bus;