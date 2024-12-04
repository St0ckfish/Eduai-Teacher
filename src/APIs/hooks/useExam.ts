import { useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import type {
  UseMutationOptions,
  UseQueryOptions,
} from "@tanstack/react-query";
import type { ExamFormData, ExamListResponse, ExamResultsResponse, Upcoming_Previous_Exams } from "../../types";
import { createExam, fetchAllExams, fetchAllPreviousExams, fetchAllUpcomingExams, fetchExamResults, putGrade } from "../features/exam";

export const useGetAllExams = (
  options?: UseQueryOptions<ExamListResponse, Error>,
) => {
  return useQuery<ExamListResponse, Error>({
    queryKey: ["exams"],
    queryFn: () => fetchAllExams(),
    staleTime: 1000 * 60 * 5,
    ...options,
  });
};



export const useGetAllUpcomingExams = (
  options?: UseQueryOptions<Upcoming_Previous_Exams, Error>,
) => {
  return useQuery<Upcoming_Previous_Exams, Error>({
    queryKey: ["upcoming"],
    queryFn: () => fetchAllUpcomingExams(),
    staleTime: 1000 * 60 * 5,
    ...options,
  });
};
export const useGetAllPreviousExams = (
  options?: UseQueryOptions<Upcoming_Previous_Exams, Error>,
) => {
  return useQuery<Upcoming_Previous_Exams, Error>({
    queryKey: ["previous"],
    queryFn: () => fetchAllPreviousExams(),
    staleTime: 1000 * 60 * 5,
    ...options,
  });
};

export const useCreateExam = (
  options?: UseMutationOptions<ExamFormData, Error, Partial<ExamFormData>>,
) => {
  const queryClient = useQueryClient();
  return useMutation<ExamFormData, Error, Partial<ExamFormData>>({
    mutationFn: createExam,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["createExam"] });
    },
    ...options,
  });
};

export const useGetExamResults = (
  examId: string,
  options?: UseQueryOptions<ExamResultsResponse, Error>
) => {
  return useQuery<ExamResultsResponse, Error>({
    queryKey: ["examResults", examId],
    queryFn: () => fetchExamResults(examId),
    ...options,
  });
};

export const usePutGrade = (
  options?: UseMutationOptions<any, Error, { examResultId: string; scoreData: { score: number; scoreDate: string } }>
) => {
  return useMutation({
    mutationFn: ({ examResultId, scoreData }) => putGrade(examResultId, scoreData),
    ...options,
  });
};