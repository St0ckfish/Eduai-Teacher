"use client";
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import Box from "~/_components/Box";
import Button from "~/_components/Button";
import Container from "~/_components/Container";
import Input from "~/_components/Input";
import Spinner from "~/_components/Spinner";
import { Text } from "~/_components/Text";
import {
  useGetAllExams,
  useGetExamResults,
  usePutGrade,
} from "~/APIs/hooks/useExam";
import useLanguageStore from "~/APIs/store";
import type { ExamResult } from "~/types";

const Grades = () => {
  const { mutate: putGrade } = usePutGrade();
  const { data: dataExams } = useGetAllExams();
  const language = useLanguageStore((state) => state.language);
  const translate = (en: string, fr: string, ar: string) => {
    return language === "fr" ? fr : language === "ar" ? ar : en;
  };

  const [selectedExamId, setSelectedExamId] = useState<string>("");
  const { data: dataExamsResults, isLoading, error } =
    useGetExamResults(selectedExamId);
  const router = useRouter();

  const [grades, setGrades] = useState<Record<string, string>>({});

  const handleSelectExam = (event: any) => {
    setSelectedExamId(event.target.value);
  };

  const handleGradeChange = (id: string, value: string) => {
    if (
      value === "" ||
      (!isNaN(Number(value)) && Number(value) >= 0 && Number(value) <= 20)
    ) {
      setGrades((prev) => ({ ...prev, [id]: value }));
    }
  };

  const handleSubmitGrade = (id: string, grade: string, studentName: string) => {
    const gradeNumber = Number(grade);

    if (isNaN(gradeNumber) || gradeNumber < 0 || gradeNumber > 20) {
      toast.error(
        translate(
          "Grade should be a number between 0 and 20.",
          "La note doit être un nombre entre 0 et 20.",
          "الدرجة يجب أن تكون بين 0 و 20."
        )
      );
      return;
    }

    putGrade(
      {
        examResultId: id,
        scoreData: { score: gradeNumber, scoreDate: new Date().toISOString() },
      },
      {
        onSuccess: () => {
          toast.success(
            translate(
              `Updated grade for ${studentName}!`,
              `Note mise à jour pour ${studentName}!`,
              `تم تحديث درجة ${studentName}!`
            )
          );
          setGrades((prev) => ({ ...prev, [id]: "" }));
          router.push("/grades");
        },
        onError: () => {
          toast.error(
            translate(
              "Failed to submit grade.",
              "Échec de la soumission de la note.",
              "فشل في إرسال الدرجة."
            )
          );
        },
      }
    );
  };

  return (
    <Container>
      <div className="flex w-full items-center justify-between gap-10">
        <div className="flex w-[300px]">
          <select
            className="flex w-full items-center gap-3 whitespace-nowrap rounded-xl bg-bgPrimary px-6 py-4 font-semibold outline-none duration-200 ease-in hover:shadow-lg"
            onChange={handleSelectExam}
          >
            <option value="">
              {translate(
                "Select Exam",
                "Sélectionnez un examen",
                "اختر الامتحان"
              )}
            </option>
            {dataExams?.map((exam) => (
              <option key={exam.id} value={exam.id}>
                {exam.examName}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-10 flex h-full w-full items-center justify-center">
        {selectedExamId ? (
          <Box>
            <Text font={"bold"} size={"2xl"}>
              {
                dataExams?.find(
                  (exam) => exam.id === Number(selectedExamId)
                )?.examName
              }
            </Text>

            {isLoading ? (
              <div className="flex justify-center">
                <Spinner />
              </div>
            ) : error ? (
              <Text>
                {translate(
                  "Error fetching students.",
                  "Erreur lors de la récupération des étudiants.",
                  "حدث خطأ أثناء جلب الطلاب."
                )}
              </Text>
            ) : (
              <div className="mt-5">
                <table className="w-full table-auto">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-left text-xl font-bold">
                        {translate(
                          "Student Name",
                          "Nom de l'étudiant",
                          "اسم الطالب"
                        )}
                      </th>
                      <th className="px-6 py-3 text-center text-xl font-bold">
                        {translate("Grade", "Note", "الدرجة")}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="space-y-4">
                    {dataExamsResults?.map((student: ExamResult) => (
                      <tr
                        key={student.studentId}
                        className="overflow-hidden rounded-xl border-t-8 border-bgPrimary bg-bgSecondary"
                      >
                        <td className="rounded-l-xl px-6 py-4 text-left">
                          {student.studentName}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <div className="flex justify-center gap-2">
                            <div className="flex">
                              <Input
                                placeholder={translate(
                                  "Add grade...",
                                  "Ajouter une note...",
                                  "أضف درجة..."
                                )}
                                border="none"
                                value={grades[student.id] || ""}
                                onChange={(e) =>
                                  handleGradeChange(
                                    student.id.toString(),
                                    e.target.value
                                  )
                                }
                              />
                              <Button
                                theme="outline"
                                onClick={() =>
                                  handleSubmitGrade(
                                    student.id.toString(),
                                    grades[student.id] || "0",
                                    student.studentName
                                  )
                                }
                                className="ml-6"
                              >
                                {translate("Save", "Enregistrer", "حفظ")}
                              </Button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Box>
        ) : (
          <img
            src="/images/exam.png"
            alt={translate(
              "Exam Illustration",
              "Illustration de l'examen",
              "صورة توضيحية للامتحان"
            )}
          />
        )}
      </div>
    </Container>
  );
};

export default Grades;
