/* eslint-disable @next/next/no-img-element */
import Button from "~/_components/Button";
import Container from "~/_components/Container";

const Grades = () => {
  return (
    <Container>
      <div className="flex w-full items-center justify-between gap-10">
        <div className="flex w-[300px]">
          <select
            className="flex w-full items-center gap-3 whitespace-nowrap rounded-lg bg-bgPrimary px-6 py-4 font-semibold outline-none duration-200 ease-in hover:shadow-lg"
            name=""
            id=""
          >
            <option value="">Select Exam</option>
          </select>
        </div>

        <div className="flex w-[300px]">
          <Button>
            <svg
              className="h-6 w-6"
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
            Add Grades
          </Button>
        </div>
      </div>

      <div className="mt-10 flex h-full w-full items-center justify-center">
        <img src="/images/exam.png" alt="#" />
      </div>
    </Container>
  );
};

export default Grades;
