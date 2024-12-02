"use client";
import Container from "~/_components/Container";
import { AiOutlineDown } from "react-icons/ai";
import { BsArrowDownLeft, BsArrowUpRight } from "react-icons/bs";
import Input from "~/_components/Input";
import { useGetAllAdvices } from "~/APIs/hooks/useAdvice";
import { Text } from "~/_components/Text";
import { useGetAllComplains } from "~/APIs/hooks/useComplains";

const Complaint = () => {
  const { data, isLoading } = useGetAllComplains();

  function formatBeautifulDate(dateString: string): string {
    const date = new Date(dateString);
  
    const days = [
      'Sunday', 'Monday', 'Tuesday', 'Wednesday', 
      'Thursday', 'Friday', 'Saturday'
    ];
  
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June', 
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
  
    const dayName = days[date.getDay()];
    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
  
    const ordinalDay = getOrdinalDay(day);

    return `${dayName}, ${month} ${ordinalDay}, ${year}`;
  }
  
  function getOrdinalDay(day: number): string {
    if (day > 3 && day < 21) return day + 'th';
    switch (day % 10) {
      case 1: return day + 'st';
      case 2: return day + 'nd';
      case 3: return day + 'rd';
      default: return day + 'th';
    }
  }

  return (
    <>
      <Container>
        <div className="m-4 mb-4 flex flex-col items-start justify-between gap-4 md:flex-row">
          <div className="flex w-full flex-col gap-4 rounded-xl bg-bgPrimary p-4">
            <Text font={"bold"} size={"4xl"} >Complaint</Text>
            <div className="border-b border-borderPrimary pb-4">
                {
                  data?.data.content.map((compliant) => (
                      <div key={compliant.id} className="mt-4 flex items-center justify-between rounded-xl border border-borderPrimary p-4">
                        <div className="flex gap-4">
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-warning/10">
                            {
                              compliant.approved  ? 
                              <BsArrowUpRight size={30} className="text-success" /> : 
                  <BsArrowDownLeft size={20} className="text-error" />
                            }
                          </div>
                          <div>
                            <Text size={"lg"} font="medium">
                              {compliant.teacherName}
                            </Text>
                            <Text size={"lg"} font="medium">
                              {compliant.studentName}
                            </Text>
                            <Text size={"md"}>
                              {compliant.message}
                            </Text>
                            <Text color={"gray"}>{formatBeautifulDate(compliant.creationDateTime)}</Text>
                          </div>
                        </div>
                        <div className="mt-[2px]">
                          <AiOutlineDown size={20} className="text-textSecondary" />
                        </div>
                      </div>
                  ))
                }
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
