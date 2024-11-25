"use client";
import Container from "~/_components/Container";
import { AiOutlineDown } from "react-icons/ai";
import { BsArrowDownLeft, BsArrowUpRight } from "react-icons/bs";
import Input from "~/_components/Input";
import { useGetAllAdvices } from "~/APIs/hooks/useAdvice";
import { Text } from "~/_components/Text";

const Complaint = () => {
  const { data, isLoading, error } = useGetAllAdvices({ page: 1, limit: 10 });
  return (
    <>
      <Container>
        <div className="m-4 mb-4 flex flex-col items-start justify-between gap-4 md:flex-row">
          <div className="flex w-full flex-col gap-4 rounded-xl bg-bgPrimary p-4">
            <Text font={"bold"} size={"4xl"} >Complaint</Text>
            <div className="border-b border-borderPrimary pb-4">
              <Text font={"bold"} size={"2xl"}>Recent</Text>
              <div className="mt-4 flex items-center justify-between rounded-xl border border-borderPrimary p-4">
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-success/10">
                    <BsArrowUpRight size={30} className="text-success" />
                  </div>
                  <div>
                    <Text size={"lg"}>
                      Complaint to Nada Mohamed&apos;s Parent
                    </Text>
                    <Text color={"gray"}>1 May 2024</Text>
                  </div>
                </div>
                <div className="mt-[2px]">
                  <AiOutlineDown size={20} className="text-textSecondary" />
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between rounded-xl border border-borderPrimary p-4">
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-warning/10">
                    <BsArrowDownLeft size={30} className="text-warning" />
                  </div>
                  <div>
                    <Text size={"lg"}>
                      Complaint to Nada Mohamed&apos;s Parent
                    </Text>
                    <Text color={"gray"}>1 May 2024</Text>
                  </div>
                </div>
                <div className="mt-[2px]">
                  <AiOutlineDown size={20} className="text-textSecondary" />
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold">Earliest</h2>
              <div className="mt-4 flex items-center justify-between rounded-xl border border-borderPrimary p-4">
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-success/10">
                    <BsArrowUpRight size={30} className="text-success" />
                  </div>
                  <div>
                    <Text size={"lg"}>
                      Complaint to Nada Mohamed&apos;s Parent
                    </Text>
                    <Text color={"gray"}>1 May 2024</Text>
                  </div>
                </div>
                <div className="mt-[2px]">
                  <AiOutlineDown size={20} className="text-textSecondary" />
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between rounded-xl border border-borderPrimary p-4">
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-warning/10">
                    <BsArrowDownLeft size={30} className="text-warning" />
                  </div>
                  <div>
                    <Text size={"lg"}>
                      Complaint to Nada Mohamed&apos;s Parent
                    </Text>
                    <Text color={"gray"}>1 May 2024</Text>
                  </div>
                </div>
                <div className="mt-[2px]">
                  <AiOutlineDown size={20} className="text-textSecondary" />
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between rounded-xl border border-borderPrimary p-4">
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-success/10">
                    <BsArrowUpRight size={30} className="text-success" />
                  </div>
                  <div>
                    <Text size={"lg"}>
                      Complaint to Nada Mohamed&apos;s Parent
                    </Text>
                    <Text color={"gray"}>1 May 2024</Text>
                  </div>
                </div>
                <div className="mt-[2px]">
                  <AiOutlineDown size={20} className="text-textSecondary" />
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between rounded-xl border border-borderPrimary p-4">
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-warning/10">
                    <BsArrowDownLeft size={30} className="text-warning" />
                  </div>
                  <div>
                    <Text size={"lg"}>
                      Complaint to Nada Mohamed&apos;s Parent
                    </Text>
                    <Text color={"gray"}>1 May 2024</Text>
                  </div>
                </div>
                <div className="mt-[2px]">
                  <AiOutlineDown size={20} className="text-textSecondary" />
                </div>
              </div>
            </div>
            <div className="mt-4 flex justify-center gap-1">
              <Text>Show more </Text>
              <div className="mt-[2px]">
                <AiOutlineDown size={20} />{" "}
              </div>
            </div>
          </div>
          <div className="w-full rounded-xl bg-bgPrimary p-4 md:w-1/2">
            <Text font={"bold"} size={"2xl"}>Add Complaint</Text>
            <form className="w-full">
              <label htmlFor="class" className="mt-4">
                <select
                  name="class"
                  id="class"
                  className="mt-4 w-full rounded-lg border border-borderPrimary bg-bgPrimary p-3 text-textSecondary outline-none transition duration-200 ease-in"
                >
                  <option value="class">Select Class</option>
                </select>
              </label>
              <label htmlFor="student">
                <select
                  name="student"
                  id="student"
                  className="mt-4 w-full rounded-lg border border-borderPrimary bg-bgPrimary p-3 text-textSecondary outline-none transition duration-200 ease-in"
                >
                  <option value="student">Select Student</option>
                </select>
              </label>
              <label htmlFor="subject">
                <Input
                  placeholder="Subject"
                  theme="transparent"
                  className="mt-4"
                  border="gray"
                />
              </label>

              <label htmlFor="area">
                <textarea
                  id="area"
                  placeholder="Write the problem"
                  className="mt-4 w-full rounded-lg border border-borderPrimary bg-bgPrimary p-3 text-textPrimary placeholder:text-textSecondary outline-none transition duration-200 ease-in"
                ></textarea>
              </label>
            </form>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Complaint;
