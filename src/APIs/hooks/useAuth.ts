import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type {
  UseQueryOptions,
  UseMutationOptions,
} from "@tanstack/react-query";
import {
  signUp,
  getAllCounties,
  getAllNationalities,
  getAllSchools,
  getAllRegions,
  login,
} from "../features/auth";
import type { Advice } from "../../types";

export const useGetAllCountries = (options?: UseQueryOptions<unknown>) => {
  return useQuery<unknown>({
    queryKey: ["auth"],
    queryFn: () => getAllCounties(),
    ...options,
  });
};
//
export const useGetAllNationalities = (options?: UseQueryOptions<unknown>) => {
  return useQuery<unknown>({
    queryKey: ["nationalities"],
    queryFn: () => getAllNationalities(),
    ...options,
  });
};
//
export const useGetAllSchools = (options?: UseQueryOptions<unknown>) => {
  return useQuery<unknown>({
    queryKey: ["schools"],
    queryFn: () => getAllSchools(),
    ...options,
  });
};
//
export const useGetAllRegions = (options?: UseQueryOptions<unknown>) => {
  return useQuery<unknown>({
    queryKey: ["regions"],
    queryFn: () => getAllRegions(),
    ...options,
  });
};
//
export const useSignUp = (
  options?: UseMutationOptions<Advice, Error, Partial<Advice>>,
) => {
  const queryClient = useQueryClient();
  return useMutation<Advice, Error, Partial<Advice>>({
    mutationFn: signUp,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["auth"] });
    },
    ...options,
  });
};
//
export const useLogin = (
  options?: UseMutationOptions<Advice, Error, Partial<Advice>>,
) => {
  const queryClient = useQueryClient();
  return useMutation<Advice, Error, Partial<Advice>>({
    mutationFn: login,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["auth"] });
    },
    ...options,
  });
};
