"use client";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";
import Box from "~/_components/Box";
import Button from "~/_components/Button";
import Container from "~/_components/Container";
import Input from "~/_components/Input";
import Spinner from "~/_components/Spinner";
import { Text } from "~/_components/Text";
import { useGetAllExams, useGetExamResults, usePutGrade } from "~/APIs/hooks/useExam";
import type { ExamResult } from "~/types";

const Grades = () => {

  const { mutate: putGrade} = usePutGrade();
  const { data: dataExams } = useGetAllExams();

  // State to store selected exam id (ensure it's a string)
  const [selectedExamId, setSelectedExamId] = useState<string>("");
  const { data: dataExamsResults, isLoading, error } = useGetExamResults(selectedExamId);

  // Handle exam selection
  const handleSelectExam = (event: any) => {
    setSelectedExamId(event.target.value);
    console.log("Selected Exam ID:", event.target.value);
  };

  // State to store grades for each student, using Record<string, string>
  const [grades, setGrades] = useState<Record<string, string>>({});

  // Handle grade change for each student
  const handleGradeChange = (id: string, value: string) => {
    // Ensure value is numeric and within the range of 0 to 20
    if (
      value === "" ||
      (!isNaN(Number(value)) && Number(value) >= 0 && Number(value) <= 20)
    ) {
      setGrades((prev) => ({ ...prev, [id]: value }));
    }
  };

  // Handle grade submission
  const handleSubmitGrade = (id: string, grade: string, studentName: string ) => {
    const gradeNumber = Number(grade);

    // Ensure grade is a valid number and within the range 0 to 20
    if (isNaN(gradeNumber) || gradeNumber < 0 || gradeNumber > 20) {
      toast.error(`Grade should be a number between 0 and 20`);
      return; // Exit the function early if the grade is invalid
    }

    putGrade({examResultId: id, scoreData: {score: gradeNumber, scoreDate: new Date().toISOString()}}, 
    {
      onSuccess: () => {
        toast.success(`Updated grade for ${studentName}!`);
        setGrades((prev) => ({ ...prev, [id]: "" }));
      },
      onError: () => {
        toast.error("Failed to submit grade.");
      },
    },)
    // Proceed with grade submission logic if the grade is valid
    console.log("Grade Submitted for Student ID:", id, "Grade:", grade);
    // Add your logic to save the grade here (API call, etc.)
  };

  return (
    <Container>
      <div className="flex w-full items-center justify-between gap-10">
        <div className="flex w-[300px]">
          <select
            className="flex w-full items-center gap-3 whitespace-nowrap rounded-xl bg-bgPrimary px-6 py-4 font-semibold outline-none duration-200 ease-in hover:shadow-lg"
            onChange={handleSelectExam}
          >
            <option value="">Select Exam</option>
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
                  (exam) => exam.id === Number(selectedExamId) // Ensure the comparison is between numbers
                )?.examName
              }
            </Text>

            {isLoading ? (
              <div className="flex justify-center">
                <Spinner />
              </div>
            ) : error ? (
              <Text>Error fetching students</Text>
            ) : (
              <div className="mt-5">
                <table className="w-full table-auto">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-left text-xl font-bold">
                        Student Name
                      </th>
                      <th className="px-6 py-3 text-center text-xl font-bold">
                        Grade
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
                        <td
                          className={`${
                            student.score >= 10 ? "text-success" : "text-error" // Assuming 10 as passing score
                          } px-6 py-4 text-center`}
                        >
                          <div className="flex justify-center gap-2">
                            <div className="flex">
                              <Input
                                placeholder="Add grade..."
                                border="none"
                                value={grades[student.id] || ""} // Ensure value is a string
                                onChange={(e) =>
                                  handleGradeChange(
                                    student.id.toString(), // Use student.studentId here
                                    e.target.value,
                                  )
                                } // Handle grade change
                              />
                              <Button
                                theme="outline"
                                onClick={() =>
                                  handleSubmitGrade(
                                    student.id.toString(),
                                    grades[student.id] || "0", // Ensure grade is a string when passing to the function
                                    student.studentName
                                  )
                                }
                                className="ml-6"
                              >
                                Save
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
          <img src="/images/exam.png" alt="exam" />
        )}
      </div>
    </Container>
  );
};

export default Grades;
