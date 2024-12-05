import axiosInstance from "../axios";
import type { AttendanceNumbersResponse, AttendanceResponse, LeaveAttendanceResponse } from "../../types";

export const fetchAllAbsentAttendance = async (): Promise<AttendanceResponse> => {
    const response = await axiosInstance.get<AttendanceResponse>(
        `/api/v1/teacher-attendance/by-status?semesterId=&status=ABSENT&size=1000000&page=0`
    );
    return response.data;
};
export const fetchAllEarlyAttendance = async (): Promise<AttendanceResponse> => {
    const response = await axiosInstance.get<AttendanceResponse>(
        `/api/v1/teacher-attendance/early-departure?semesterId=&size=1000000&page=0`
    );
    return response.data;
};
export const fetchAllLeavesAttendance = async (): Promise<LeaveAttendanceResponse> => {
    const response = await axiosInstance.get<LeaveAttendanceResponse>(
        `/api/v1/teacher-attendance/leaves?size=1000000&page=0`
    );
    return response.data;
};
export const fetchAllAttendanceNumbers = async (): Promise<AttendanceNumbersResponse> => {
    const response = await axiosInstance.get<AttendanceNumbersResponse>(
        `/api/v1/teacher-attendance/numbers?semesterId=`
    );
    return response.data;
};
export const recordAttendance = async (formData: Partial<any>): Promise<any> => {
    const response = await axiosInstance.post<any>(
      "/api/attendance/record",
      formData,
    );
    return response.data;
  };
  //