"use client";
/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import Button from "~/_components/Button";
import Container from "~/_components/Container";
import Spinner from "~/_components/Spinner";
import { Text } from "~/_components/Text";
import { useGetAllExams, useGetAllUpcomingExams, useGetAllPreviousExams } from "~/APIs/hooks/useExam";
import useLanguageStore from "~/APIs/store";

const Exam = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'previous' | 'upcoming'>('all');
  const language = useLanguageStore((state) => state.language);
  const translate = (en: string, fr: string, ar: string) => {
    return language === "fr" ? fr : language === "ar" ? ar : en;
  };

  const { data: allExams, isLoading: isAllExamsLoading } = useGetAllExams();
  const { data: previousExams, isLoading: isPreviousExamsLoading } = useGetAllPreviousExams();
  const { data: upcomingExams, isLoading: isUpcomingExamsLoading } = useGetAllUpcomingExams();

  const renderExamsTable = (exams: any[] | undefined, isLoading: boolean, title: string) => (
    <div className="mt-10 flex h-full w-full items-center justify-center">
      <div className="flex w-full overflow-auto rounded-md bg-bgPrimary p-4">
        <div className="relative w-full overflow-auto sm:rounded-lg">
          <Text font="bold" size="2xl" className="mb-4">
            {translate(title, "Titre", "العنوان")}
          </Text>
          {isLoading ? (
            <div className="flex w-full justify-center">
              <Spinner />
            </div>
          ) : (
            <table className="w-full overflow-x-auto p-4 text-left text-sm text-textPrimary border-separate border-spacing-y-2">
              <thead className="text-textPrimary text-xs uppercase">
                <tr>
                  <th scope="col" className="whitespace-nowrap px-6 py-3">{translate("Class Name", "Nom de la classe", "اسم الفصل")}</th>
                  <th scope="col" className="whitespace-nowrap px-6 py-3">{translate("Course Name", "Nom du cours", "اسم المادة")}</th>
                  <th scope="col" className="whitespace-nowrap px-6 py-3">{translate("Exam Legal Type Name", "Type juridique de l'examen", "نوع الامتحان القانوني")}</th>
                  <th scope="col" className="whitespace-nowrap px-6 py-3">{translate("Exam Type Name", "Type d'examen", "نوع الامتحان")}</th>
                  <th scope="col" className="whitespace-nowrap px-6 py-3">{translate("Exam Date", "Date de l'examen", "تاريخ الامتحان")}</th>
                  <th scope="col" className="whitespace-nowrap px-6 py-3">{translate("Exam Beginning", "Début de l'examen", "بداية الامتحان")}</th>
                  <th scope="col" className="whitespace-nowrap px-6 py-3">{translate("Exam Ending", "Fin de l'examen", "نهاية الامتحان")}</th>
                  <th scope="col" className="whitespace-nowrap px-6 py-3">{translate("Exam Name", "Nom de l'examen", "اسم الامتحان")}</th>
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
      <div className="flex w-full items-center justify-between gap-7 max-[1150px]:grid">
        <div className="flex w-[400px] items-center gap-10 max-[600px]:grid grid-cols-2">
          <Button 
            onClick={() => setActiveTab('all')}
            theme={activeTab === 'all' ? undefined : 'outline'}
            color="primary"
          >
            {translate("All Exams", "Tous les examens", "جميع الامتحانات")}
          </Button>
          <Button 
            onClick={() => setActiveTab('previous')}
            theme={activeTab === 'previous' ? undefined : 'outline'}
            color="primary"
          >
            {translate("Previous Exams", "Examens précédents", "الامتحانات السابقة")}
          </Button>
          <Button 
            onClick={() => setActiveTab('upcoming')}
            theme={activeTab === 'upcoming' ? undefined : 'outline'}
            color="primary"
          >
            {translate("Upcoming Exams", "Examens à venir", "الامتحانات القادمة")}
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
            {translate("Add Exams", "Ajouter des examens", "إضافة الامتحانات")}
          </Button>
        </div>
      </div>

      {activeTab === 'all' && renderExamsTable(allExams, isAllExamsLoading, translate("All Exams", "Tous les examens", "جميع الامتحانات"))}
      {activeTab === 'previous' && renderExamsTable(previousExams?.data, isPreviousExamsLoading, translate("Previous Exams", "Examens précédents", "الامتحانات السابقة"))}
      {activeTab === 'upcoming' && renderExamsTable(upcomingExams?.data, isUpcomingExamsLoading, translate("Upcoming Exams", "Examens à venir", "الامتحانات القادمة"))}
    </Container>
  );
};

export default Exam;
