/* eslint-disable @next/next/no-img-element */
"use client";
import Container from "~/_components/Container";
import * as React from "react";
import { Calendar } from "~/components/ui/calendar";
import { Text } from "~/_components/Text";
import { useGetAllHomeWorks } from "~/APIs/hooks/useHomeWork";
import { useGetAllSchedules } from "~/APIs/hooks/useSchedule";
import { format } from "date-fns";
import Spinner from "~/_components/Spinner";
import type { Homework, TeacherSchedule } from "~/types";

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

const Homework = () => {
  const [selectedDate, setSelectedDate] = React.useState<Date>(new Date());
  const [selectedSessionId, setSelectedSessionId] = React.useState<number | null>(null);

  const formattedDate = React.useMemo(() => 
    format(selectedDate, 'yyyy-MM-dd'),
    [selectedDate]
  );

  const { data: sessions, isLoading: isSessions } = useGetAllSchedules(formattedDate);
  const { data: homeworks, isLoading: isHomework } = useGetAllHomeWorks(
    selectedSessionId ?? 0
  );

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setSelectedSessionId(null);
  };

  const handleSessionSelect = (sessionId: number) => {
    setSelectedSessionId(sessionId);
  };

  return (
    <Container>
      <div className="mb-4 flex w-full gap-10 max-[1080px]:grid">
        <div className="flex h-fit">
          <CalendarDemo onDateSelect={handleDateSelect} />
        </div>

        <div className="grid w-full gap-2 rounded-md bg-bgPrimary p-4">
          <div className="flex w-full items-start justify-between">
            <Text font={"bold"} size={"2xl"}>Homework</Text>
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

          {/* Sessions List */}
          {sessions?.data && (
            <div className="mb-4">
              <Text className="mb-2">Select a Session:</Text>
              <div className="flex gap-2 flex-wrap">
                {sessions.data.map((session: TeacherSchedule) => (
                  <button
                    key={session.id}
                    onClick={() => handleSessionSelect(session.id)}
                    className={`px-3 py-1 rounded-md ${
                      selectedSessionId === session.id 
                        ? 'bg-primary text-white' 
                        : 'bg-gray-200 text-black'
                    }`}
                  >
                    {session.courseName}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Homework List */}
          {(isHomework &&  selectedSessionId) ? <div className="flex w-full justify-center">
                <Spinner />
                </div> :
            <div className="grid items-start h-full">
              {homeworks?.data?.content && homeworks.data.content.length > 0 ? (
                homeworks?.data.content.map((homework: Homework) => (
                  <div 
                    key={homework.id} 
                    className="rounded-md border border-borderPrimary p-4 mb-2"
                  >
                    <div className="grid h-full gap-2 border-l-4 border-primary px-3">
                      <div className="flex items-start justify-between">
                        <Text font="bold" size="xl">{homework.title}</Text>
                        <button>
                          <svg
                            className="h-6 w-6 text-black"
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
                        <Text color="gray">{homework.description}</Text>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-500">
                  No homework found for the selected session
                </div>
              )}
            </div>
                 }
          
        </div>
      </div>
    </Container>
  );
};

export default Homework;