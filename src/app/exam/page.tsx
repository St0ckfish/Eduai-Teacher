"use client"
/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import Button from "~/_components/Button";
import Container from "~/_components/Container";
import Spinner from "~/_components/Spinner";
import { Text } from "~/_components/Text";
import { useGetAllExams, useGetAllUpcomingExams, useGetAllPreviousExams } from "~/APIs/hooks/useExam";

const Exam = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'previous' | 'upcoming'>('all');

  const { data: allExams, isLoading: isAllExamsLoading } = useGetAllExams();
  const { data: previousExams, isLoading: isPreviousExamsLoading } = useGetAllPreviousExams();
  const { data: upcomingExams, isLoading: isUpcomingExamsLoading } = useGetAllUpcomingExams();

  const renderExamsTable = (exams: any[] | undefined, isLoading: boolean, title: string) => (
    <div className="mt-10 flex h-full w-full items-center justify-center">
      <div className="flex w-full overflow-auto rounded-md bg-bgPrimary p-4">
        <div className="relative w-full overflow-auto sm:rounded-lg">
          <Text font="bold" size="2xl" className="mb-4">
            {title}
          </Text>
          {isLoading ? (
            <div className="flex w-full justify-center">
              <Spinner />
            </div>
          ) : (
            <table className="w-full overflow-x-auto p-4 text-left text-sm text-textPrimary border-separate border-spacing-y-2">
              <thead className="text-textPrimary text-xs uppercase">
                <tr>
                  <th scope="col" className="whitespace-nowrap px-6 py-3">Class Name</th>
                  <th scope="col" className="whitespace-nowrap px-6 py-3">Course Name</th>
                  <th scope="col" className="whitespace-nowrap px-6 py-3">Exam Legal Type Name</th>
                  <th scope="col" className="whitespace-nowrap px-6 py-3">Exam Type Name</th>
                  <th scope="col" className="whitespace-nowrap px-6 py-3">Exam Date</th>
                  <th scope="col" className="whitespace-nowrap px-6 py-3">Exam Beginning</th>
                  <th scope="col" className="whitespace-nowrap px-6 py-3">Exam Ending</th>
                  <th scope="col" className="whitespace-nowrap px-6 py-3">Exam Name</th>
                </tr>
              </thead>
              <tbody className="rounded-lg">
                {exams?.map((exam) => (
                  <tr 
                    key={exam.id} 
                    className="bg-bgSecondary font-semibold hover:bg-primary hover:text-white"
                  >
                    <th
                      scope="row"
                      className="whitespace-nowrap rounded-s-2xl px-6 py-4 font-medium text-textSecondary"
                    >
                      {exam.className}
                    </th>
                    <td className="whitespace-nowrap px-6 py-4">{exam.courseName}</td>
                    <td className="whitespace-nowrap px-6 py-4">{exam.examLegalTypeName}</td>
                    <td className="whitespace-nowrap px-6 py-4">{exam.examTypeName}</td>
                    <td className="whitespace-nowrap px-6 py-4">{exam.examDate}</td>
                    <td className="whitespace-nowrap px-6 py-4">{exam.examBeginning}</td>
                    <td className="whitespace-nowrap px-6 py-4">{exam.examEnding}</td>
                    <td className="whitespace-nowrap rounded-e-2xl px-6 py-4">{exam.examName}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <Container>
      <div className="flex w-full items-center justify-between gap-7">
        <div className="flex w-[400px] items-center gap-10">
          <Button 
            onClick={() => setActiveTab('all')}
            theme={activeTab === 'all' ?  undefined : 'outline'}
          color={activeTab === 'upcoming' ? 'primary' : 'primary'}
          >
            All Exams
          </Button>
          <Button 
            onClick={() => setActiveTab('previous')}
            theme={activeTab === 'previous' ?  undefined : 'outline'}
            color={activeTab === 'upcoming' ? 'primary' : 'primary'}
          >
            Previous Exams
          </Button>
          <Button 
            onClick={() => setActiveTab('upcoming')}
            theme={activeTab === 'upcoming' ?  undefined : 'outline'}
            color={activeTab === 'upcoming' ? 'primary' : 'primary'}
          >
            Upcoming Exams
          </Button>
        </div>

        <div className="flex w-[300px]">
          <Button as="link" href="/exam/add-exam">
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
            Add Exams
          </Button>
        </div>
      </div>

      {activeTab === 'all' && renderExamsTable(allExams, isAllExamsLoading, 'All Exams')}
      {activeTab === 'previous' && renderExamsTable(previousExams?.data, isPreviousExamsLoading, 'Previous Exams')}
      {activeTab === 'upcoming' && renderExamsTable(upcomingExams?.data, isUpcomingExamsLoading, 'Upcoming Exams')}
    </Container>
  );
};

export default Exam;