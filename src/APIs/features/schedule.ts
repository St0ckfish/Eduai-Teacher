import axiosInstance from "../axios";
import type { Advice, TeacherScheduleResponse } from "../../types";

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

export const createAdvice = async (
    formData: Partial<Advice>,
): Promise<Advice> => {
    const response = await axiosInstance.post<Advice>("/advice", formData);
    return response.data;
};

export const fetchAdviceById = async (id: number): Promise<Advice> => {
    const response = await axiosInstance.get<Advice>(`/advice/${id}`);
    return response.data;
};

export const updateAdvice = async (params: {
    formData: Partial<Advice>;
    id: number;
}): Promise<Advice> => {
    const { formData, id } = params;
    const response = await axiosInstance.patch<Advice>(`/advice/${id}`, formData);
    return response.data;
};
