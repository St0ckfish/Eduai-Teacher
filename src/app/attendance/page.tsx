"use client";
import Container from "~/_components/Container";
import { FiLogIn, FiLogOut } from "react-icons/fi";
import {
  useGetAllAttendanceNumbers,
  useGetAllAttendances,
  useGetAllEarlyAttendances,
  useGetAllLeavesAttendances,
} from "~/APIs/hooks/useAttendance";
import Spinner from "~/_components/Spinner";
import useLanguageStore from "~/APIs/store";

const Attendance = () => {

  const language = useLanguageStore((state) => state.language);
  const translate = (en: string, fr: string, ar: string) => {
    return language === "fr" ? fr : language === "ar" ? ar : en;
  };

  const { data: attendanceNumbers, isLoading: isAttendanceNumbers } =
    useGetAllAttendanceNumbers();
  const { data: attendance, isLoading: isAttendance } = useGetAllAttendances();
  const { data: attendanceEarly, isLoading: isAttendanceEarly } =
    useGetAllEarlyAttendances();
  const { data: attendanceLeaves, isLoading: isAttendanceLeaves } =
    useGetAllLeavesAttendances();

  if (
    isAttendanceNumbers ||
    isAttendance ||
    isAttendanceEarly ||
    isAttendanceLeaves
  ) {
    return (
      <div className="flex w-full justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <Container>
        <div className="mx-4 flex flex-col justify-between text-xl font-semibold md:flex-row md:space-x-5">
          {isAttendanceNumbers ? (
            <div className="flex w-full justify-center">
              <Spinner />
            </div>
          ) : (
            <>
              <div className="mb-2 flex-1 rounded-3xl border-2 border-primary bg-primary/5 p-4">
                <h1 className="mb-4">
                  {translate("Total Attendance", "Présence totale", "إجمالي الحضور")}
                </h1>
                <p className="text-primary">{attendanceNumbers?.data.totalPresent}</p>
              </div>
              <div className="flex-1 rounded-3xl border-2 border-softRed bg-softRed/5 p-4 mb-2">
                <h1 className="mb-4">
                  {translate("Total Absence", "Absence totale", "إجمالي الغياب")}
                </h1>
                <p className="text-softRed">{attendanceNumbers?.data.totalAbsent}</p>
              </div>
              <div className="flex-1 rounded-3xl border-2 border-limeGreen bg-limeGreen/10 p-4 mb-2">
                <h1 className="mb-4">
                  {translate("Total Leave", "Total congés", "إجمالي الإجازات")}
                </h1>
                <p className="text-limeGreen">{attendanceNumbers?.data.totalLeaveDays}</p>
              </div>
              <div className="flex-1 rounded-3xl border-2 border-lavender bg-lavender/10 p-4 mb-2">
                <h1 className="mb-4">
                  {translate(
                    "Early Departure",
                    "Départ anticipé",
                    "المغادرة المبكرة"
                  )}
                </h1>
                <p className="text-lavender">{attendanceNumbers?.data.totalEarlyDeparture}</p>
              </div>
            </>
          )}
        </div>

        <div className="m-4 mb-4 mt-8 flex flex-col items-start justify-between gap-4 md:flex-row">
          <div className="flex w-full flex-col gap-4 rounded-xl bg-bgPrimary p-4 md:w-1/2">
            <h1 className="text-2xl font-semibold">
              {translate("Attendance", "Présence", "الحضور")}
            </h1>
            {isAttendance ? (
              <div className="flex w-full justify-center">
                <Spinner />
              </div>
            ) : (
              <div className="space-y-4">
                {attendance?.data.content.map((attend) => (
                  <div
                    key={attend.date}
                    className="rounded-xl border border-l-8 border-borderPrimary border-l-primary p-4"
                  >
                    <h2 className="text-xl font-semibold">
                      {attend.date} ({attend.dayName})
                    </h2>
                    <div className="mt-2 flex justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <div className="w-fit rounded-xl bg-primary/5 p-2">
                          <FiLogIn className="text-primary" />
                        </div>
                        <div className="text-xl">{attend.checkInTime}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-fit rounded-xl bg-primary/5 p-2">
                          <FiLogOut className="text-primary" />
                        </div>
                        <div className="text-xl">{attend.checkOutTime}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="w-full">
            {isAttendanceLeaves ? (
              <div className="flex w-full justify-center">
                <Spinner />
              </div>
            ) : (
              <div className="mb-4 rounded-xl bg-bgPrimary p-4">
                <h1 className="mb-4 text-2xl font-semibold">
                  {translate("Leave", "Congés", "الإجازات")}
                </h1>
                {attendanceLeaves?.data.content.map((attend) => (
                  <div
                    key={attend.applyDays}
                    className="rounded-xl border border-l-8 border-borderPrimary border-l-primary p-4"
                  >
                    <h2 className="text-xl font-semibold">
                      {attend.startDate} - {attend.endDate} ({attend.leaveBalance})
                    </h2>
                    <div className="mt-2 flex justify-between gap-2">
                      <div>
                        <div>{translate("Apply Days", "Jours de congés", "أيام التقديم")}</div>
                        <div>{attend.applyDays}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {isAttendanceEarly ? (
              <div className="flex w-full justify-center">
                <Spinner />
              </div>
            ) : (
              <div className="mb-4 rounded-xl bg-bgPrimary p-4">
                <h1 className="mb-4 text-2xl font-semibold">
                  {translate("Early Departure", "Départ anticipé", "المغادرة المبكرة")}
                </h1>
                {attendanceEarly?.data.content.map((attend) => (
                  <div
                    key={attend.date}
                    className="mb-4 rounded-xl border border-l-8 border-borderPrimary border-l-primary p-4"
                  >
                    <h2 className="text-xl font-semibold">
                      {attend.date} ({attend.dayName})
                    </h2>
                    <div className="mt-2 flex justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <div className="w-fit rounded-xl bg-primary/5 p-2">
                          <FiLogIn className="text-primary" />
                        </div>
                        <div className="text-xl">{attend.checkInTime}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-fit rounded-xl bg-softRed/5 p-2">
                          <FiLogOut className="text-softRed" />
                        </div>
                        <div className="text-xl">{attend.checkOutTime}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </Container>
    </>
  );
};

export default Attendance;
