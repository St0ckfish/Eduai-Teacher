"use client";
import Container from "~/_components/Container";
import { Text } from "~/_components/Text";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { useState } from "react";
import Button from "~/_components/Button";

const Exercises = () => {
  const questions = [
    { number: "A", value: "hope" },
    { number: "B", value: "hopes" },
    { number: "C", value: "hoped" },
    { number: "D", value: "have hoped" },
  ];

  const [selectedQuestion, setSelectedQuestion] = useState<string>("");

  const handleChangeQuestion = (value: string) => {
    setSelectedQuestion(value);
  };

  return (
    <Container>
      <div className="flex justify-center">
        <div className="mt-8 w-2/3 rounded-xl bg-bgPrimary p-4">
          {/* Question Section */}
          <div className="flex flex-col justify-center rounded-xl border-2 border-borderPrimary px-4 py-6">
            <Text font="semiBold" size="2xl">
              1. Choose the correct form of the verb for the given sentence:
            </Text>
            <Text font="semiBold" size="2xl" className="mt-2">
              &quot;Every one of the students ____ to pass the exam.&quot;
            </Text>
          </div>

          {/* Choices Section */}
          <RadioGroup.Root
            className="my-4 flex flex-col space-y-4"
            value={selectedQuestion}
            onValueChange={handleChangeQuestion}
            aria-labelledby="question-label"
          >
            {questions.map(({ value, number }) => (
              <RadioGroup.Item
                key={number}
                value={number}
                className="group flex h-16 items-center justify-between rounded-lg border border-borderPrimary px-4 transition hover:border-primary hover:text-primary focus-visible:ring focus-visible:ring-blue-200 focus-visible:ring-opacity-75 data-[state=checked]:border-primary data-[state=checked]:text-primary"
                aria-label={`Option ${number}: ${value}`}
                id={`option-${number}`}
              >
                <p className="text-xl font-semibold group-data-[state=checked]:text-primary">
                  {number}. {value}
                </p>
                <div className="relative h-6 w-6 rounded-full border-2 border-borderPrimary group-data-[state=checked]:border-primary">
                  <div className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-bgPrimary group-data-[state=checked]:bg-primary"></div>
                </div>
              </RadioGroup.Item>
            ))}
          </RadioGroup.Root>

          {/* Explanation Section */}
          <Text font={"semiBold"} size={"2xl"}>
            Explanation:
          </Text>
          <textarea
            id="area"
            placeholder="Write an Explanation"
            className="mt-4 w-full rounded-lg border border-borderPrimary bg-bgPrimary px-4 pb-12 pt-4 text-lg text-textPrimary outline-none transition duration-200 ease-in placeholder:text-textSecondary"
          ></textarea>
          <div className="mt-8 flex gap-5">
            <Button theme="outline" color="error">
              End Exercises
            </Button>
            <Button>Next Question</Button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Exercises;
