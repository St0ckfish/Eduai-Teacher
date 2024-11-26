"use client";

import Link from "next/link";
import Container from "~/_components/Container";
import { Text } from "~/_components/Text";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { useState } from "react";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { GrDocumentPdf } from "react-icons/gr";

const Textbooks = () => {
  const [selectedGrade, setSelectedGrade] = useState<string>("grade-1");
  const [expandedChapters, setExpandedChapters] = useState<Set<string>>(
    new Set(),
  );
  const [expandedLessons, setExpandedLessons] = useState<Set<string>>(
    new Set(),
  );

  const grades = [
    {
      value: "grade-1",
      label: "Grade 1",
      chapters: [
        {
          value: "chapter-1",
          label: "Ancient Civilizations",
          lessons: [
            {
              value: "lesson-1",
              label: "Egyptian Civilization",
              files: [
                "files/lesson-1/EgyptianCivilization.pdf",
                "files/lesson-1/EgyptianCivilization2.pdf",
              ],
            },
            {
              value: "lesson-2",
              label: "Mesopotamian Civilization",
              files: [
                "files/lesson-2/MesopotamianCivilization.pdf",
                "files/lesson-2/MesopotamianCivilization2.pdf",
              ],
            },
          ],
        },
        {
          value: "chapter-2",
          label: "Middle Ages",
          lessons: [
            {
              value: "lesson-3",
              label: "Feudal System",
              files: [
                "files/lesson-3/FeudalSystem.pdf",
                "files/lesson-3/FeudalSystem2.pdf",
              ],
            },
          ],
        },
      ],
    },
    {
      value: "grade-2",
      label: "Grade 2",
      chapters: [
        {
          value: "chapter-1",
          label: "Renaissance",
          lessons: [
            {
              value: "lesson-1",
              label: "Leonardo da Vinci",
              files: [
                "files/lesson-1/LeonardoDaVinci.pdf",
                "files/lesson-1/LeonardoDaVinci2.pdf",
              ],
            },
          ],
        },
        {
          value: "chapter-2",
          label: "World Wars",
          lessons: [
            {
              value: "lesson-2",
              label: "World War I",
              files: [
                "files/lesson-2/WorldWarI.pdf",
                "files/lesson-2/WorldWarI2.pdf",
              ],
            },
            {
              value: "lesson-3",
              label: "World War II",
              files: [
                "files/lesson-3/WorldWarII.pdf",
                "files/lesson-3/WorldWarII2.pdf",
              ],
            },
          ],
        },
      ],
    },
    {
      value: "grade-3",
      label: "Grade 3",
      chapters: [
        {
          value: "chapter-1",
          label: "Modern History",
          lessons: [
            {
              value: "lesson-1",
              label: "The Industrial Revolution",
              files: [
                "files/lesson-1/TheIndustrialRevolution.pdf",
                "files/lesson-1/TheIndustrialRevolution2.pdf",
              ],
            },
            {
              value: "lesson-2",
              label: "French Revolution",
              files: [
                "files/lesson-2/FrenchRevolution.pdf",
                "files/lesson-2/FrenchRevolution2.pdf",
              ],
            },
          ],
        },
        {
          value: "chapter-2",
          label: "Contemporary History",
          lessons: [
            {
              value: "lesson-3",
              label: "Cold War",
              files: [
                "files/lesson-3/ColdWar.pdf",
                "files/lesson-3/ColdWar2.pdf",
              ],
            },
          ],
        },
      ],
    },
    {
      value: "grade-4",
      label: "Grade 4",
      chapters: [
        {
          value: "chapter-1",
          label: "Modern Global Events",
          lessons: [
            {
              value: "lesson-1",
              label: "Globalization",
              files: [
                "files/lesson-1/Globalization.pdf",
                "files/lesson-1/Globalization2.pdf",
              ],
            },
            {
              value: "lesson-2",
              label: "Technological Advancements",
              files: [
                "files/lesson-2/TechnologicalAdvancements.pdf",
                "files/lesson-2/TechnologicalAdvancements2.pdf",
              ],
            },
          ],
        },
        {
          value: "chapter-2",
          label: "Global Conflicts",
          lessons: [
            {
              value: "lesson-3",
              label: "Middle East Conflicts",
              files: [
                "files/lesson-3/MiddleEastConflicts.pdf",
                "files/lesson-3/MiddleEastConflicts2.pdf",
              ],
            },
          ],
        },
      ],
    },
  ];

  const handleGradeChange = (gradeValue: string) => {
    setSelectedGrade(gradeValue);

    // Reset the expanded state for chapters and lessons when changing grade
    setExpandedChapters(new Set());
    setExpandedLessons(new Set());
  };

  const handleChapterToggle = (chapterValue: string) => {
    const updatedChapters = new Set(expandedChapters);
    if (updatedChapters.has(chapterValue)) {
      updatedChapters.delete(chapterValue);
    } else {
      updatedChapters.add(chapterValue);
    }
    setExpandedChapters(updatedChapters);
  };

  const handleLessonToggle = (lessonValue: string) => {
    const updatedLessons = new Set(expandedLessons);
    if (updatedLessons.has(lessonValue)) {
      updatedLessons.delete(lessonValue);
    } else {
      updatedLessons.add(lessonValue);
    }
    setExpandedLessons(updatedLessons);
  };

  const selectedGradeChapters =
    grades.find((grade) => grade.value === selectedGrade)?.chapters || [];

  return (
    <Container>
      {/* Language Links Section */}
      <div className="flex w-full flex-wrap items-center justify-start gap-5">
        <Link
          href="/textbooks/"
          className="grid gap-2 rounded-xl border border-primary bg-bgPrimary p-6"
        >
          <Text font="bold" size="2xl">
            English
          </Text>
          <div className="flex gap-2">
            <Text color="primary">4</Text>
            <Text>Number of grades</Text>
          </div>
        </Link>
        <Link
          href="/textbooks/french"
          className="grid gap-2 rounded-xl bg-bgPrimary p-6"
        >
          <Text font="bold" size="2xl">
            French
          </Text>
          <div className="flex gap-2">
            <Text color="primary">2</Text>
            <Text>Number of grades</Text>
          </div>
        </Link>
      </div>

      <div className="mt-10 flex w-full justify-start gap-8 rounded-xl bg-bgPrimary p-8">
        {/* Grades Selection Section */}
        <div className="w-1/5">
          <RadioGroup.Root
            className="gap-4"
            value={selectedGrade}
            onValueChange={handleGradeChange}
            aria-label="Grade Selection"
          >
            {grades.map(({ value, label }) => (
              <RadioGroup.Item
                key={value}
                value={value}
                className="group mt-1 flex h-20 w-full flex-col justify-center rounded-l-2xl bg-lightGray px-4 text-center text-textPrimary transition hover:border-primary hover:text-primary focus-visible:ring focus-visible:ring-blue-200 focus-visible:ring-opacity-75 data-[state=checked]:border-primary data-[state=checked]:bg-primary"
                aria-labelledby={`${value}-label`}
              >
                <span
                  id={`${value}-label`}
                  className="text-xl font-semibold group-data-[state=checked]:text-white"
                >
                  {label}
                </span>
              </RadioGroup.Item>
            ))}
          </RadioGroup.Root>
        </div>

        {/* Chapters Section */}
        <div className="w-4/5">
          {selectedGradeChapters.map((chapter, index) => (
            <div key={chapter.value} className="mb-6">
              <div className="flex items-center justify-between">
                <Text font="bold" size="xl">
                  Chapter {index + 1}: {chapter.label}
                </Text>
                <button onClick={() => handleChapterToggle(chapter.value)}>
                  {expandedChapters.has(chapter.value) ? (
                    <AiOutlineMinus size={25} className="text-primary" />
                  ) : (
                    <AiOutlinePlus size={25} className="text-primary" />
                  )}
                </button>
              </div>

              {/* Display chapter content if expanded */}
              {expandedChapters.has(chapter.value) && (
                <ul className="mt-2">
                  {chapter.lessons.map((lesson, index) => (
                    <li
                      key={lesson.value}
                      className="my-6 text-xl font-light text-textPrimary"
                    >
                      <div className="flex items-center justify-between">
                        <Text>
                          Lesson {index + 1}: {lesson.label}
                        </Text>
                        <button
                          onClick={() => handleLessonToggle(lesson.value)}
                        >
                          {expandedLessons.has(lesson.value) ? (
                            <IoIosArrowUp size={25} />
                          ) : (
                            <IoIosArrowDown size={25} />
                          )}
                        </button>
                      </div>

                      {/* Display lesson content if expanded */}
                      {expandedLessons.has(lesson.value) && (
                        <ul className="list-square mt-2">
                          {lesson.files.map((file, index) => (
                            <li key={index} className="mt-2">
                              <a
                                href={file}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex w-1/4 items-center gap-2 rounded-lg border border-borderPrimary bg-bgPrimary p-3 text-textPrimary transition hover:bg-bgSecondary"
                              >
                                <GrDocumentPdf size={25} />
                                <div className="mx-2">
                                  <Text>{file.split("/").pop()}</Text>
                                  <Text>2m ago</Text>
                                </div>
                              </a>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default Textbooks;
