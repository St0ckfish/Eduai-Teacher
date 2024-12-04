import axiosInstance from "../axios";
import type { SessionAttendanceResponse, SessionExplainedResponse, SessionMaterialResponse, TeacherScheduleResponse } from "../../types";

export const fetchAllSchedule = async (date: string): Promise<TeacherScheduleResponse> => {
    const response = await axiosInstance.get<TeacherScheduleResponse>(
        `/api/v1/teacher-teaching/date-schedule?date=${date}`
    );
    return response.data;
};

export const fetchAllSessionAttendance = async (sessionId: string): Promise<SessionAttendanceResponse> => {
    const response = await axiosInstance.get<SessionAttendanceResponse>(
        `/api/attendance/by-session?sessionId=${sessionId}&size=1000000&page=0`
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

export const deleteSession = async (
    sessionId: number,
): Promise<{ message: string }> => {
    const response = await axiosInstance.delete<{ message: string }>(
        `/api/v1/management/lesson-session/${sessionId}`,
    );
    return response.data;
};

