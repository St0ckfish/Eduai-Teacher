/* eslint-disable @next/next/no-img-element */
"use client";
import Container from "~/_components/Container";
import * as React from "react";
import { Calendar } from "~/components/ui/calendar";

function CalendarDemo() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      className="flex w-fit justify-center rounded-md max-[1080px]:w-full"
    />
  );
}
const Homework = () => {
  return (
    <Container>
      <div className="mb-4 flex w-full gap-10 max-[1080px]:grid">
        <div className="flex">
          <CalendarDemo />
        </div>

        <div className="grid w-full gap-2 rounded-md bg-white p-4">
          <div className="flex w-full items-start justify-between">
            <p className="mb-3 font-semibold">Homework</p>
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
          <div className="rounded-md border border-gray-200 p-4">
            <div className="grid h-full gap-2 border-l-2 border-primary px-3">
              <div className="flex items-start justify-between">
                <p className="mb-3 font-semibold">Title</p>
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
                    {" "}
                    <circle cx="12" cy="12" r="1" />{" "}
                    <circle cx="12" cy="5" r="1" />{" "}
                    <circle cx="12" cy="19" r="1" />
                  </svg>
                </button>
              </div>
              <div className="text-gray-400">
                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Eveniet, dolorum velit beatae sed aspernatur non! Tempore
                  earum, voluptas optio odit obcaecati repellat libero
                  voluptatum aut, similique culpa et minima accusamus.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-md border border-gray-200 p-4">
            <div className="grid h-full gap-2 border-l-2 border-primary px-3">
              <div className="flex items-start justify-between">
                <p className="mb-3 font-semibold">Title</p>
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
                    {" "}
                    <circle cx="12" cy="12" r="1" />{" "}
                    <circle cx="12" cy="5" r="1" />{" "}
                    <circle cx="12" cy="19" r="1" />
                  </svg>
                </button>
              </div>
              <div className="text-gray-400">
                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Eveniet, dolorum velit beatae sed aspernatur non! Tempore
                  earum, voluptas optio odit obcaecati repellat libero
                  voluptatum aut, similique culpa et minima accusamus.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Homework;
