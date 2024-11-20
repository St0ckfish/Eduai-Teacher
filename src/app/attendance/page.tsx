import Container from "~/_components/Container";
import { FiLogIn, FiLogOut } from "react-icons/fi";
import { AiOutlineDown } from "react-icons/ai";

const Attendance = () => {
  const tenItmes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const threeItmes = [1, 2, 3];

  return (
    <>
      <Container>
        <div className="mx-4 flex justify-between text-xl font-semibold flex-col md:flex-row md:space-x-5">
          <div className="flex-1 rounded-3xl border-2 border-primary bg-primary/5 p-4 mb-2">
            <h1 className="mb-4">Total Attendance</h1>
            <p className="text-primary">150</p>
          </div>
          <div className="flex-1 rounded-3xl border-2 border-softRed bg-softRed/5 p-4 mb-2">
            <h1 className="mb-4">Total Absence</h1>
            <p className="text-softRed">2</p>
          </div>
          <div className="flex-1 rounded-3xl border-2 border-limeGreen bg-limeGreen/10 p-4 mb-2">
            <h1 className="mb-4">Total Leave</h1>
            <p className="text-limeGreen">4</p>
          </div>
          <div className="flex-1 rounded-3xl border-2 border-lavender bg-lavender/10 p-4 mb-2">
            <h1 className="mb-4">Early Departure</h1>
            <p className="text-lavender">10</p>
          </div>
        </div>
        <div className="m-4 mb-4 mt-8 flex flex-col items-start justify-between gap-4 md:flex-row">
          <div className="flex w-full flex-col gap-4 rounded-xl bg-bgPrimary p-4 md:w-1/2">
            <h1 className="text-2xl font-semibold">Attendance</h1>
            <div className="space-y-4">
              {tenItmes.map((_, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-l-8 border-borderPrimary border-l-primary p-4"
                >
                  <h2 className="text-xl font-semibold">
                    10 May 2024 (Wednesday)
                  </h2>
                  <div className="mt-2 flex justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div className="w-fit rounded-xl bg-primary/5 p-2">
                        <FiLogIn className="text-primary" />
                      </div>
                      <div className="text-xl">07:00 am</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-fit rounded-xl bg-primary/5 p-2">
                        <FiLogOut className="text-primary" />
                      </div>
                      <div className="text-xl">02:00 pm</div>
                    </div>
                    <div></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center gap-1">
              <div>Show more </div>
              <div className="mt-[2px]">
                <AiOutlineDown size={20} />{" "}
              </div>
            </div>
          </div>

          <div className="w-full">
            <div className="mb-4 rounded-xl bg-bgPrimary p-4">
              <h1 className="mb-4 text-2xl font-semibold">Absence</h1>
              {threeItmes.map((_, index) => (
                <div
                  key={index}
                  className="my-2 mb-4 rounded-xl border border-l-8 border-borderPrimary border-l-bgGray p-4"
                >
                  <h2 className="text-xl font-semibold">
                    10 May 2024 (Wednesday)
                  </h2>
                  <div className="mt-2 flex justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div className="w-fit rounded-xl bg-bgGray p-2">
                        <FiLogIn className="text-textSecondary " />
                      </div>
                      <div className="text-xl">07:00 am</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-fit rounded-xl bg-bgGray p-2">
                        <FiLogOut className="text-textSecondary " />
                      </div>
                      <div className="text-xl">02:00 pm</div>
                    </div>
                    <div></div>
                  </div>
                </div>
              ))}
              <div className="flex justify-center gap-1">
                <div>Show more </div>
                <div className="mt-[2px]">
                  <AiOutlineDown size={20} />{" "}
                </div>
              </div>
            </div>
            <div className="mb-4 rounded-xl bg-bgPrimary p-4">
              <h1 className="mb-4 text-2xl font-semibold">Leave</h1>

              <div className="rounded-xl border border-l-8 border-borderPrimary border-l-primary p-4">
                <h2 className="text-xl font-semibold">
                  11 May 2024 - 14 May 2024 (Saturday - Tuesday )
                </h2>
                <div className="mt-2 flex justify-between gap-2">
                  <div>
                    <div>Apply Days</div>
                    <div>4 Days</div>
                  </div>
                  <div>
                    <div>Apply Days</div>
                    <div>4 Days</div>
                  </div>
                  <div></div>
                </div>
              </div>
              <div className="mt-4 flex justify-center gap-1">
                <div>Show more </div>
                <div className="mt-[2px]">
                  <AiOutlineDown size={20} />{" "}
                </div>
              </div>
            </div>

            <div className="mb-4 rounded-xl bg-bgPrimary p-4">
              <h1 className="mb-4 text-2xl font-semibold">Early Departure</h1>

              {threeItmes.map((_, index) => (
                <div
                  key={index}
                  className="mb-4 rounded-xl border border-l-8 border-borderPrimary border-l-primary p-4"
                >
                  <h2 className="text-xl font-semibold">
                    10 May 2024 (Wednesday)
                  </h2>
                  <div className="mt-2 flex justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div className="w-fit rounded-xl bg-primary/5 p-2">
                        <FiLogIn className="text-primary" />
                      </div>
                      <div className="text-xl">09:00 am</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-fit rounded-xl bg-softRed/5 p-2">
                        <FiLogOut className="text-softRed" />
                      </div>
                      <div className="text-xl">02:00 pm</div>
                    </div>
                    <div></div>
                  </div>
                </div>
              ))}
              <div className="mt-4 flex justify-center gap-1">
                <div>Show more </div>
                <div className="mt-[2px]">
                  <AiOutlineDown size={20} />{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Attendance;
