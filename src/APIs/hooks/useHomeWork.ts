import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type {
  UseQueryOptions,
  UseMutationOptions,
} from "@tanstack/react-query";
import {
  fetchAllHomeWork,
  deleteSession,
} from "../features/homeWork";
import type { HomeworkResponse } from "../../types";

export const useGetAllHomeWorks = (
  sessionId: number,
  options?: UseQueryOptions<HomeworkResponse, Error>,
) => {
  return useQuery<HomeworkResponse, Error>({
    queryKey: ["homework", sessionId],
    queryFn: () => fetchAllHomeWork(sessionId),
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