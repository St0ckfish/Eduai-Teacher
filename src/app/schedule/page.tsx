/* eslint-disable @next/next/no-img-element */
"use client";
import Container from "~/_components/Container";
import * as React from "react";
import { Calendar } from "~/components/ui/calendar";
import { useGetAllSchedules } from "~/APIs/hooks/useSchedule";
import Spinner from "~/_components/Spinner";
import { format } from "date-fns";
import type { TeacherSchedule } from "~/types";
import Button from "~/_components/Button";
import { Text } from "~/_components/Text";

function CalendarDemo({ onDateSelect }: { onDateSelect: (date: Date) => void }) {
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
  const [selectedDate, setSelectedDate] = React.useState<Date>(new Date());
  
  const formattedDate = React.useMemo(() => 
    format(selectedDate, 'yyyy-MM-dd'),
    [selectedDate]
  );
  function convertToAmPm(time24: string): string {
    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/;
    const match = timeRegex.exec(time24);

    if (!match) {
        throw new Error("Invalid time format. Please use HH:MM:SS in 24-hour format.");
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

function getTimeDifference(startTime: string, endTime: string): { hours: number; minutes: number; seconds: number } {
  const timeToSeconds = (time: string): number => {
      const parts = time.split(':').map(part => parseInt(part, 10));
      if (parts.length !== 3 || parts.some(isNaN)) {
          throw new Error(`Invalid time format: ${time}. Expected "HH:MM:SS".`);
      }
      const hours = parts[0];
      const minutes = parts[1];
      const seconds = parts[2];
      if (typeof hours !== 'number' || typeof minutes !== 'number' || typeof seconds !== 'number' ||
          hours < 0 || hours >= 24 || minutes < 0 || minutes >= 60 || seconds < 0 || seconds >= 60) {
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

  const { data, isLoading } = useGetAllSchedules(formattedDate);

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  return (
    <Container>
      <div className="mb-4 flex w-full gap-10 max-[1080px]:grid">
        <div className="flex">
        <CalendarDemo onDateSelect={handleDateSelect} />
        </div>

        <div className="flex w-full overflow-auto rounded-md bg-bgPrimary p-4">
          <div className="relative w-full overflow-auto sm:rounded-lg">
            <Text font={"semiBold"} className="mb-3">Sessions for {format(selectedDate, 'MMMM d, yyyy')}</Text>
            {
              isLoading ? 
              <div className="flex w-full justify-center">
                <Spinner />
                </div> : 
            <table className="w-full overflow-x-auto p-4 text-left text-sm text-black">
              <thead className="bg-thead text-textPrimary text-xs uppercase">
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
                </tr>
              </thead>
              <tbody className="rounded-lg">
              {data?.data?.map((schedule: TeacherSchedule) => (
                <tr key={schedule.id} className="bg-bgSecondary font-semibold hover:bg-primary hover:text-white">
                  <th
                    scope="row"
                    className="whitespace-nowrap rounded-s-2xl px-6 py-4 font-medium"
                  >
                    {schedule.classroomName}
                  </th>
                  <td className="whitespace-nowrap px-6 py-4">{schedule.courseName}</td>
                  <td className="whitespace-nowrap px-6 py-4">
                    {convertToAmPm(schedule.startTime)} - {convertToAmPm(schedule.endTime)}
                  </td>
                  <td className="whitespace-nowrap rounded-e-2xl px-6 py-4">
                   {`${getTimeDifference(schedule.startTime, schedule.endTime).hours}h ${getTimeDifference(schedule.startTime, schedule.endTime).minutes}m`}
                  </td>
                </tr>
                ))}
                {(!data?.data || data.data.length === 0) && (
                  <tr>
                    <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                      No sessions scheduled for this date
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            }
          </div>
        </div>
      </div>
      <div className="flex w-full gap-10 max-[1080px]:grid">
        <div className="flex h-fit w-[450px] rounded-md bg-bgPrimary p-4 max-[1080px]:w-full max-[800px]:overflow-auto">
          <div className="relative w-full overflow-auto">
            <Text font={"bold"} size={"2xl"} className="mb-4">Attendance</Text>
            <table className="w-full table-auto overflow-x-auto p-4 text-left text-sm text-textPrimary">
              <thead className="bg-thead text-textPrimary text-xs uppercase">
                <tr>
                  <th scope="col" className="whitespace-nowrap px-6 py-3">
                    Daily Attendance
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
              <tbody className="">
                <tr className="font-semibold">
                  <th
                    scope="row"
                    className="text-textSecondary grid gap-2 whitespace-nowrap px-6 py-4 font-medium"
                  >
                    Omar Ali
                    <p className="text-textMuted">04:00 PM-045 PM</p>
                  </th>
                  <td className="justify-end whitespace-nowrap px-6 py-4 text-end">
                    <button className="rounded-full bg-error/10 p-3 shadow-lg">
                      {" "}
                      <img src="/images/remove.png" alt="#" />
                    </button>
                  </td>
                  <td className="justify-end whitespace-nowrap px-6 py-4 text-end">
                    <button className="rounded-full bg-success/10 p-3 shadow-lg">
                      {" "}
                      <img src="/images/check.png" alt="#" />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="grid w-full gap-4">
          <div className="grid w-full gap-2 rounded-md bg-bgPrimary p-4">
            <div className="flex w-full items-start justify-between">
              <Text font={"bold"} size={"2xl"} className="mb-4">Attendance</Text>
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
                Add Material
              </button>
            </div>
            <div className="rounded-md border border-borderPrimary p-4">
              <div className="grid h-full gap-2 border-l-4 border-primary px-3">
                <div className="flex items-start justify-between">
                  <Text font={"bold"} size={"xl"}>Title</Text>
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
                  <Text color={"gray"}>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Eveniet, dolorum velit beatae sed aspernatur non! Tempore
                    earum, voluptas optio odit obcaecati repellat libero
                    voluptatum aut, similique culpa et minima accusamus.
                  </Text>
                </div>
              </div>
            </div>
            <div className="rounded-md border border-borderPrimary p-4">
              <div className="grid h-full gap-2 border-l-4 border-primary px-3">
                <div className="flex items-start justify-between">
                  <Text font={"bold"} size={"xl"}>Title</Text>
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
                  <Text color={"gray"}>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Eveniet, dolorum velit beatae sed aspernatur non! Tempore
                    earum, voluptas optio odit obcaecati repellat libero
                    voluptatum aut, similique culpa et minima accusamus.
                  </Text>
                </div>
              </div>
            </div>
          </div>
          <div className="grid w-full gap-2 rounded-md bg-bgPrimary p-4">
            <div className="flex w-full items-start justify-between">
              <Text font={"bold"} size={"2xl"} className="mb-4">Attendance</Text>
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
                Add Material
              </button>
            </div>
            <div className="rounded-md border border-borderPrimary p-4">
              <div className="grid h-full gap-2 border-l-4 border-primary px-3">
                <div className="flex items-start justify-between">
                  <Text font={"bold"} size={"xl"}>Title</Text>
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
                  <Text color={"gray"}>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Eveniet, dolorum velit beatae sed aspernatur non! Tempore
                    earum, voluptas optio odit obcaecati repellat libero
                    voluptatum aut, similique culpa et minima accusamus.
                  </Text>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Schedule;
