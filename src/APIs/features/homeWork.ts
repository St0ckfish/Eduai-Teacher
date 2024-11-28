import axiosInstance from "../axios";
import type { HomeWorkFormData, HomeworkResponse } from "../../types";

export const addHomeWork = async (formData: Partial<HomeWorkFormData>): Promise<HomeWorkFormData> => {
    const response = await axiosInstance.post<HomeWorkFormData>(
        "/api/v1/homework",
        formData,
    );
    return response.data;
};
export const fetchAllHomeWork = async (sessionId: number): Promise<HomeworkResponse> => {
    const response = await axiosInstance.get<HomeworkResponse>(
        `/api/v1/homework/for-session?sessionId=${sessionId}&size=1000000&page=0&getActive=1`
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