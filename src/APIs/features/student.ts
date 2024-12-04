import axiosInstance from "../axios";
import type { StudentsResponse, StudentsWithGradesResponse } from "../../types";

export const getStudents = async (): Promise<StudentsResponse> => {
  const response = await axiosInstance.get<StudentsResponse>("/api/v1/shared/user/students");
  return response.data;
};

export const getStudentsWithGrades = async (examId: string): Promise<StudentsWithGradesResponse> => {
  const response = await axiosInstance.get<StudentsWithGradesResponse>(
    `/api/v1/academic/educationalAffairs/exams/students-with-grade/${examId}`
  );
  return response.data;
};