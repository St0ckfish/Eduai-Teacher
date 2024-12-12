"use client";
import { Text } from "~/_components/Text";
import { useState, useEffect } from "react";
import Spinner from "~/_components/Spinner";
import { GrDocumentPdf } from "react-icons/gr";
import Container from "~/_components/Container";
import type { StudyStage, SubjectSummary } from "~/types";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import {
  useGetAllTextBookSummarys,
  useGetLessonsByCourseId,
  useGetLessonTopics,
  useGetStudyStageBySubject,
} from "~/APIs/hooks/useTextBook";
import { AiOutlinePlus } from "react-icons/ai";

const Textbooks = () => {
  const [openedLessonId, setOpenedLessonId] = useState<string | null>(null);
  const [openedTopicId, setOpenedTopicId] = useState<string | null>(null); 
  const [isOpenLesson, setIsOpenLesson] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null);

  const { data: summary, isLoading: isSummary } = useGetAllTextBookSummarys();
  const { data: stages, isLoading: isStages } = useGetStudyStageBySubject(
    selectedSubject?.toUpperCase() ?? "",
  );
  const { data: lessons, isLoading: isLessons } = useGetLessonsByCourseId(
    selectedCourseId ?? 0,
  );
  const { data: lessonTopics, isLoading: isLessonTopicsLoading } =
    useGetLessonTopics(openedLessonId ?? "");
  console.log(lessonTopics);

  useEffect(() => {
    if (summary?.data?.[0]?.subject && !selectedSubject) {
      setSelectedSubject(summary.data[0].subject);
    }
  }, [selectedSubject, summary]);

  useEffect(() => {
    if (
      stages?.data &&
      stages.data.length > 0 &&
      stages.data[0]?.courseId &&
      !selectedCourseId
    ) {
      setSelectedCourseId(stages.data[0].courseId);
    }
  }, [stages, selectedCourseId]);

  const handleSubjectSelect = (subject: string) => {
    setSelectedSubject(subject);
    setSelectedCourseId(null);
  };

  const handleCourseIdChange = (courseId: string) => {
    setSelectedCourseId(Number(courseId));
  };

  const handleClickLesson = (lessonId: string) => {
    if (openedLessonId === lessonId.toString()) {
      setOpenedLessonId(null);
    } else {
      setOpenedLessonId(lessonId.toString());
    }
  };

  const handleTopicClick = (topicId: string) => {
    setOpenedTopicId((prevTopicId) =>
      prevTopicId === topicId ? null : topicId,
    );
  };

  return (
    <Container>
      {isSummary ? (
        <div className="flex w-full justify-center">
          <Spinner />
        </div>
      ) : (
        <div className="flex w-full flex-wrap items-center justify-start gap-5">
          {summary?.data.map((subject: SubjectSummary, idx) => (
            <button
              key={idx}
              onClick={() => handleSubjectSelect(subject.subject)}
              className={`grid gap-2 rounded-xl border ${
                selectedSubject === subject.subject
                  ? "border-2 border-primary bg-bgPrimary"
                  : "bg-bgPrimary"
              } p-6`}
            >
              <Text
                font="bold"
                size="2xl"
                color={
                  selectedSubject === subject.subject ? "white" : "default"
                }
              >
                {subject.subject}
              </Text>
              <div className="flex gap-2">
                <Text
                  color={
                    selectedSubject === subject.subject ? "white" : "primary"
                  }
                >
                  {subject.numberOfGrades}
                </Text>
                <Text
                  color={
                    selectedSubject === subject.subject ? "white" : "default"
                  }
                >
                  Number of grades
                </Text>
              </div>
            </button>
          ))}
        </div>
      )}

      <div className="mt-10 flex w-full justify-start gap-8 rounded-xl bg-bgPrimary p-8">
        <div className="w-1/5">
          {isStages ? (
            <div className="flex w-full justify-center">
              <Spinner />
            </div>
          ) : (
            <RadioGroup.Root
              className="gap-4"
              value={selectedCourseId?.toString() ?? ""}
              onValueChange={handleCourseIdChange}
              aria-label="Grade Selection"
            >
              {stages?.data.map((stage: StudyStage) => (
                <RadioGroup.Item
                  key={stage.courseId}
                  value={stage.courseId.toString()}
                  className="group mt-1 flex h-20 w-full flex-col justify-center rounded-l-2xl bg-lightGray px-4 text-center text-textPrimary transition hover:border-primary hover:text-primary focus-visible:ring focus-visible:ring-blue-200 focus-visible:ring-opacity-75 data-[state=checked]:border-primary data-[state=checked]:bg-primary"
                  aria-labelledby={`${stage.studyLevel}-label`}
                >
                  <span
                    id={`${stage.studyLevel}-label`}
                    className="text-xl font-semibold group-data-[state=checked]:text-white"
                  >
                    {stage.studyLevel}
                  </span>
                </RadioGroup.Item>
              ))}
            </RadioGroup.Root>
          )}
        </div>
        <div className="w-4/5">
          {lessons?.data?.content.map((lesson, index) => (
            <div key={lesson.lessonId}>
              <div
                onClick={() => handleClickLesson(lesson.lessonId.toString())}
                className="my-4 flex cursor-pointer items-center justify-between"
              >
                <Text font={"bold"} size={"xl"}>
                  Chapter {index + 1}: {lesson.lessonName}
                </Text>
                <div className="w-fit">
                  <AiOutlinePlus size={25} className="text-primary" />
                </div>
              </div>

              {openedLessonId === lesson.lessonId.toString() && (
                <div className="pl-4">
                  {isLessonTopicsLoading ? (
                    <Spinner />
                  ) : (
                    lessonTopics?.data?.content.map((topic, idx) => (
                      <div key={topic.topicId} className="py-4">
                        <div
                          className="flex cursor-pointer items-center justify-between"
                          onClick={() =>
                            handleTopicClick(topic.topicId.toString())
                          }
                        >
                          <Text size={"xl"}>
                            Lesson {idx + 1}: {topic.topicName}
                          </Text>
                          {openedTopicId === topic.topicId.toString() ? (
                            <IoIosArrowUp size={20} className="text-primary" />
                          ) : (
                            <IoIosArrowDown
                              size={20}
                              className="text-primary"
                            />
                          )}
                        </div>

                        {openedTopicId === topic.topicId.toString() && (
                          <div className="mt-4">
                            {topic.hasFile ? (
                              <div className="mt-2">
                                <Text font={"medium"} color={"primary"}>
                                  <a
                                    href={topic.fileLink || ""}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex w-1/4 items-center justify-start gap-3 rounded-lg border border-borderPrimary bg-bgPrimary p-3 text-textPrimary transition hover:bg-bgSecondary"
                                  >
                                    <GrDocumentPdf size={25} />
                                    Download file
                                  </a>
                                </Text>
                              </div>
                            ) : (
                              <div className="mt-2">
                                <Text font={"medium"} color={"default"}>
                                  There is no files
                                </Text>
                              </div>
                            )}

                            {/* {topic.videoUrls.length > 0 && (
                            <div className="mt-2">
                              <Text font={"medium"}>Video Links</Text>
                              <ul className="mt-1 list-disc pl-5">
                                {topic.videoUrls.map((url, index) => (
                                  <li key={index}>
                                    <a
                                      href={url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-primary underline"
                                    >
                                      {`${url}`}
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )} */}
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default Textbooks;
