/* eslint-disable @next/next/no-img-element */
import Button from "~/_components/Button";
import Container from "~/_components/Container";

const Grades = () => {
    return (
        <Container>
            <div className="flex w-full justify-between items-center gap-10">
                <div className="flex w-[300px]">
                    <select className="w-full flex items-center gap-3 outline-none whitespace-nowrap rounded-lg px-6 py-4 font-semibold bg-white hover:shadow-lg duration-200 ease-in" name="" id="">
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

            <div className="flex justify-center items-center h-full w-full mt-10">
                <img src="/images/exam.png" alt="#" />
            </div>
        </Container>
    );
}

export default Grades;