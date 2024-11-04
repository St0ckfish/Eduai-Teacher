/* eslint-disable @next/next/no-img-element */
"use client"
import Container from "~/_components/Container";
import * as React from "react"
import { Calendar } from "~/components/ui/calendar"

export function CalendarDemo() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      className="rounded-md flex w-fit max-[1080px]:w-full justify-center"
    />
  )
}

const Schedule = () => {
  return (
    <Container>
      <div className="flex gap-10 w-full max-[1080px]:grid mb-4">
        <div className="flex">
          <CalendarDemo />
        </div>

        <div className="flex w-full rounded-md bg-white p-4 overflow-auto">
          <div className="relative overflow-auto sm:rounded-lg w-full">
            <p className="mb-3 font-semibold">Today’s sessions</p>
            <table className="w-full overflow-x-auto text-left text-sm text-black p-4">
              <thead className="bg-thead text-xs uppercase text-textPrimary">
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
                <tr className=" hover:text-white font-semibold hover:bg-primary bg-bgSecondary">
                  <th
                    scope="row"
                    className="whitespace-nowrap px-6 py-4 font-medium text-textSecondary rounded-s-2xl"
                  >
                    Class 5/2
                  </th>
                  <td className="whitespace-nowrap px-6 py-4">English</td>
                  <td className="whitespace-nowrap px-6 py-4">
                    10:30 am-11:30 am
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 rounded-e-2xl">60 min</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="flex gap-10 w-full max-[1080px]:grid">
        <div className="flex w-[450px] max-[1080px]:w-full rounded-md bg-white p-4 h-fit">
          <div className="relative overflow-auto w-full">
            <p className="mb-3 font-semibold">Attendance</p>
            <table className="w-full overflow-x-auto text-left text-sm text-black p-4 table-auto">
              <thead className="bg-thead text-xs uppercase text-textPrimary">
                <tr>
                  <th scope="col" className="whitespace-nowrap px-6 py-3">
                    Daily Attendance
                  </th>
                  <th scope="col" className="whitespace-nowrap px-6 py-3 justify-end text-end">
                    Absent
                  </th>
                  <th scope="col" className="whitespace-nowrap px-6 py-3 justify-end text-end">
                    Present
                  </th>
                </tr>
              </thead>
              <tbody className="">
                <tr className="font-semibold">
                  <th
                    scope="row"
                    className="whitespace-nowrap grid gap-2 px-6 py-4 font-medium text-textSecondary"
                  >
                    Omar Ali
                    <p className="text-gray-400">04:00 PM-045 PM</p>
                  </th>
                  <td className="whitespace-nowrap px-6 py-4 justify-end text-end">
                    <button className="p-3 bg-white rounded-full shadow-lg"> <img src="/images/remove.png" alt="#" /></button>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 justify-end text-end">
                    <button className="p-3 bg-white rounded-full shadow-lg"> <img src="/images/check.png" alt="#" /></button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="grid gap-4 w-full">
          <div className="w-full rounded-md bg-white p-4 grid gap-2">
            <div className="flex justify-between w-full items-start ">
              <p className="mb-3 font-semibold">Attendance</p>
              <button className="text-primary font-medium flex items-center gap-2">
                <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                </svg> Add Material
              </button>
            </div>
            <div className="p-4 border border-gray-200 rounded-md">
              <div className="grid gap-2 border-l-2 border-primary h-full px-3">
                <div className="flex justify-between items-start">
                  <p className="mb-3 font-semibold">Title</p>
                  <button>
                    <svg className="h-6 w-6 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">  <circle cx="12" cy="12" r="1" />  <circle cx="12" cy="5" r="1" />  <circle cx="12" cy="19" r="1" /></svg>
                  </button>
                </div>
                <div className="text-gray-400">
                  <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eveniet, dolorum velit beatae sed aspernatur non! Tempore earum, voluptas optio odit obcaecati repellat libero voluptatum aut, similique culpa et minima accusamus.</p>
                </div>
              </div>
            </div>
            <div className="p-4 border border-gray-200 rounded-md">
              <div className="grid gap-2 border-l-2 border-primary h-full px-3">
                <div className="flex justify-between items-start">
                  <p className="mb-3 font-semibold">Title</p>
                  <button>
                    <svg className="h-6 w-6 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">  <circle cx="12" cy="12" r="1" />  <circle cx="12" cy="5" r="1" />  <circle cx="12" cy="19" r="1" /></svg>
                  </button>
                </div>
                <div className="text-gray-400">
                  <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eveniet, dolorum velit beatae sed aspernatur non! Tempore earum, voluptas optio odit obcaecati repellat libero voluptatum aut, similique culpa et minima accusamus.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full rounded-md bg-white p-4 grid gap-2">
            <div className="flex justify-between w-full items-start ">
              <p className="mb-3 font-semibold">Attendance</p>
              <button className="text-primary font-medium flex items-center gap-2">
                <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                </svg> Add Material
              </button>
            </div>
            <div className="p-4 border border-gray-200 rounded-md">
              <div className="grid gap-2 border-l-2 border-primary h-full px-3">
                <div className="flex justify-between items-start">
                  <p className="mb-3 font-semibold">Title</p>
                  <button>
                    <svg className="h-6 w-6 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">  <circle cx="12" cy="12" r="1" />  <circle cx="12" cy="5" r="1" />  <circle cx="12" cy="19" r="1" /></svg>
                  </button>
                </div>
                <div className="text-gray-400">
                  <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eveniet, dolorum velit beatae sed aspernatur non! Tempore earum, voluptas optio odit obcaecati repellat libero voluptatum aut, similique culpa et minima accusamus.</p>
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
