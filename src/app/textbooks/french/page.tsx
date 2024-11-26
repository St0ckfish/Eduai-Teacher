'use client';

import Link from "next/link";
import Container from "~/_components/Container";
import { Text } from "~/_components/Text";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { useState } from "react";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { GrDocumentPdf } from "react-icons/gr";


const French = () => {
  const [selectedGrade, setSelectedGrade] = useState<string>("grade-1");
  const [expandedChapters, setExpandedChapters] = useState<Set<string>>(new Set());
  const [expandedLessons, setExpandedLessons] = useState<Set<string>>(new Set());

  const grades = [
    {
      value: "grade-1",
      label: "Grade 1",
      chapters: [
        {
          value: "chapter-1",
          label: "Civilisations Anciennes",
          lessons: [
            {
              value: "lesson-1",
              label: "Civilisation Égyptienne",
              files: [
                "files/lesson-1/CivilisationEgyptienne.pdf",
                "files/lesson-1/CivilisationEgyptienne2.pdf",
              ],
            },
            {
              value: "lesson-2",
              label: "Civilisation Mésopotamienne",
              files: [
                "files/lesson-2/CivilisationMesopotamienne.pdf",
                "files/lesson-2/CivilisationMesopotamienne2.pdf",
              ],
            },
          ],
        },
        {
          value: "chapter-2",
          label: "Moyen Âge",
          lessons: [
            {
              value: "lesson-3",
              label: "Système Féodal",
              files: [
                "files/lesson-3/SystemeFeodal.pdf",
                "files/lesson-3/SystemeFeodal2.pdf",
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
              label: "Léonard de Vinci",
              files: [
                "files/lesson-1/LeonardDeVinci.pdf",
                "files/lesson-1/LeonardDeVinci2.pdf",
              ],
            },
          ],
        },
        {
          value: "chapter-2",
          label: "Guerres Mondiales",
          lessons: [
            {
              value: "lesson-2",
              label: "Première Guerre Mondiale",
              files: [
                "files/lesson-2/PremiereGuerreMondiale.pdf",
                "files/lesson-2/PremiereGuerreMondiale2.pdf",
              ],
            },
            {
              value: "lesson-3",
              label: "Seconde Guerre Mondiale",
              files: [
                "files/lesson-3/SecondeGuerreMondiale.pdf",
                "files/lesson-3/SecondeGuerreMondiale2.pdf",
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
          label: "Histoire Moderne",
          lessons: [
            {
              value: "lesson-1",
              label: "Révolution Industrielle",
              files: [
                "files/lesson-1/RevolutionIndustrielle.pdf",
                "files/lesson-1/RevolutionIndustrielle2.pdf",
              ],
            },
            {
              value: "lesson-2",
              label: "Révolution Française",
              files: [
                "files/lesson-2/RevolutionFrancaise.pdf",
                "files/lesson-2/RevolutionFrancaise2.pdf",
              ],
            },
          ],
        },
        {
          value: "chapter-2",
          label: "Histoire Contemporaine",
          lessons: [
            {
              value: "lesson-3",
              label: "Guerre Froide",
              files: [
                "files/lesson-3/GuerreFroide.pdf",
                "files/lesson-3/GuerreFroide2.pdf",
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
          label: "Événements Mondiaux Modernes",
          lessons: [
            {
              value: "lesson-1",
              label: "Mondialisation",
              files: [
                "files/lesson-1/Mondialisation.pdf",
                "files/lesson-1/Mondialisation2.pdf",
              ],
            },
            {
              value: "lesson-2",
              label: "Avancées Technologiques",
              files: [
                "files/lesson-2/AvanceesTechnologiques.pdf",
                "files/lesson-2/AvanceesTechnologiques2.pdf",
              ],
            },
          ],
        },
        {
          value: "chapter-2",
          label: "Conflits Mondiaux",
          lessons: [
            {
              value: "lesson-3",
              label: "Conflits au Moyen-Orient",
              files: [
                "files/lesson-3/ConflitsMoyenOrient.pdf",
                "files/lesson-3/ConflitsMoyenOrient2.pdf",
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
      <div className="flex w-full items-center justify-start gap-5">
        <Link href="/textbooks/" className="grid gap-2 rounded-xl bg-bgPrimary p-6">
          <Text font={"bold"} size={"2xl"}>English</Text>
          <div className="flex gap-2">
            <Text color={"primary"}>4</Text>
            <Text>Number of grades</Text>
          </div>
        </Link>
        <Link
          href="/textbooks/french"
          className="grid gap-2 rounded-xl border border-primary bg-bgPrimary p-6"
        >
          <Text font={"bold"} size={"2xl"}>French</Text>
          <div className="flex gap-2">
            <Text color={"primary"}>2</Text>
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
                        <button onClick={() => handleLessonToggle(lesson.value)}>
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

export default French;
