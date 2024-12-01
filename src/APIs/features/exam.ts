import axiosInstance from "../axios";
import type { ExamListResponse, Upcoming_Previous_Exams } from "../../types";

export const fetchAllExams = async (): Promise<ExamListResponse> => {
    const response = await axiosInstance.get<ExamListResponse>(
        `/api/v1/academic/educationalAffairs/exams/teacher`
    );
    return response.data;
};
export const fetchAllUpcomingExams = async (): Promise<Upcoming_Previous_Exams> => {
    const response = await axiosInstance.get<Upcoming_Previous_Exams>(
        `/api/v1/academic/educationalAffairs/exams/upcoming`
    );
    return response.data;
};
export const fetchAllPreviousExams = async (): Promise<Upcoming_Previous_Exams> => {
    const response = await axiosInstance.get<Upcoming_Previous_Exams>(
        `/api/v1/academic/educationalAffairs/exams/previous`
    );
    return response.data;
};