import { useQuery} from "@tanstack/react-query";
import type {
  UseQueryOptions,
} from "@tanstack/react-query";
import type { ExamListResponse, Upcoming_Previous_Exams } from "../../types";
import { fetchAllExams, fetchAllPreviousExams, fetchAllUpcomingExams } from "../features/exam";

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