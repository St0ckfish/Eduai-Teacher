import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type {
  UseQueryOptions,
  UseMutationOptions,
} from "@tanstack/react-query";
import {
  fetchAllAdvices,
  deleteAdvice,
  createAdvice,
  fetchAdviceById,
  updateAdvice,
} from "../features/advice";
import type { Advice, PaginatedAdvices } from "../../types";

export const useGetAllAdvices = (
  params: { page: number; limit: number; categoryId?: number },
  options?: UseQueryOptions<PaginatedAdvices, Error>,
) => {
  return useQuery<PaginatedAdvices, Error>({
    queryKey: ["advices", params],
    queryFn: () => fetchAllAdvices(params),
    staleTime: 1000 * 60 * 5,
    ...options,
  });
};

//
export const useDeleteAdvice = (
  options?: UseMutationOptions<{ message: string }, Error, number>,
) => {
  const queryClient = useQueryClient();
  return useMutation<{ message: string }, Error, number>({
    mutationFn: deleteAdvice,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["advices"] });
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
