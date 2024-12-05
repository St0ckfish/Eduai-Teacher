import axiosInstance from "../axios";
import type { ExamFormData, ExamListResponse, ExamResultsResponse, Upcoming_Previous_Exams } from "../../types";

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

export const fetchAllTeachers = async (): Promise<any> => {
    const response = await axiosInstance.get<any>(
        `/api/v1/management/teacher/all?size=1000000&page=0&archived=false`
    );
    return response.data;
};

export const fetchAllCourses = async (): Promise<any> => {
    const response = await axiosInstance.get<any>(
        `/api/v1/management/course/all?size=1000000&page=0`
    );
    return response.data;
};

export const fetchAllClasses = async (): Promise<any> => {
    const response = await axiosInstance.get<any>(
        `/api/v1/management/classroom/all?size=1000000&page=0&semesterId=`
    );
    return response.data;
};

export const createExam = async (formData: Partial<ExamFormData>): Promise<ExamFormData> => {
    const response = await axiosInstance.post<ExamFormData>(
      "/api/v1/academic/educationalAffairs/exams/by-teacher",
      formData,
    );
    return response.data;
  };

  export const fetchExamResults = async (examId: string): Promise<ExamResultsResponse> => {
    const response = await axiosInstance.get<ExamResultsResponse>(`/api/v1/exam-results/exam/${examId}`);
    return response.data;
  };

  export const putGrade = async (examResultId: string, scoreData: { score: number; scoreDate: string }) => {
    const response = await axiosInstance.put(`/api/v1/exam-results/${examResultId}`, scoreData);
    return response.data;
  };