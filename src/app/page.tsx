"use client";
import Image from "next/image";
import Container from "~/_components/Container";
import {
  FaEllipsisH,
  FaRegComment,
  FaRegHeart,
  FaPaperPlane,
} from "react-icons/fa";
import Input from "~/_components/Input";
import Comment from "~/_components/Comment";
import { AiOutlineClockCircle, AiOutlineDown } from "react-icons/ai";
import Button from "~/_components/Button";
import React from "react";
import { Calendar } from "~/components/ui/calendar";
import { Text } from "~/_components/Text";

export default function Home() {
  function CalendarDemo() {
    const [date, setDate] = React.useState<Date | undefined>(new Date());

    return (
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="flex w-full justify-center rounded-md"
      />
    );
  }

  return (
    <Container>
      <div className="m-4 mb-4 flex flex-col items-start justify-between gap-4 md:flex-row">
        <div className="flex w-full flex-col gap-4">
          <div className="w-full rounded-xl bg-bgPrimary p-4">
            <div className="mb-4 border-b border-borderPrimary py-4">
              <div className="mb-4 flex justify-between">
                <div className="flex gap-4">
                  <div>
                    <Image
                      src="/images/man.png"
                      alt="Profile Photo"
                      width={60}
                      height={60}
                    />
                  </div>
                  <div>
                    <Text font={"bold"}>Abdesamad Banoun</Text>
                    <Text color={"gray"}>1h ago</Text>
                  </div>
                </div>
                <div className="mt-2 font-extrabold">
                  <FaEllipsisH size={20} />
                </div>
              </div>
              <Text className="ml-2">
                Lorem ipsum dolor sit amet consectetur. Morbi aenean ut ipsum
                sed integer quis nunc. Augue nulla laoreet mattis enim
              </Text>
            </div>
            <div>
              <div className="flex gap-3">
                <FaRegHeart size={20} />
                <FaRegComment size={20} />
                <FaPaperPlane size={20} />
              </div>

              <div className="my-4 ml-4">
                <Comment
                  userName="Badr El Zalzouli"
                  comment="lorem ipsum do"
                  time="1h ago"
                  imageUrl="/images/man.png"
                />
                <Comment
                  userName="Badr El Zalzouli"
                  comment="lorem ipsum do"
                  time="1h ago"
                  imageUrl="/images/man.png"
                />
                <div className="mb-4 ml-12 flex">
                  <Comment
                    userName="Badr El Zalzouli"
                    comment="lorem ipsum do"
                    time="1h ago"
                    imageUrl="/images/man.png"
                  />
                </div>
              </div>
              <div>
                <Input border="gray" theme="comment" placeholder="Add comment..." rounded="2xl" />
              </div>
            </div>
          </div>

          <div className="w-full rounded-xl bg-bgPrimary p-4">
            <div className="mb-4 border-b border-borderPrimary py-4">
              <div className="mb-4 flex justify-between">
                <div className="flex gap-4">
                  <div>
                    <Image
                      src="/images/man.png"
                      alt="Profile Photo"
                      width={60}
                      height={60}
                    />
                  </div>
                  <div>
                    <Text font={"bold"}>Abdesamad Banoun</Text>
                    <Text color={"gray"}>1h ago</Text>
                  </div>
                </div>
                <div className="mt-2">
                  <FaEllipsisH size={20} />
                </div>
              </div>
              <Text className="ml-2">
                Lorem ipsum dolor sit amet consectetur. Morbi aenean ut ipsum
                sed integer quis nunc. Augue nulla laoreet mattis enim
              </Text>
            </div>
            <div>
              <div className="flex gap-3">
                <FaRegHeart size={20} />
                <FaRegComment size={20} />
                <FaPaperPlane size={20} />
              </div>

              <div className="my-4 ml-4">
                <Comment
                  userName="Badr El Zalzouli"
                  comment="lorem ipsum do"
                  time="1h ago"
                  imageUrl="/images/man.png"
                />
                <Comment
                  userName="Badr El Zalzouli"
                  comment="lorem ipsum do"
                  time="1h ago"
                  imageUrl="/images/man.png"
                />
                <div className="mb-4 ml-12 flex">
                  <Comment
                    userName="Badr El Zalzouli"
                    comment="lorem ipsum do"
                    time="1h ago"
                    imageUrl="/images/man.png"
                  />
                </div>
              </div>
              <div>
                <Input border="gray" theme="comment" placeholder="Add comment..." rounded="2xl" />
              </div>
            </div>
          </div>
        </div>

        <div className="w-full rounded-md bg-bgPrimary p-4 md:w-1/2">
          <div className="my-2 border-b border-borderPrimary">
            <Text font={"bold"} size={"2xl"}>
              Today&apos;s Events
            </Text>
            <div className="my-4">
              <div>
                <div className="flex justify-between rounded-md bg-thead p-2 text-primary">
                  <Text color={"primary"}>Today</Text>
                  <div className="flex gap-1">
                    <div className="mt-[2px]">
                      <AiOutlineClockCircle size={18} />
                    </div>
                    <Text color={"primary"}>04:00 - 43 Min</Text>
                  </div>
                </div>

                <div className="flex justify-between p-4">
                  <div>
                    <Text>Parent - teacher meeting!</Text>
                    <Text color={"gray"}>Academic Progress</Text>
                  </div>
                  <div>
                    <Button>Confirm Attendance</Button>
                  </div>
                </div>
              </div>
              <div className="flex justify-center gap-1 text-primary">
                <Text color={"primary"}>Show more </Text>
                <div className="mt-[2px]">
                  <AiOutlineDown size={20} />{" "}
                </div>
              </div>
            </div>
          </div>
          <div className="my-2 border-b border-borderPrimary">
            <Text font={"bold"} size={"2xl"}>
              Upcoming Events
            </Text>
            <div className="my-4">
              <div>
                <div className="flex justify-between rounded-md bg-thead p-2 text-primary">
                  <Text color={"primary"}>Sunday - 4 April 2024</Text>
                  <div className="flex gap-1">
                    <div className="mt-[2px]">
                      <AiOutlineClockCircle size={18} />
                    </div>
                    <Text color={"primary"}>04:00 - 43 Min</Text>
                  </div>
                </div>

                <div className="flex justify-between p-4">
                  <div>
                    <Text>Parent - teacher meeting!</Text>
                    <Text color={"gray"}>Academic Progress</Text>
                  </div>
                  <div>
                    <Button>Confirm Attendance</Button>
                  </div>
                </div>
              </div>
              <div className="flex justify-center gap-1 text-primary">
                <Text color={"primary"}>Show more </Text>
                <div className="mt-[2px]">
                  <AiOutlineDown size={20} />{" "}
                </div>
              </div>
            </div>
          </div>

          <div className="my-2 border-b border-borderPrimary">
            <Text font={"bold"} size={"2xl"}>
              Public Holidays Calendar
            </Text>
            <div className="flex w-full justify-center">
              <div className="mt-4 flex w-fit items-center justify-center shadow-lg">
                <CalendarDemo />
              </div>
            </div>

            <div className="mt-4 flex items-center border border-borderPrimary">
              <div className="m-4 border-r-4 border-primary py-4 pr-4 text-primary">
                <div className="flex flex-col items-center font-bold">
                  <Text color={"primary"} size={"xl"} font={"bold"}>
                    20
                  </Text>
                  <Text color={"primary"} size={"xl"} font={"bold"}>
                    August
                  </Text>
                </div>
              </div>
              <div>
                <Text font={"bold"}>Revolution of the King and the People</Text>
                <Text color={"gray"}>Tuesday</Text>
              </div>
            </div>

            <div className="mt-4 flex items-center border border-borderPrimary">
              <div className="m-4 border-r-4 border-primary py-4 pr-4 text-primary">
                <div className="flex flex-col items-center font-bold">
                  <Text color={"primary"} size={"xl"} font={"bold"}>
                    21
                  </Text>
                  <Text color={"primary"} size={"xl"} font={"bold"}>
                    August
                  </Text>
                </div>
              </div>
              <div>
                <Text font={"bold"}>Youth Day</Text>
                <Text color={"gray"}>Wednesday</Text>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}