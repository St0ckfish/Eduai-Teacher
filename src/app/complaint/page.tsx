import Container from "~/_components/Container";
import { AiOutlineDown } from "react-icons/ai";
import { BsArrowDownLeft, BsArrowUpRight } from "react-icons/bs";
import Input from "~/_components/Input";

const Complaint = () => {
  return (
    <>
      <Container>
        <div className="m-4 mb-4 flex flex-col items-start justify-between gap-4 md:flex-row">
          <div className="flex w-full flex-col gap-4 rounded-xl bg-bgPrimary p-4">
            <h1 className="text-2xl font-semibold">Complaint</h1>
            <div className="border-b border-borderSecondary pb-4">
              <h2 className="text-xl font-semibold">Recent</h2>
              <div className="mt-4 flex items-center justify-between rounded-xl border border-borderSecondary p-4">
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-success bg-opacity-5">
                    <BsArrowUpRight size={30} className="text-success" />
                  </div>
                  <div>
                    <h3 className="text-lg">
                      Complaint to Nada Mohamed&apos;s Parent
                    </h3>
                    <p className="text-textSecondary">1 May 2024</p>
                  </div>
                </div>
                <div className="mt-[2px]">
                  <AiOutlineDown size={20} className="text-textSecondary" />
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between rounded-xl border border-borderSecondary p-4">
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-warning bg-opacity-5">
                    <BsArrowDownLeft size={30} className="text-warning" />
                  </div>
                  <div>
                    <h3 className="text-lg">
                      Complaint to Nada Mohamed&apos;s Parent
                    </h3>
                    <p className="text-textSecondary">1 May 2024</p>
                  </div>
                </div>
                <div className="mt-[2px]">
                  <AiOutlineDown size={20} className="text-textSecondary" />
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold">Earliest</h2>
              <div className="mt-4 flex items-center justify-between rounded-xl border border-borderSecondary p-4">
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-success bg-opacity-5">
                    <BsArrowUpRight size={30} className="text-success" />
                  </div>
                  <div>
                    <h3 className="text-lg">
                      Complaint to Nada Mohamed&apos;s Parent
                    </h3>
                    <p className="text-textSecondary">1 May 2024</p>
                  </div>
                </div>
                <div className="mt-[2px]">
                  <AiOutlineDown size={20} className="text-textSecondary" />
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between rounded-xl border border-borderSecondary p-4">
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-warning bg-opacity-5">
                    <BsArrowDownLeft size={30} className="text-warning" />
                  </div>
                  <div>
                    <h3 className="text-lg">
                      Complaint to Nada Mohamed&apos;s Parent
                    </h3>
                    <p className="text-textSecondary">1 May 2024</p>
                  </div>
                </div>
                <div className="mt-[2px]">
                  <AiOutlineDown size={20} className="text-textSecondary" />
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between rounded-xl border border-borderSecondary p-4">
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-success bg-opacity-5">
                    <BsArrowUpRight size={30} className="text-success" />
                  </div>
                  <div>
                    <h3 className="text-lg">
                      Complaint to Nada Mohamed&apos;s Parent
                    </h3>
                    <p className="text-textSecondary">1 May 2024</p>
                  </div>
                </div>
                <div className="mt-[2px]">
                  <AiOutlineDown size={20} className="text-textSecondary" />
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between rounded-xl border border-borderSecondary p-4">
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-warning bg-opacity-5">
                    <BsArrowDownLeft size={30} className="text-warning" />
                  </div>
                  <div>
                    <h3 className="text-lg">
                      Complaint to Nada Mohamed&apos;s Parent
                    </h3>
                    <p className="text-textSecondary">1 May 2024</p>
                  </div>
                </div>
                <div className="mt-[2px]">
                  <AiOutlineDown size={20} className="text-textSecondary" />
                </div>
              </div>
            </div>
            <div className="mt-4 flex justify-center gap-1">
                <div>Show more </div>
                <div className="mt-[2px]">
                  <AiOutlineDown size={20} />{" "}
                </div>
              </div>
          </div>
          <div className="w-full rounded-xl bg-bgPrimary p-4 md:w-1/2">
            <h1 className="text-2xl font-semibold">Add Complaint</h1>
            <form className="w-full">
            <label htmlFor="class" className="mt-4">
            <select
              name="class"
              id="class"
              className="w-full rounded-lg border bg-bgPrimary border-borderSecondary mt-4 p-3 text-gray-700 outline-none transition duration-200 ease-in"
            >
              <option value="class">Select Class</option>
            </select>
          </label>
          <label htmlFor="student">
            <select
              name="student"
              id="student"
              className="w-full rounded-lg border bg-bgPrimary border-borderSecondary mt-4 p-3 text-gray-700 outline-none transition duration-200 ease-in"
            >
              <option value="student">Select Student</option>
            </select>
          </label>
          <label htmlFor="subject">
            <Input placeholder="Subject" className="mt-4" />
          </label>

          

          <label htmlFor="area">
            <textarea
              id="area"
              placeholder="Write the problem"
              className="-mt-2 w-full rounded-lg border bg-bgPrimary border-borderSecondary p-3 text-gray-700 outline-none transition duration-200 ease-in"
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
