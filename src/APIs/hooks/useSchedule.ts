import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type {
  UseQueryOptions,
  UseMutationOptions,
} from "@tanstack/react-query";
import {
  fetchAllSchedule,
  deleteSession,
  createAdvice,
  fetchAdviceById,
  updateAdvice,
} from "../features/schedule";
import type { Advice, TeacherScheduleResponse } from "../../types";

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

//
export const useCreateAdvice = (
  options?: UseMutationOptions<Advice, Error, Partial<Advice>>,
) => {
  const queryClient = useQueryClient();
  return useMutation<Advice, Error, Partial<Advice>>({
    mutationFn: createAdvice,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["advices"] });
    },
    ...options,
  });
};

//
export const useGetAdviceById = (
  id: number | undefined,
  options?: UseQueryOptions<Advice, Error>,
) => {
  return useQuery<Advice, Error>({
    queryKey: ["advice", id],
    queryFn: () => fetchAdviceById(id!),
    enabled: !!id,
    ...options,
  });
};

//
export const useUpdateAdvice = (
  options?: UseMutationOptions<
    Advice,
    Error,
    { formData: Partial<Advice>; id: number }
  >,
) => {
  const queryClient = useQueryClient();
  return useMutation<Advice, Error, { formData: Partial<Advice>; id: number }>({
    mutationFn: updateAdvice,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["advices"] });
    },
    ...options,
  });
};
