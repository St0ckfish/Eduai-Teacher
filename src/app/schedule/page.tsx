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
} from "~/APIs/hooks/useSchedule";
import Spinner from "~/_components/Spinner";
import { format } from "date-fns";
import { AttendanceStatus, Material, type TeacherSchedule } from "~/types";
import { useState } from "react";
import Button from "~/_components/Button";
import Input from "~/_components/Input";
import { useCreateSessionMaterial } from "~/APIs/hooks/useMaterial";
import { toast } from "react-toastify";
import Link from "next/link";
import { FaDownload } from "react-icons/fa6";

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
  const [materialData, setMaterialData] = useState<Omit<Material, "sessionId">>(
    {
      title: "",
      description: "",
      file: null as any,
    },
  );

  const { mutate: addMaterial } = useCreateSessionMaterial({
    onSuccess: (data) => {
      console.log("Material added successfully:", data);
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
      sessionId: selectedScheduleId.toString(),
      title: materialData.title,
      description: materialData.description,
    };

    formData.append("request", JSON.stringify(requestData));

    formData.append("file", materialData.file);

    addMaterial(formData);
  };

  const [selectedDate, setSelectedDate] = React.useState<Date>(new Date());
  const [selectedScheduleId, setSelectedScheduleId] = React.useState<
    string | null
  >(null);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setMaterialData((prev) => ({ ...prev, [name]: value }));
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const formattedDate = React.useMemo(
    () => format(selectedDate, "yyyy-MM-dd"),
    [selectedDate],
  );

  function convertToAmPm(time24: string): string {
    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/;
    const match = timeRegex.exec(time24);

    if (!match) {
      throw new Error(
        "Invalid time format. Please use HH:MM:SS in 24-hour format.",
      );
    }

    const [hoursStr, minutes] = match;
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
  console.log("scheduleData", scheduleData);
  const { data: attendanceData, isLoading: isAttendanceLoading } =
    useGetAllSessionAttendance(selectedScheduleId ?? "");

  const { data: Materiales, isLoading: isMaterialeLoading } =
    useGetAllSessionMateriale(selectedScheduleId ?? "");

  console.log(Materiales);
  const { data: Explaineds, isLoading: isExplainedLoading } =
    useGetAllSessionExplained(selectedScheduleId ?? "");
  console.log(selectedScheduleId);

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    // Reset selected schedule when date changes
    setSelectedScheduleId(null);
  };

  const handleScheduleSelect = (scheduleId: string) => {
    setSelectedScheduleId(scheduleId);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Container>
      <div className="mb-4 flex w-full gap-10 max-[1080px]:grid">
        <div className="flex">
          <CalendarDemo onDateSelect={handleDateSelect} />
        </div>

        <div className="flex w-full overflow-auto rounded-md bg-bgPrimary p-4">
          <div className="relative w-full overflow-auto sm:rounded-lg">
            <Text font={"semiBold"} className="mb-3">
              Sessions for {format(selectedDate, "MMMM d, yyyy")}
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
                      Class
                    </th>
                    <th scope="col" className="whitespace-nowrap px-6 py-3">
                      Subject
                    </th>
                    <th scope="col" className="whitespace-nowrap px-6 py-3">
                      Time
                    </th>
                    <th scope="col" className="whitespace-nowrap px-6 py-3">
                      Duration
                    </th>
                    <th scope="col" className="whitespace-nowrap px-6 py-3">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="rounded-lg">
                  {scheduleData?.data?.map((schedule: TeacherSchedule) => (
                    <tr
                      key={schedule.id}
                      className={`bg-bgSecondary font-semibold hover:bg-primary hover:text-white ${selectedScheduleId === schedule.id.toString() ? "bg-primary text-white" : ""}`}
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
                          onClick={() =>
                            handleScheduleSelect(schedule.id.toString())
                          }
                          className="underline"
                        >
                          Select
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
                        No sessions scheduled for this date
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
              Daily Attendance
            </Text>
            {isAttendanceLoading ? (
              <div className="flex w-full justify-center">
                <Spinner />
              </div>
            ) : (
              <table className="w-full table-auto overflow-x-auto p-4 text-left text-sm text-textPrimary">
                <thead className="text-xs uppercase text-textPrimary">
                  <tr>
                    <th scope="col" className="whitespace-nowrap px-6 py-3">
                      Student
                    </th>
                    <th
                      scope="col"
                      className="justify-end whitespace-nowrap px-6 py-3 text-end"
                    >
                      Absent
                    </th>
                    <th
                      scope="col"
                      className="justify-end whitespace-nowrap px-6 py-3 text-end"
                    >
                      Present
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {attendanceData?.data?.content.map((student) => (
                    <tr key={student.id} className="font-semibold">
                      <th
                        scope="row"
                        className="grid gap-2 whitespace-nowrap px-6 py-4 font-medium text-textSecondary"
                      >
                        {student.studentName}
                        {/* Assuming you want to show some additional info */}
                        {/* <p className="text-textMuted">{student.additionalInfo}</p> */}
                      </th>
                      <td className="justify-end whitespace-nowrap px-6 py-4 text-end">
                        <button
                          className={`rounded-full p-3 shadow-lg ${
                            student.status !== AttendanceStatus.ABSENT
                              ? "bg-gray-200"
                              : "bg-error/10"
                          }`}
                        >
                          <img src="/images/remove.png" alt="Absent" />
                        </button>
                      </td>
                      <td className="justify-end whitespace-nowrap px-6 py-4 text-end">
                        <button
                          className={`rounded-full p-3 shadow-lg ${
                            student.status !== AttendanceStatus.ABSENT
                              ? "bg-success/10"
                              : "bg-gray-200"
                          }`}
                        >
                          <img src="/images/check.png" alt="Present" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {(!attendanceData?.data?.content ||
                    attendanceData.data.content.length === 0) && (
                    <tr>
                      <td
                        colSpan={3}
                        className="px-6 py-4 text-center text-gray-500"
                      >
                        {selectedScheduleId
                          ? "No attendance data available for this session"
                          : "Select a session to view attendance"}
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
                Materials
              </Text>
              <button
                className={`flex items-center gap-2 font-medium ${
                  selectedScheduleId
                    ? "cursor-pointer text-primary"
                    : "cursor-not-allowed text-textSecondary"
                }`}
                disabled={!selectedScheduleId}
                onClick={handleOpenModal}
              >
                <svg
                  className={`h-6 w-6 ${
                    selectedScheduleId ? "text-primary" : "text-textSecondary"
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
                Add Material
              </button>
            </div>
            {selectedScheduleId ? (
              isMaterialeLoading ? (
                <div className="text-center">
                  <Spinner />
                </div>
              ) : (Materiales?.data?.length ?? 0) > 0 ? (
                Materiales?.data?.map((material) => (
                  <div
                    key={material.fileId}
                    className="rounded-md border border-borderPrimary p-4"
                  >
                    <div className="grid h-full gap-2 border-l-4 border-primary px-3">
                      <div className="flex items-start justify-between">
                        <Text font={"bold"} size={"xl"}>
                          {material.title}
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
                            <circle cx="12" cy="12" r="1" />
                            <circle cx="12" cy="5" r="1" />
                            <circle cx="12" cy="19" r="1" />
                          </svg>
                        </button>
                      </div>
                      <div>
                        <Text color={"gray"}>{material.description}</Text>
                      </div>
                      {material.fileLink && (
                        <Link href={material.fileLink}>
                          <FaDownload className="text-primary mb-2" /> 
                        </Link>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-500">
                  No Materials Available{" "}
                  {selectedScheduleId ? `at class ${selectedScheduleId}` : ""}
                </div>
              )
            ) : (
              <div className="text-center">
                <Text color={"gray"}>Select a class</Text>
              </div>
            )}
          </div>
          <div className="grid w-full gap-2 rounded-md bg-bgPrimary p-4">
            {isExplainedLoading ? (
              <div className="flex w-full justify-center">
                <Spinner />
              </div>
            ) : (
              <div className="flex w-full items-start justify-between">
                <Text font={"bold"} size={"2xl"} className="mb-4">
                  Explained
                </Text>
                <button className="flex items-center gap-2 font-medium text-primary">
                  <svg
                    className="h-6 w-6 text-primary"
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
                  Add Explained
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
                No explained topics available
              </div>
            )}
          </div>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-1/3 rounded-lg bg-white p-6">
            <h2 className="mb-4 text-xl font-bold">Add Material</h2>
            <div className="flex flex-col gap-4">
              <Input
                border="gray"
                theme="transparent"
                type="text"
                name="title"
                placeholder="Enter title"
                value={materialData.title}
                onChange={handleChange}
              />
              <Input
                border="gray"
                theme="transparent"
                name="description"
                placeholder="Enter description"
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
                <Button onClick={handleSubmit}>Add Material</Button>
                <Button color="secondary" onClick={handleCloseModal}>
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
};

export default Schedule;
