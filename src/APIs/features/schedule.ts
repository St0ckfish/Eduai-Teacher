import axiosInstance from "../axios";
import type { TeacherScheduleResponse } from "../../types";

export const fetchAllSchedule = async (date: string): Promise<TeacherScheduleResponse> => {
    const response = await axiosInstance.get<TeacherScheduleResponse>(
        `/api/v1/teacher-teaching/date-schedule?date=${date}`
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