/* eslint-disable @next/next/no-img-element */
"use client";
import Container from "~/_components/Container";
import * as React from "react";
import { Calendar } from "~/components/ui/calendar";
import { Text } from "~/_components/Text";
import {
  useGetAllSchedules,
  useGetAllSessionAttendance,
  useGetAllSessionExplained,
  useGetAllSessionMateriale,
  useCreateSession,
  useCreateExpliand
} from "~/APIs/hooks/useSchedule";
import Spinner from "~/_components/Spinner";
import { format } from "date-fns";
import { AttendanceStatus, type Material, type TeacherSchedule } from "~/types";
import { useState } from "react";
import Button from "~/_components/Button";
import Input from "~/_components/Input";
import {
  useCreateSessionMaterial,
  useDeleteMaterial,
  useGetAllTopics,
  useLessonSessionId,
  useUpdateSessionMaterialDetails,
  useUpdateSessionMaterialFile,
  useGenerateExam,
} from "~/APIs/hooks/useMaterial";
import { toast } from "react-toastify";
import Link from "next/link";
import { FaDownload } from "react-icons/fa6";
import { FaEllipsisV } from "react-icons/fa";
import { useRecordAttendance } from "~/APIs/hooks/useAttendance";
import { BiSolidEditAlt } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import Modal from "~/_components/Modal";
import useLanguageStore from "~/APIs/store";

function CalendarDemo({
  onDateSelect,
}: {
  onDateSelect: (date: Date) => void;
}) {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  const handleDateSelect = (newDate: Date | undefined) => {
    if (newDate) {
      setDate(newDate);
      onDateSelect(newDate);
    }
  };

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={handleDateSelect}
      className="flex w-fit justify-center rounded-md max-[1080px]:w-full"
    />
  );
}

const Schedule = () => {
  // console.log("topics", data);

  const [materialData, setMaterialData] = useState<Omit<Material, "sessionId">>(
    {
      title: "",
      description: "",
      file: null as any,
    },
  );

  const { mutate: addMaterial } = useCreateSessionMaterial({
    onSuccess: () => {
      toast.success("Material added successfully!");
      retechMaterials();
    },
    onError: (error: any) => {
      toast.error("Failed to add material.");
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMaterialData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setMaterialData((prev) => ({ ...prev, file }));
    }
  };

  const handleSubmit = () => {
    if (!selectedScheduleId) {
      toast.error("ID is required to create a material.");
      return;
    }

    if (
      !materialData.title ||
      !materialData.description ||
      !materialData.file
    ) {
      toast.error("Please fill in all fields.");
      return;
    }

    const formData = new FormData();

    const requestData = {
      sessionId: dataLessonId?.sessionId,
      title: materialData.title,
      description: materialData.description,
    };

    formData.append("request", JSON.stringify(requestData));

    formData.append("file", materialData.file);

    addMaterial(formData);
    setIsModalOpen(false);
  };

  const [selectedDate, setSelectedDate] = React.useState<Date>(new Date());
  const [selectedScheduleId, setSelectedScheduleId] = React.useState<
    string | null
  >(null);

  const [selectedSessionId, setSessionId] = React.useState<
    string | null
  >(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleCloseModal1 = () => {
    setIsModalOpen(false);
  };
  const handleCloseModal2 = () => {
    setIsExplainedModalOpen(false);
  };
  const handleCloseModal3 = () => {
    setIsModalEditOpen(false);
  };
  const [selectedSchedule, setSelectedSchedule] = React.useState<TeacherSchedule | null>(null);
  const formattedDate = React.useMemo(
    () => format(selectedDate, "yyyy-MM-dd"),
    [selectedDate],
  );

  const { data: dataLessonId, isLoading: isLessonIdLoading, refetch } = useLessonSessionId(
    formattedDate,
    selectedScheduleId ?? "",
  );

  const { mutate: createSession, isPending: isCreatingSession } = useCreateSession({
    onSuccess: (data) => {
      toast.success("Session created successfully!");
      void refetch();
    },
    onError: (error) => {
      toast.error("Failed to create session");
      console.error(error);
    }
  });

  React.useEffect(() => {
    if (selectedSchedule && (dataLessonId === null)) {
      const sessionData = {
        teacherCourseRegistrationId: selectedSchedule.teacherCourseRegistrationId,
        startTime: selectedSchedule.startTime,
        endTime: selectedSchedule.endTime,
        date: formattedDate,
      };

      createSession(sessionData);

    }
  }, [selectedSchedule, dataLessonId, formattedDate, refetch, createSession]);


  function convertToAmPm(time24: string): string {
    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/;
    const match = timeRegex.exec(time24);

    if (!match) {
      throw new Error(
        "Invalid time format. Please use HH:MM:SS in 24-hour format.",
      );
    }

    const [, hoursStr, minutes] = match; // Destructure correctly, ignore seconds

    // Add a null check before using hoursStr
    if (hoursStr === undefined) {
      throw new Error("Invalid time format. Unable to extract hours.");
    }

    let hours = parseInt(hoursStr, 10);
    const period = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    if (hours === 0) {
      hours = 12;
    }

    return `${hours}:${minutes} ${period}`;
  }

  function getTimeDifference(
    startTime: string,
    endTime: string,
  ): { hours: number; minutes: number; seconds: number } {
    const timeToSeconds = (time: string): number => {
      const parts = time.split(":").map((part) => parseInt(part, 10));
      if (parts.length !== 3 || parts.some(isNaN)) {
        throw new Error(`Invalid time format: ${time}. Expected "HH:MM:SS".`);
      }
      const hours = parts[0];
      const minutes = parts[1];
      const seconds = parts[2];
      if (
        typeof hours !== "number" ||
        typeof minutes !== "number" ||
        typeof seconds !== "number" ||
        hours < 0 ||
        hours >= 24 ||
        minutes < 0 ||
        minutes >= 60 ||
        seconds < 0 ||
        seconds >= 60
      ) {
        throw new Error(`Time values out of range in: ${time}.`);
      }
      return hours * 3600 + minutes * 60 + seconds;
    };

    const startSeconds = timeToSeconds(startTime);
    const endSeconds = timeToSeconds(endTime);

    let diffSeconds = endSeconds - startSeconds;

    if (diffSeconds < 0) {
      diffSeconds += 24 * 3600;
    }

    const hours = Math.floor(diffSeconds / 3600);
    diffSeconds %= 3600;
    const minutes = Math.floor(diffSeconds / 60);
    const seconds = diffSeconds % 60;

    return { hours, minutes, seconds };
  }

  const { data: scheduleData, isLoading: isScheduleLoading } =
    useGetAllSchedules(formattedDate);

  const { data: attendanceData, isLoading: isAttendanceLoading } =
    useGetAllSessionAttendance(dataLessonId?.sessionId.toString() ?? "");

  const {
    data: Materiales,
    isLoading: isMaterialeLoading,
    refetch: retechMaterials,
  } = useGetAllSessionMateriale(dataLessonId?.sessionId.toString() ?? "");

  const { data: Explaineds, isLoading: isExplainedLoading } =
    useGetAllSessionExplained(dataLessonId?.sessionId.toString() ?? "");
  console.log(selectedScheduleId);
  console.log("selectedSchedule", selectedSchedule);

  console.log("👾 ~ Schedule ~ dataLessonId:", dataLessonId);
  const { data, isLoading } = useGetAllTopics(dataLessonId?.courseId.toString());
  console.log("looooooooooooooooooool", data);
  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    // Reset selected schedule when date changes
    setSelectedScheduleId(null);
  };

  const handleScheduleSelect = (schedule: TeacherSchedule) => {
    setSelectedScheduleId(schedule.id.toString());
    setSelectedSchedule(schedule);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };


  const { isPending, mutate: recordAttendance } = useRecordAttendance({
    onSuccess: () => {
      toast.success("Attendance recorded successfully!");
      // Optionally refetch attendance data
      // You might want to add a refetch method for session attendance
    },
    onError: () => {
      toast.error("Failed to record attendance.");
    },
  });

  const handleAttendanceRecord = (
    studentId: string,
    status: AttendanceStatus,
  ) => {
    if (!selectedScheduleId) {
      toast.error("Please select a session first.");
      return;
    }

    recordAttendance({
      studentId,
      sessionId: dataLessonId?.sessionId.toString() ?? "",
      status,
    });
  };
  // Edit and Delete Material
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [currentMaterialId, setCurrentMaterialId] = useState(null);
  const [menuOpenMaterialId, setMenuOpenMaterialId] = useState(null);
  const [materialEditData, setMaterialEditData] = useState<{
    title: string;
    description: string;
    file: any;
  }>({
    title: "",
    description: "",
    file: null,
  });

  console.log("👾 ~ Schedule ~ currentMaterialId:", currentMaterialId);
  const { mutate: updateMaterialDetails } = useUpdateSessionMaterialDetails();
  const { mutate: updateFile } = useUpdateSessionMaterialFile();
  const { mutate: deleteMaterial } = useDeleteMaterial();

  console.log("👾 ~ Schedule ~ materialEditData:", materialEditData);

  const language = useLanguageStore((state) => state.language);
  const translate = (en: string, fr: string, ar: string) => {
    return language === "fr" ? fr : language === "ar" ? ar : en;
  };
  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMaterialEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setMaterialEditData((prev) => ({ ...prev, file }));
  };

  const [isExplainedModalOpen, setIsExplainedModalOpen] = useState(false);
  const [explainedData, setExplainedData] = useState({
    topicId: "",
    description: ""
  });

  const { mutate: generateExam } = useGenerateExam({
    onSuccess: () => {
      toast.success("Exam generated successfully!");
    },
    onError: (error) => {
      toast.error("Failed to generate exam");
      // console.error(error);
    },
  });
  
  const { mutate: createExplained } = useCreateExpliand({
    onSuccess: (response) => {
      const newExplainedId = response?.data?.id?.toString();
      if (newExplainedId) {
        generateExam(newExplainedId);
      }
      toast.success("Explained topic added successfully!");
      setIsExplainedModalOpen(false);
      setExplainedData({ topicId: "", description: "" });
      void refetch();
    },
    onError: (error) => {
      toast.error("Failed to add explained topic");
      // console.error(error);
    },
  });
  

  // Add these handlers for the explained form
  const handleExplainedChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setExplainedData(prev => ({ ...prev, [name]: value }));
  };

  const handleExplainedSubmit = () => {
    if (!selectedScheduleId || !explainedData.topicId || !explainedData.description) {
      toast.error("Please fill in all fields.");
      return;
    }

    createExplained({
      id: dataLessonId?.sessionId.toString() ?? "",
      formData: explainedData
    });
  };

  const handleEditClick = (materialId: any) => {
    setCurrentMaterialId(materialId);

    const materialToEdit = Materiales?.data?.find(
      (m) => m.materialId === materialId,
    );
    if (materialToEdit) {
      setMaterialEditData({
        title: materialToEdit.title,
        description: materialToEdit.description,
        file: materialToEdit.fileLink || null,
      });
      setIsModalEditOpen(true);
    }
  };

  const handleCloseEditModal = () => {
    setIsModalEditOpen(false);
  };

  const toggleMenu = (materialId: any) => {
    setMenuOpenMaterialId(
      menuOpenMaterialId === materialId ? null : materialId,
    );
  };

  const handleUpdateDetails = () => {
    updateMaterialDetails(
      {
        materialId: currentMaterialId || "",
        data: {
          title: materialEditData.title,
          description: materialEditData.description,
        },
      },
      {
        onSuccess: () => {
          toast.success("Details updated successfully!");
          setIsModalEditOpen(false);
          void retechMaterials();
          setMenuOpenMaterialId(null);
        },
      },
    );
  };
  const handleUpdateFile = () => {
    const formData = new FormData();
    formData.append("file", materialEditData.file);

    updateFile(
      {
        materialId: currentMaterialId || "",
        formData,
      },
      {
        onSuccess: () => {
          toast.success("File updated successfully!");
          void retechMaterials();
          setMenuOpenMaterialId(null);
        },
      },
    );
  };

  const handleDeleteMaterial = (id: string) => {
    if (!id) {
      console.error("Invalid material ID");
      return;
    }

    deleteMaterial(id, {
      onSuccess: () => {
        toast.success("File deleted successfully!");
        void retechMaterials();
        setMenuOpenMaterialId(null);
      },
      onError: (error) => {
        toast.error("Failed to delete file");
        console.error(error);
      },
    });
  };


  return (
    <>
      <Container>
        <div className="mb-4 flex w-full gap-10 max-[1080px]:grid">
          <div className="flex">
            <CalendarDemo onDateSelect={handleDateSelect} />
          </div>

          <div className="flex w-full overflow-auto rounded-md bg-bgPrimary p-4">
            <div className="relative w-full overflow-auto sm:rounded-lg">
              <Text font={"semiBold"} className="mb-3">
                {translate(
                  `Sessions for ${format(selectedDate, "MMMM d, yyyy")}`,
                  `Sessions pour ${format(selectedDate, "d MMMM yyyy")}`,
                  `الجلسات بتاريخ ${format(selectedDate, "d MMMM yyyy")}`
                )}
              </Text>
              {isScheduleLoading ? (
                <div className="flex w-full justify-center">
                  <Spinner />
                </div>
              ) : (
                <table className="w-full border-separate border-spacing-y-2 overflow-x-auto p-4 text-left text-sm">
                  <thead className="text-xs uppercase text-textPrimary">
                    <tr>
                      <th scope="col" className="whitespace-nowrap px-6 py-3">
                        {translate("Class", "Classe", "الفصل")}
                      </th>
                      <th scope="col" className="whitespace-nowrap px-6 py-3">
                        {translate("Subject", "Sujet", "المادة")}
                      </th>
                      <th scope="col" className="whitespace-nowrap px-6 py-3">
                        {translate("Time", "Temps", "الوقت")}
                      </th>
                      <th scope="col" className="whitespace-nowrap px-6 py-3">
                        {translate("Duration", "Durée", "المدة")}
                      </th>
                      <th scope="col" className="whitespace-nowrap px-6 py-3">
                        {translate("Action", "Action", "الإجراء")}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="rounded-lg">
                    {scheduleData?.data?.map((schedule) => (
                      <tr
                        key={schedule.id}
                        className={`bg-bgSecondary font-semibold hover:bg-primary hover:text-white ${selectedScheduleId === schedule.id.toString()
                            ? "bg-primary text-white"
                            : ""
                          }`}
                      >
                        <th
                          scope="row"
                          className="whitespace-nowrap rounded-s-2xl px-6 py-4 font-medium"
                        >
                          {schedule.classroomName}
                        </th>
                        <td className="whitespace-nowrap px-6 py-4">
                          {schedule.courseName}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {convertToAmPm(schedule.startTime)} -{" "}
                          {convertToAmPm(schedule.endTime)}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {`${getTimeDifference(schedule.startTime, schedule.endTime).hours}h ${getTimeDifference(schedule.startTime, schedule.endTime).minutes}m`}
                        </td>
                        <td className="whitespace-nowrap rounded-e-2xl px-6 py-4">
                          <button
                            onClick={() => {handleScheduleSelect(schedule); }}
                            className="underline"
                          >
                            {isCreatingSession &&
                              selectedScheduleId === schedule.id.toString()
                              ? translate("Creating...", "Création...", "جاري الإنشاء...")
                              : translate("Select", "Sélectionner", "اختيار")}
                          </button>
                        </td>
                      </tr>
                    ))}
                    {(!scheduleData?.data || scheduleData.data.length === 0) && (
                      <tr>
                        <td
                          colSpan={5}
                          className="px-6 py-4 text-center text-gray-500"
                        >
                          {translate(
                            "No sessions scheduled for this date",
                            "Aucune session prévue pour cette date",
                            "لا توجد جلسات مجدولة لهذا التاريخ"
                          )}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>

        <div className="flex w-full gap-10 max-[1080px]:grid">
          <div className="flex h-fit w-[450px] rounded-md bg-bgPrimary p-4 max-[1080px]:w-full max-[800px]:overflow-auto">
            <div className="relative w-full overflow-auto">
              <Text font={"bold"} size={"2xl"} className="mb-4">
                {translate("Daily Attendance", "Présence quotidienne", "الحضور اليومي")}
              </Text>
              {isAttendanceLoading ? (
                <div className="flex w-full justify-center">
                  <Spinner />
                </div>
              ) : (
                <table className="w-full table-auto overflow-auto p-4 text-left text-sm text-textPrimary">
                  <thead className="text-xs uppercase text-textPrimary">
                    <tr>
                      <th scope="col" className="whitespace-nowrap px-6 py-3">
                        {translate("Student", "Élève", "الطالب")}
                      </th>
                      <th
                        scope="col"
                        className="justify-end whitespace-nowrap px-6 py-3 text-end"
                      >
                        {translate("Absent", "Absent", "غياب")}
                      </th>
                      <th
                        scope="col"
                        className="justify-end whitespace-nowrap px-6 py-3 text-end"
                      >
                        {translate("Present", "Présent", "حضور")}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Attendance rows */}
                    {attendanceData?.data?.map((student) => (
                      <tr key={student.studentId} className="font-semibold">
                        <th
                          scope="row"
                          className="grid gap-2 whitespace-nowrap px-6 py-4 font-medium text-textSecondary"
                        >
                          {student.studentName}
                        </th>
                        {student.sessionStatus === AttendanceStatus.ABSENT ? (
                          <td colSpan={2}>
                            <Text font={"medium"} size={"xl"} className="mb-4" color="error">
                              {translate("Absent", "Absent", "غياب")}
                            </Text>
                          </td>
                        ) : student.sessionStatus === AttendanceStatus.PRESENT ? (
                          <td colSpan={2}>
                            <Text font={"medium"} size={"xl"} className="mb-4" color="success">
                              {translate("Present", "Présent", "حضور")}
                            </Text>
                          </td>
                        ) : (
                          <>
                            <td className="justify-end whitespace-nowrap px-6 py-4 text-end">
                              <button
                                onClick={() =>
                                  handleAttendanceRecord(
                                    student.studentId.toString(),
                                    AttendanceStatus.ABSENT
                                  )
                                }
                                disabled={isPending}
                                className={`rounded-full p-3 shadow-lg bg-error/10`}
                              >
                                <img src="/images/remove.png" alt={translate("Absent", "Absent", "غياب")} />
                              </button>
                            </td>
                            <td className="justify-end whitespace-nowrap px-6 py-4 text-end">
                              <button
                                onClick={() =>
                                  handleAttendanceRecord(
                                    student.studentId.toString(),
                                    AttendanceStatus.PRESENT
                                  )
                                }
                                disabled={isPending}
                                className={`rounded-full p-3 shadow-lg bg-success/10`}
                              >
                                <img src="/images/check.png" alt={translate("Present", "Présent", "حضور")} />
                              </button>
                            </td>
                          </>
                        )}
                      </tr>
                    ))}
                    {(!attendanceData?.data || attendanceData.data.length === 0) && (
                      <tr>
                        <td
                          colSpan={3}
                          className="px-6 py-4 text-center text-gray-500"
                        >
                          {selectedScheduleId
                            ? translate(
                              "No attendance data available for this session",
                              "Aucune donnée de présence pour cette session",
                              "لا توجد بيانات حضور لهذه الجلسة"
                            )
                            : translate(
                              "Select a session to view attendance",
                              "Sélectionnez une session pour voir les présences",
                              "اختر جلسة لعرض الحضور"
                            )}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )}
            </div>
          </div>
          <div className="grid w-full gap-4">
            <div className="grid w-full gap-2 rounded-md bg-bgPrimary p-4">
              <div className="flex w-full items-start justify-between">
                <Text font={"bold"} size={"2xl"} className="mb-4">
                  {translate("Materials", "Matériaux", "المواد")}
                </Text>

                <button
                  className={`flex items-center gap-2 font-medium ${selectedScheduleId
                    ? "cursor-pointer text-primary"
                    : "cursor-not-allowed text-textSecondary"
                    }`}
                  disabled={!selectedScheduleId}
                  onClick={handleOpenModal}
                >
                  <svg
                    className={`h-6 w-6 ${selectedScheduleId ? "text-primary" : "text-textSecondary"
                      }`}
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
                  </svg>
                  {translate("Add Material", "Ajouter un matériel", "إضافة مادة")}
                </button>
              </div>

              {selectedScheduleId ? (
                isMaterialeLoading ? (
                  <div className="text-center">
                    <p></p>
                  </div>
                ) : (Materiales?.data?.length ?? 0) > 0 ? (
                  Materiales?.data?.map((material) => (
                    <div
                      key={material.materialId}
                      className="relative z-0 rounded-md border border-borderPrimary p-4"
                    >
                      <div className="grid h-full gap-2 border-l-4 border-primary px-3">
                        <div className="flex items-start justify-between">
                          <Text font={"bold"} size={"xl"}>
                            {material.title}
                          </Text>
                          <button onClick={() => toggleMenu(material.materialId)}>
                            <FaEllipsisV />
                          </button>
                        </div>
                        <div>
                          <Text color={"gray"}>{material.description}</Text>
                        </div>
                        {material.fileLink && (
                          <Link href={material.fileLink}>
                            <FaDownload className="mb-2 text-primary" />
                          </Link>
                        )}
                      </div>
                      {menuOpenMaterialId === material.materialId && (
                        <div className="-mt-22 absolute -right-5 top-10 z-10 w-fit rounded border bg-bgPrimary shadow-lg">
                          <ul>
                            <li
                              className="flex cursor-pointer justify-between gap-2 px-4 py-2 transition hover:bg-bgSecondary hover:text-primary"
                              onClick={() => handleEditClick(material.materialId)}
                            >
                              {translate("Edit", "Éditer", "تحرير")}
                              <BiSolidEditAlt size={20} />
                            </li>
                            <li
                              className="flex cursor-pointer justify-between gap-2 px-4 py-2 transition hover:bg-bgSecondary hover:text-error"
                              onClick={() => handleDeleteMaterial(material.materialId.toString())}
                            >
                              {translate("Delete", "Supprimer", "حذف")}
                              <MdDelete size={20} />
                            </li>
                          </ul>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="text-center text-gray-500">
                    {translate("No Materials Available", "Aucun matériel disponible", "لا توجد مواد متاحة")}
                    {selectedScheduleId ? `at class ${selectedScheduleId}` : ""}
                  </div>
                )
              ) : (
                <div className="text-center">
                  <Text color={"gray"}>{translate("Select a class", "Sélectionnez une classe", "اختر فصلاً دراسياً")}</Text>

                </div>
              )}

              <Modal isOpen={isModalEditOpen} onClose={handleCloseModal3}>
                <h2 className="mb-4 text-xl font-bold">
                  {translate("Edit Material", "Modifier le document", "تحرير المادة")}
                </h2>
                <div className="flex flex-col gap-4">
                  <Input
                    border="gray"
                    theme="transparent"
                    type="text"
                    name="title"
                    placeholder={translate("Enter title", "Entrez le titre", "أدخل العنوان")}
                    value={materialEditData.title}
                    onChange={handleEditChange}
                  />
                  <Input
                    border="gray"
                    theme="transparent"
                    name="description"
                    placeholder={translate(
                      "Enter description",
                      "Entrez la description",
                      "أدخل الوصف"
                    )}
                    value={materialEditData.description}
                    onChange={handleEditChange}
                  />
                  <Input
                    border="gray"
                    theme="transparent"
                    type="file"
                    name="file"
                    onChange={handleEditFileChange}
                  />
                  <div className="flex gap-2">
                    <Button
                      onClick={() => {
                        handleUpdateDetails();
                        handleUpdateFile();
                      }}
                    >
                      {translate("Save Changes", "Enregistrer les modifications", "حفظ التغييرات")}
                    </Button>
                    <Button color="secondary" onClick={handleCloseEditModal}>
                      {translate("Close", "Fermer", "إغلاق")}
                    </Button>
                  </div>
                </div>
              </Modal>


            </div>
            <div className="grid w-full gap-2 rounded-md bg-bgPrimary p-4">
              {isExplainedLoading ? (
                <div className="flex w-full justify-center">
                  <p></p>
                </div>
              ) : (
                <div className="flex w-full items-start justify-between">
                  <Text font={"bold"} size={"2xl"} className="mb-4">
                    {translate("Explained", "Expliqué", "مشروح")}
                  </Text>

                  <button
                    className={`flex items-center gap-2 font-medium ${selectedScheduleId
                      ? "cursor-pointer text-primary"
                      : "cursor-not-allowed text-textSecondary"
                      }`}
                    onClick={() => selectedScheduleId && setIsExplainedModalOpen(true)}
                    disabled={!selectedScheduleId}
                  >
                    <svg
                      className={`h-6 w-6 ${selectedScheduleId ? "text-primary" : "text-textSecondary"
                        }`}
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
                    </svg>
                    {translate("Add Explained", "Ajouter une explication", "إضافة شرح")}
                  </button>
                </div>
              )}
              {Explaineds?.data && Array.isArray(Explaineds.data) ? (
                Explaineds.data.map((explained) => (
                  <div
                    key={explained.id}
                    className="rounded-md border border-borderPrimary p-4"
                  >
                    <div className="grid h-full gap-2 border-l-4 border-primary px-3">
                      <div className="flex items-start justify-between">
                        <Text font={"bold"} size={"xl"}>
                          {explained.topicName}
                        </Text>
                        <button>
                          <svg
                            className="h-6 w-6 text-textPrimary"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            {" "}
                            <circle cx="12" cy="12" r="1" />{" "}
                            <circle cx="12" cy="5" r="1" />{" "}
                            <circle cx="12" cy="19" r="1" />
                          </svg>
                        </button>
                      </div>
                      <div>
                        <Text color={"gray"}>{explained.description}</Text>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="px-6 py-4 text-center text-gray-500">
                  {translate(
                    "No explained topics available",
                    "Aucun sujet expliqué disponible",
                    "لا توجد مواضيع مشروحة متاحة"
                  )}
                </div>
              )}
            </div>
          </div>
        </div>


      </Container>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal1}>
        <h2 className="mb-4 text-xl font-bold">
          {translate("Add Material", "Ajouter un document", "إضافة مادة")}
        </h2>
        <div className="flex flex-col gap-4">
          <Input
            border="gray"
            theme="transparent"
            type="text"
            name="title"
            placeholder={translate("Enter title", "Entrez le titre", "أدخل العنوان")}
            value={materialData.title}
            onChange={handleChange}
          />
          <Input
            border="gray"
            theme="transparent"
            name="description"
            placeholder={translate(
              "Enter description",
              "Entrez la description",
              "أدخل الوصف"
            )}
            value={materialData.description}
            onChange={handleChange}
          />
          <Input
            border="gray"
            theme="transparent"
            type="file"
            name="file"
            onChange={handleFileChange}
          />
          <div className="flex gap-2">
            <Button onClick={handleSubmit}>
              {translate("Add Material", "Ajouter un document", "إضافة مادة")}
            </Button>
            <Button color="secondary" onClick={handleCloseModal1}>
              {translate("Close", "Fermer", "إغلاق")}
            </Button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={isModalEditOpen} onClose={handleCloseModal3}>
        <h2 className="mb-4 text-xl font-bold">
          {translate("Edit Material", "Modifier le document", "تحرير المادة")}
        </h2>
        <div className="flex flex-col gap-4">
          <Input
            border="gray"
            theme="transparent"
            type="text"
            name="title"
            placeholder={translate("Enter title", "Entrez le titre", "أدخل العنوان")}
            value={materialEditData.title}
            onChange={handleEditChange}
          />
          <Input
            border="gray"
            theme="transparent"
            name="description"
            placeholder={translate(
              "Enter description",
              "Entrez la description",
              "أدخل الوصف"
            )}
            value={materialEditData.description}
            onChange={handleEditChange}
          />
          <Input
            border="gray"
            theme="transparent"
            type="file"
            name="file"
            onChange={handleEditFileChange}
          />
          <div className="flex gap-2">
            <Button
              onClick={() => {
                handleUpdateDetails();
                handleUpdateFile();
              }}
            >
              {translate("Save Changes", "Enregistrer les modifications", "حفظ التغييرات")}
            </Button>
            <Button color="secondary" onClick={handleCloseEditModal}>
              {translate("Close", "Fermer", "إغلاق")}
            </Button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={isExplainedModalOpen} onClose={handleCloseModal2}>
        <h2 className="mb-4 text-xl font-bold">
          {translate("Add Explained Topic", "Ajouter un sujet expliqué", "إضافة موضوع مشروح")}
        </h2>
        <div className="flex flex-col gap-4">
          <select
            name="topicId"
            value={explainedData.topicId}
            onChange={handleExplainedChange}
            className="border border-borderPrimary rounded-md px-4 py-3 outline-none w-full bg-bgPrimary"
            disabled={isLoading}
          >
            <option value="">
              {translate(
                "Select a topic",
                "Sélectionnez un sujet",
                "حدد موضوعًا"
              )}
            </option>
            {data?.data?.data?.content?.map((lesson: { lessonId: React.Key | null | undefined; lessonName: string | undefined; topics: any[]; }) => (
              <optgroup key={lesson.lessonId} label={lesson.lessonName}>
                {lesson.topics.map(topic => (
                  <option key={topic.topicId} value={topic.topicId}>
                    {topic.topicName}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
          <Input
            border="gray"
            theme="transparent"
            name="description"
            placeholder={translate(
              "Enter description",
              "Entrez la description",
              "أدخل الوصف"
            )}
            value={explainedData.description}
            onChange={handleExplainedChange}
          />
          <div className="flex gap-2">
            <Button onClick={handleExplainedSubmit}>
              {translate("Add Explained", "Ajouter une explication", "إضافة شرح")}
            </Button>
            <Button color="secondary" onClick={() => setIsExplainedModalOpen(false)}>
              {translate("Close", "Fermer", "إغلاق")}
            </Button>
          </div>
        </div>
      </Modal>

    </>
  );
};

export default Schedule;
