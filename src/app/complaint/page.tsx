"use client";
import Container from "~/_components/Container";
import { BsArrowDownLeft, BsArrowUpRight } from "react-icons/bs";
import Input from "~/_components/Input";
import { Text } from "~/_components/Text";
import {
  useCreateComplaint,
  useGetAllComplains,
} from "~/APIs/hooks/useComplains";
import { type ComplaintResponse, type Student } from "~/types";
import { useGetStudents } from "~/APIs/hooks/useStudent";
import { useState } from "react";
import { toast } from "react-toastify";
import Button from "~/_components/Button";
import useLanguageStore from "~/APIs/store";

const Complaint = () => {
  const [selectedStudentId, setSelectedStudentId] = useState<
    number | string | undefined
  >();
  const [subject, setSubject] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [showAllRecent, setShowAllRecent] = useState(false);
  const [showAllEarlier, setShowAllEarlier] = useState(false);

  const ITEMS_PER_PAGE = 3; // Number of items to show initially

  const { mutate: createComplaintMutation } = useCreateComplaint({
    onSuccess: () => {
      toast.success(translate("Complaint submitted successfully!", "Réclamation soumise avec succès!", "تم تقديم الشكوى بنجاح!"));
      refetchComplains();
      // Reset form
      setSelectedStudentId(undefined);
      setSubject("");
      setMessage("");
    },
  });

  const language = useLanguageStore((state) => state.language);
  const translate = (en: string, fr: string, ar: string) => {
    return language === "fr" ? fr : language === "ar" ? ar : en;
  };

  const {
    data: dataStudents,
    error,
    isLoading: isStudentsLoading,
  } = useGetStudents();

  const { data, isLoading, refetch: refetchComplains } = useGetAllComplains();

  // Split complaints into recent (last 7 days) and earlier
  const splitComplaints = () => {
    if (!data?.data.content) return { recent: [], earlier: [] };

    const now = new Date();
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    return data.data.content.reduce(
      (acc: { recent: ComplaintResponse[]; earlier: ComplaintResponse[] }, complaint) => {
        const complaintDate = new Date(complaint.creationDateTime);
        if (complaintDate >= sevenDaysAgo) {
          acc.recent.push(complaint);
        } else {
          acc.earlier.push(complaint);
        }
        return acc;
      },
      { recent: [], earlier: [] }
    );
  };

  const { recent, earlier } = splitComplaints();

  const displayedRecent = showAllRecent ? recent : recent.slice(0, ITEMS_PER_PAGE);
  const displayedEarlier = showAllEarlier ? earlier : earlier.slice(0, ITEMS_PER_PAGE);

  const handleSubmit = () => {
    if (!selectedStudentId || !subject || !message) {
      toast.error(translate("Please fill in all fields.", "Veuillez remplir tous les champs.", "يرجى ملء جميع الحقول."));
      return;
    }

    const formData = new FormData();
    const complaintData: ComplaintResponse = {
      studentId: Number(selectedStudentId),
      subject: subject,
      message: message,
    };

    formData.append("complain", JSON.stringify(complaintData));
    createComplaintMutation(formData);
  };

  const handleStudentChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStudentId(event.target.value);
  };

  const handleSubjectChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSubject(event.target.value);
  };

  const handleMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const ComplaintSection = ({ title, complaints, showAll, onShowMore }: { title: string, complaints: ComplaintResponse[], showAll: boolean, onShowMore: () => void }) => (
    <div className="mb-6">
      <Text font="bold" size="xl" className="mb-4">
        {title}
      </Text>
      {complaints.map((complaint: any) => (
        <div
          key={complaint.id}
          className="mt-4 flex items-center justify-between rounded-xl border border-borderPrimary p-4"
        >
          <div className="flex gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-warning/10">
              {complaint.approved ? (
                <BsArrowUpRight size={30} className="text-success" />
              ) : (
                <BsArrowDownLeft size={20} className="text-error" />
              )}
            </div>
            <div>
              <Text size="lg" font="medium">
                {complaint.teacherName}
              </Text>
              <Text size="lg" font="medium">
                {complaint.studentName}
              </Text>
              <Text size="md">{complaint.message}</Text>
              <Text color="gray">
                {complaint.creationDateTime}
              </Text>
            </div>
          </div>
        </div>
      ))}
      <Button
        onClick={onShowMore}
        className="mt-4"
      >
        {showAll ? translate("Show Less", "Montrer moins", "عرض أقل") : translate("See More", "Voir plus", "عرض المزيد")}
      </Button>
    </div>
  );

  return (
    <Container>
      <div className="m-4 mb-4 flex flex-col items-start justify-between gap-4 md:flex-row">
        <div className="flex w-full flex-col gap-4 rounded-xl bg-bgPrimary p-4">
          <Text font="bold" size="4xl">
            {translate("Complaint", "Réclamation", "شكوى")}
          </Text>
          <div className="border-b border-borderPrimary pb-4">
            {recent.length > 0 && (
              <ComplaintSection
                title={translate("Recent Complaints", "Réclamations récentes", "الشكاوى الحديثة")}
                complaints={displayedRecent}
                showAll={showAllRecent}
                onShowMore={() => setShowAllRecent(!showAllRecent)}
              />
            )}
            {earlier.length > 0 && (
              <ComplaintSection
                title={translate("Earlier Complaints", "Réclamations antérieures", "الشكاوى السابقة")}
                complaints={displayedEarlier}
                showAll={showAllEarlier}
                onShowMore={() => setShowAllEarlier(!showAllEarlier)}
              />
            )}
          </div>
        </div>

        <div className="w-full rounded-xl bg-bgPrimary p-4 md:w-1/2">
          <Text font="bold" size="2xl">
            {translate("Add Complaint", "Ajouter une réclamation", "إضافة شكوى")}
          </Text>
          <div className="w-full">
            <label htmlFor="student">
              <select
                name="student"
                id="student"
                className="mt-4 w-full rounded-lg border border-borderPrimary bg-bgPrimary p-3 text-textPrimary outline-none transition duration-200 ease-in"
                onChange={handleStudentChange}
                value={selectedStudentId}
              >
                <option value="">{translate("Select student", "Sélectionnez un étudiant", "اختر طالبًا")}</option>
                {dataStudents?.data.content?.map((student: Student) => (
                  <option key={student.studentId} value={student.studentId}>
                    {student.studentName}
                  </option>
                ))}
              </select>
            </label>

            <label htmlFor="subject">
              <Input
                placeholder={translate("Subject", "Sujet", "الموضوع")}
                theme="transparent"
                className="mt-4"
                border="gray"
                value={subject}
                onChange={handleSubjectChange}
              />
            </label>

            <label htmlFor="area">
              <Input
                id="message"
                placeholder={translate("Write the problem", "Écrivez le problème", "اكتب المشكلة")}
                theme="transparent"
                className="mt-4 py-10"
                border="gray"
                value={message}
                onChange={handleMessageChange}
              />
            </label>

            <Button onClick={handleSubmit} className="mt-4">
              {translate("Submit", "Soumettre", "إرسال")}
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Complaint;
