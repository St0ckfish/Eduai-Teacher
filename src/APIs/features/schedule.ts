import axiosInstance from "../axios";
import type { SessionAttendanceResponse, SessionExplainedResponse, SessionMaterialResponse, TeacherScheduleResponse } from "../../types";

export const createSession = async (
    formData: Partial<any>,
  ): Promise<any> => {
    const response = await axiosInstance.post<any>("/api/v1/management/lesson-session", formData);
    return response.data;
  };

export const fetchAllSchedule = async (date: string): Promise<TeacherScheduleResponse> => {
    const response = await axiosInstance.get<TeacherScheduleResponse>(
        `/api/v1/teacher-teaching/date-schedule?date=${date}`
    );
    return response.data;
};

export const fetchAllSessionAttendance = async (sessionId: string): Promise<SessionAttendanceResponse> => {
    const response = await axiosInstance.get<SessionAttendanceResponse>(
        `/api/attendance/students-with-status/${sessionId}`
    );
    return response.data;
};

export const fetchAllRealSession = async (date: string): Promise<any> => {
    const response = await axiosInstance.get<any>(
        `/api/v1/management/lesson-session/all?page=0&size=1000000&date=${date}`
    );
    return response.data;
};

export const fetchAllSessionMaterial = async (sessionId: string): Promise<SessionMaterialResponse> => {
    const response = await axiosInstance.get<SessionMaterialResponse>(
        `/api/v1/management/session-material/all/${sessionId}`
    );
    return response.data;
};

export const fetchAllSessionExplained = async (sessionId: string): Promise<SessionExplainedResponse> => {
    const response = await axiosInstance.get<SessionExplainedResponse>(
        `/api/v1/management/session-explained/all/${sessionId}`
    );
    return response.data;
};

export const createExpliand = async (params: {
  formData: Partial<any>;
  id: string;
}): Promise<any> => {
    const { formData, id } = params;
    const response = await axiosInstance.post<any>(`/api/v1/management/session-explained/${id}`, formData);
    return response.data;
  };

export const deleteSession = async (
    sessionId: number,
): Promise<{ message: string }> => {
    const response = await axiosInstance.delete<{ message: string }>(
        `/api/v1/management/lesson-session/${sessionId}`,
    );
    return response.data;
};

