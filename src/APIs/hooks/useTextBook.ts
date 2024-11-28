import { useQuery} from "@tanstack/react-query";
import type {
  UseQueryOptions,
} from "@tanstack/react-query";
import type { LessonPageResponse, StudyStageResponse, SubjectSummaryResponse } from "../../types";
import { fetchAllTextBookSummary, fetchLessonsByCourseId, fetchStudyStageBySubject } from "../features/textBook";

export const useGetAllTextBookSummarys = (
  options?: UseQueryOptions<SubjectSummaryResponse, Error>,
) => {
  return useQuery<SubjectSummaryResponse, Error>({
    queryKey: ["textBookSummary"],
    queryFn: () => fetchAllTextBookSummary(),
    staleTime: 1000 * 60 * 5,
    ...options,
  });
};

export const useGetStudyStageBySubject = (
    subject: string,
    options?: UseQueryOptions<StudyStageResponse, Error>,
  ) => {
    return useQuery<StudyStageResponse, Error>({
      queryKey: ["studyStage", subject],
      queryFn: () => fetchStudyStageBySubject(subject),
      enabled: !!subject,
      ...options,
    });
  };

export const useGetLessonsByCourseId = (
    courseId: number,
    options?: UseQueryOptions<LessonPageResponse, Error>,
  ) => {
    return useQuery<LessonPageResponse, Error>({
      queryKey: ["lessons", courseId],
      queryFn: () => fetchLessonsByCourseId(courseId),
      enabled: !!courseId,
      ...options,
    });
  };