/* eslint-disable @next/next/no-img-element */
import Button from "~/_components/Button";
import Container from "~/_components/Container";

const Exam = () => {
  return (
    <Container>
      <div className="flex w-full items-center justify-between gap-7">
        <div className="flex w-[400px] items-center gap-10">
          <Button>Previous Exams</Button>
          <Button theme="outline">Upcoming Exams</Button>
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
            Add Exams
          </Button>
        </div>
      </div>

      <div className="mt-10 flex h-full w-full items-center justify-center">
        <div className="flex w-full overflow-auto rounded-md bg-white p-4">
          <div className="relative w-full overflow-auto sm:rounded-lg">
            <p className="mb-3 font-semibold">Previous Exams</p>
            <table className="w-full overflow-x-auto p-4 text-left text-sm text-black">
              <thead className="bg-thead text-textPrimary text-xs uppercase">
                <tr>
                  <th scope="col" className="whitespace-nowrap px-6 py-3">
                    Title
                  </th>
                  <th scope="col" className="whitespace-nowrap px-6 py-3">
                    Score
                  </th>
                  <th scope="col" className="whitespace-nowrap px-6 py-3">
                    Class
                  </th>
                  <th scope="col" className="whitespace-nowrap px-6 py-3">
                    Exam Type
                  </th>
                  <th scope="col" className="whitespace-nowrap px-6 py-3">
                    Exam Beginning
                  </th>
                  <th scope="col" className="whitespace-nowrap px-6 py-3">
                    Exam Ending
                  </th>
                  <th scope="col" className="whitespace-nowrap px-6 py-3">
                    Exam Date
                  </th>
                </tr>
              </thead>
              <tbody className="rounded-lg">
                <tr className="bg-bgSecondary font-semibold hover:bg-primary hover:text-white">
                  <th
                    scope="row"
                    className="whitespace-nowrap rounded-s-2xl px-6 py-4 font-medium text-textSecondary"
                  >
                    Class 5/2
                  </th>
                  <td className="whitespace-nowrap px-6 py-4">English</td>
                  <td className="whitespace-nowrap px-6 py-4">
                    10:30 am-11:30 am
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">60 min</td>
                  <td className="whitespace-nowrap px-6 py-4">60 min</td>
                  <td className="whitespace-nowrap px-6 py-4">60 min</td>
                  <td className="whitespace-nowrap rounded-e-2xl px-6 py-4">
                    60 min
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Exam;
