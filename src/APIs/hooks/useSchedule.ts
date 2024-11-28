import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type {
  UseQueryOptions,
  UseMutationOptions,
} from "@tanstack/react-query";
import {
  fetchAllSchedule,
  deleteSession,
} from "../features/schedule";
import type { TeacherScheduleResponse } from "../../types";

export const useGetAllSchedules = (
  date: string,
  options?: UseQueryOptions<TeacherScheduleResponse, Error>,
) => {
  return useQuery<TeacherScheduleResponse, Error>({
    queryKey: ["schedule", date],
    queryFn: () => fetchAllSchedule(date),
    staleTime: 1000 * 60 * 5,
    ...options,
  });
};

//
export const useDeleteSession = (
  options?: UseMutationOptions<{ message: string }, Error, number>,
) => {
  const queryClient = useQueryClient();
  return useMutation<{ message: string }, Error, number>({
    mutationFn: deleteSession,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["deleteSession"] });
    },
    ...options,
  });
};