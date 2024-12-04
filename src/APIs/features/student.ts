import axiosInstance from "../axios";
import type { StudentsResponse } from "../../types";

export const getStudents = async (): Promise<StudentsResponse> => {
  const response = await axiosInstance.get<StudentsResponse>("/api/v1/shared/user/students");
  return response.data;
};
