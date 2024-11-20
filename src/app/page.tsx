"use client";
import Image from "next/image";
import Container from "~/_components/Container";
import { FaEllipsisH } from "react-icons/fa";
import Input from "~/_components/Input";
import Comment from "~/_components/Comment";
import { AiOutlineClockCircle, AiOutlineDown } from "react-icons/ai";
import Button from "~/_components/Button";
import React from "react";
import { Calendar } from "~/components/ui/calendar";

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
            <div className="mb-4 border-b border-borderSecondary py-4">
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
                    <div className="mt-1 text-lg font-semibold">
                      Abdesamad Banoun
                    </div>
                    <div className="mt-1 text-sm text-textSecondary">
                      1h ago
                    </div>
                  </div>
                </div>
                <div className="mt-2">
                  <FaEllipsisH size={20} />
                </div>
              </div>
              <div className="ml-2">
                Lorem ipsum dolor sit amet consectetur. Morbi aenean ut ipsum
                sed integer quis nunc. Augue nulla laoreet mattis enim
              </div>
            </div>
            <div>
              <div className="flex gap-3">
                <div>
                  <Image
                    src="/images/favourite.png"
                    alt="Favourite"
                    width={25}
                    height={25}
                  />
                </div>
                <div>
                  <Image
                    src="/images/bubble-chat.png"
                    alt="Favourite"
                    width={25}
                    height={25}
                  />
                </div>
                <div>
                  <Image
                    src="/images/sent.png"
                    alt="Favourite"
                    width={25}
                    height={25}
                  />
                </div>
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
              <div className="-mb-4">
                <Input placeholder="Add comment..." />
              </div>
            </div>
          </div>

          <div className="w-full rounded-xl bg-bgPrimary p-4">
            <div className="mb-4 border-b border-borderSecondary py-4">
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
                    <div className="mt-1 text-lg font-semibold">
                      Abdesamad Banoun
                    </div>
                    <div className="mt-1 text-sm text-textSecondary">
                      1h ago
                    </div>
                  </div>
                </div>
                <div className="mt-2">
                  <FaEllipsisH size={20} />
                </div>
              </div>
              <div className="ml-2">
                Lorem ipsum dolor sit amet consectetur. Morbi aenean ut ipsum
                sed integer quis nunc. Augue nulla laoreet mattis enim
              </div>
            </div>
            <div>
              <div className="flex gap-3">
                <div>
                  <Image
                    src="/images/favourite.png"
                    alt="Favourite"
                    width={25}
                    height={25}
                  />
                </div>
                <div>
                  <Image
                    src="/images/bubble-chat.png"
                    alt="bubble-chat"
                    width={25}
                    height={25}
                  />
                </div>
                <div>
                  <Image
                    src="/images/sent.png"
                    alt="sent"
                    width={25}
                    height={25}
                  />
                </div>
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
              <div className="-mb-4">
                <Input placeholder="Add comment..." />
              </div>
            </div>
          </div>
        </div>

        <div className="w-full rounded-md bg-bgPrimary p-4 md:w-1/2">
          <div className="my-2 border-b border-borderSecondary">
            <h1 className="text-xl font-semibold">Today&apos;s Events</h1>
            <div className="my-4">
              <div>
                <div className="flex justify-between rounded-md bg-[#E7ECFB] p-2 text-primary">
                  <div>Today</div>
                  <div className="flex gap-1">
                    <div className="mt-[2px]">
                      <AiOutlineClockCircle size={18} />
                    </div>
                    <div>04:00 - 43 Min</div>
                  </div>
                </div>

                <div className="flex justify-between p-4">
                  <div>
                    <div>Parent - teacher meeting!</div>
                    <div className="text-textSecondary">Academic Progress</div>
                  </div>
                  <div>
                    <Button>Confirm Attendance</Button>
                  </div>
                </div>
              </div>
              <div className="flex justify-center gap-1 text-primary">
                <div>Show more </div>
                <div className="mt-[2px]">
                  <AiOutlineDown size={20} />{" "}
                </div>
              </div>
            </div>
          </div>
          <div className="my-2 border-b border-borderSecondary">
            <h1 className="text-xl font-semibold">Upcoming Events</h1>
            <div className="my-4">
              <div>
                <div className="flex justify-between rounded-md bg-[#E7ECFB] p-2 text-primary">
                  <div>Sunday - 4 April 2024</div>
                  <div className="flex gap-1">
                    <div className="mt-[2px]">
                      <AiOutlineClockCircle size={18} />
                    </div>
                    <div>04:00 - 43 Min</div>
                  </div>
                </div>

                <div className="flex justify-between p-4">
                  <div>
                    <div>Parent - teacher meeting!</div>
                    <div className="text-textSecondary">Academic Progress</div>
                  </div>
                  <div>
                    <Button>Confirm Attendance</Button>
                  </div>
                </div>
              </div>
              <div className="flex justify-center gap-1 text-primary">
                <div>Show more </div>
                <div className="mt-[2px]">
                  <AiOutlineDown size={20} />{" "}
                </div>
              </div>
            </div>
          </div>

          <div className="my-2 border-b border-borderSecondary">
            <h1 className="text-xl font-semibold">Public Holidays Calendar</h1>
            <div className="flex w-full justify-center">
              <div className="mt-4 flex w-fit items-center justify-center shadow-lg">
                <CalendarDemo />
              </div>
            </div>

            <div className="mt-4 flex items-center border border-borderSecondary">
              <div className="m-4 border-r-4 border-primary py-4 pr-4 text-primary">
                <div className="flex flex-col items-center font-bold">
                  <div>20</div>
                  <div>August</div>
                </div>
              </div>
              <div>
                <div className="font-bold">
                  Revolution of the King and the People
                </div>
                <div className="text-textSecondary">Tuesday</div>
              </div>
            </div>

            <div className="mt-4 flex items-center border border-borderSecondary">
              <div className="m-4 border-r-4 border-primary py-4 pr-4 text-primary">
                <div className="flex flex-col items-center font-bold">
                  <div>21</div>
                  <div>August</div>
                </div>
              </div>
              <div>
                <div className="font-bold">Youth Day</div>
                <div className="text-textSecondary">Wednesday</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
