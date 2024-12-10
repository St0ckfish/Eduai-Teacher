import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type {
  UseQueryOptions,
  UseMutationOptions,
} from "@tanstack/react-query";
import {
  fetchAllSchedule,
  deleteSession,
  fetchAllSessionAttendance,
  fetchAllSessionMaterial,
  fetchAllSessionExplained,
} from "../features/schedule";
import type {
  SessionAttendanceResponse,
  SessionExplainedResponse,
  SessionMaterialResponse,
  TeacherScheduleResponse,
} from "../../types";

const commonQueryOptions = {
  staleTime: 1000 * 60 * 5,
  retry: false, // Disable retries
  refetchOnWindowFocus: false,
  refetchOnReconnect: false,
  refetchOnMount: false,
};

export const useGetAllSchedules = (
  date: string,
  options?: UseQueryOptions<TeacherScheduleResponse, Error>,
) => {
  return useQuery<TeacherScheduleResponse, Error>({
    queryKey: ["schedule", date],
    queryFn: () => fetchAllSchedule(date),
    ...commonQueryOptions,
    ...options,
  });
};

export const useGetAllSessionAttendance = (
  sessionId: string,
  options?: UseQueryOptions<SessionAttendanceResponse, Error>,
) => {
  return useQuery<SessionAttendanceResponse, Error>({
    queryKey: ["sessionAttendance", sessionId],
    queryFn: () => fetchAllSessionAttendance(sessionId),
    ...commonQueryOptions,
    ...options,
  });
};

export const useGetAllSessionExplained = (
  sessionId: string,
  options?: UseQueryOptions<SessionExplainedResponse, Error>,
) => {
  return useQuery<SessionExplainedResponse, Error>({
    queryKey: ["sessionExplained", sessionId],
    queryFn: () => fetchAllSessionExplained(sessionId),
    ...commonQueryOptions,
    ...options,
  });
};

export const useGetAllSessionMateriale = (
  sessionId: string,
  options?: UseQueryOptions<SessionMaterialResponse, Error>,
) => {
  return useQuery<SessionMaterialResponse, Error>({
    queryKey: ["sessionMaterial", sessionId],
    queryFn: () => fetchAllSessionMaterial(sessionId),
    ...commonQueryOptions,
    ...options,
  });
};

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
