/* eslint-disable @next/next/no-img-element */
"use client";
import Link from "next/link";
import { useState } from "react";
import Box from "~/_components/Box";
import Button from "~/_components/Button";
import Container from "~/_components/Container";
import Spinner from "~/_components/Spinner";
import { Text } from "~/_components/Text";
import { useGetAllExams } from "~/APIs/hooks/useExam";
import { useGetStudentsWithGrades } from "~/APIs/hooks/useStudent";
import type { Student } from "~/types";

const Grades = () => {
  // get exams
  const { data: dataExams } = useGetAllExams();
  console.log(dataExams);

  // state to store selected exam id
  const [selectedExamId, setSelectedExamId] = useState("");
  const {
    data: dataStudentsWithGrade,
    isLoading,
    error,
  } = useGetStudentsWithGrades(selectedExamId);
  console.log(dataStudentsWithGrade);
  console.log(selectedExamId);

  // handle exam selection
  const handleSelectExam = (event: any) => {
    setSelectedExamId(event.target.value);
    console.log("Selected Exam ID:", event.target.value);
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

        <div className="flex w-[300px] justify-end mx-4">
            <Link href={"/grades/add-grades"}>
          <Button>
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4v16m8-8H4"
              />
            </svg>{" "}
            Add Grades
          </Button>
            </Link>
        </div>
      </div>

      <div className="mt-10 flex h-full w-full items-center justify-center">
        {selectedExamId ? (
          <Box>
            <Text font={"bold"} size={"2xl"}>
              {
                dataExams?.find(
                  (exam) => exam.id === Number(selectedExamId), // Convert selectedExamId to number for comparison
                )?.examName
              }
            </Text>
            {/* <Text>Final Score: {dataStudentsWithGrade?.data.finalScore}</Text> */}

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
                    {dataStudentsWithGrade?.data.students?.map(
                      (student: Student) => (
                        <tr
                          key={student.studentId}
                          className="overflow-hidden rounded-xl bg-bgSecondary border-t-8 border-bgPrimary"
                        >
                          <td className="rounded-l-xl px-6 py-4 text-left">
                            {student.studentName}
                          </td>
                          <td
                            className={`${student?.score && student.score >= dataStudentsWithGrade?.data.finalScore / 2 ? "text-success" : "text-error"} px-6 py-4 text-center`}
                          >
                            <span
                              className={`${student?.score && student.score >= dataStudentsWithGrade?.data.finalScore / 2 ? "bg-success/5" : "bg-error/5"} w-fit rounded-xl px-4 py-2 text-center`}
                            >
                              {student.score ?? "N/A"}/
                              {dataStudentsWithGrade?.data.finalScore}
                            </span>
                          </td>
                        </tr>
                      ),
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </Box>
        ) : (
          <img src="/images/exam.png" alt="#" />
        )}
      </div>
    </Container>
  );
};

export default Grades;
