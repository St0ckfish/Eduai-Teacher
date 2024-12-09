import { useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import type {
  UseMutationOptions,
  UseQueryOptions,
} from "@tanstack/react-query";
import type { AttendanceNumbersResponse, AttendanceResponse, LeaveAttendanceResponse } from "../../types";
import { fetchAllAbsentAttendance, fetchAllAttendanceNumbers, fetchAllEarlyAttendance, fetchAllLeavesAttendance, recordAttendance } from "../features/attendance";

export const useGetAllAttendances = (
  options?: UseQueryOptions<AttendanceResponse, Error>,
) => {
  return useQuery<AttendanceResponse, Error>({
    queryKey: ["attendance"],
    queryFn: () => fetchAllAbsentAttendance(),
    staleTime: 1000 * 60 * 5,
    ...options,
  });
};

export const useGetAllEarlyAttendances = (
  options?: UseQueryOptions<AttendanceResponse, Error>,
) => {
  return useQuery<AttendanceResponse, Error>({
    queryKey: ["attendanceEarly"],
    queryFn: () => fetchAllEarlyAttendance(),
    staleTime: 1000 * 60 * 5,
    ...options,
  });
};
export const useGetAllLeavesAttendances = (
  options?: UseQueryOptions<LeaveAttendanceResponse, Error>,
) => {
  return useQuery<LeaveAttendanceResponse, Error>({
    queryKey: ["attendanceLeaves"],
    queryFn: () => fetchAllLeavesAttendance(),
    staleTime: 1000 * 60 * 5,
    ...options,
  });
};

export const useGetAllAttendanceNumbers = (
  options?: UseQueryOptions<AttendanceNumbersResponse, Error>,
) => {
  return useQuery<AttendanceNumbersResponse, Error>({
    queryKey: ["attendanceNumbers"],
    queryFn: () => fetchAllAttendanceNumbers(),
    staleTime: 1000 * 60 * 5,
    ...options,
  });
};
export const useRecordAttendance = (
  options?: UseMutationOptions<any, Error, Partial<any>>,
) => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, Partial<any>>({
    mutationFn: recordAttendance,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["recordAttendance"] });
    },
    ...options,
  });
};