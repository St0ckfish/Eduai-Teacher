import axiosInstance from "../axios";
import type { LessonSessionData, LessonSessionResponse, Material } from "../../types";
export const createSessionMaterial = async (
  formData: FormData,
): Promise<Material> => {
  const response = await axiosInstance.post<Material>(
    "/api/v1/management/session-material",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );
  return response.data;
};

export const generateExam = async (
  explainedId: string,
): Promise<any> => {
  const response = await axiosInstance.post<any>(
    `/api/v1/daily-exam/teacher/generate-exams/${explainedId}?questions-count&questions-type`,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );
  return response.data;
};

export const fetchLessonSession = async (
  date: string,
  scheduleItemId: string,
): Promise<LessonSessionData> => {
  const response = await axiosInstance.get<LessonSessionResponse>(
    `/api/v1/management/lesson-session/for-schedule-item?date=${date}&scheduleItemId=${scheduleItemId}`,
  );
  return response.data.data;
};

export const fetchUnreviedQuestions = async (
): Promise<any> => {
  const response = await axiosInstance.get<any>(
    `/api/v1/lesson-ai-question/unreviewed?course-id=314&lesson-name=lesson_1&limit=1000000`,
  );
  return response.data.data;
};

export const getAllTopics = async (courseId: string): Promise<any> => {
  if (!courseId) {
    throw new Error('Course ID is required');
  }
  const response = await axiosInstance.get<any>(
    `/api/v1/management/lesson/all?page=0&size=1000&courseId=${courseId}`,
  );
  return response;
};

export const updateQuestion = async (
  formData: FormData,
): Promise<any> => {
  const response = await axiosInstance.put(
    `/api/v1/lesson-ai-question`,
    formData
  );
  return response.data;
};

// Update the title and description
export const updateSessionMaterialDetails = async (
  materialId: string,
  data: { title: string; description: string }
): Promise<Material> => {
  const response = await axiosInstance.put(
    `/api/v1/management/session-material/${materialId}`,
    data
  );
  return response.data;
};

// Update the file with form data
export const updateSessionMaterialFile = async (
  materialId: string,
  formData: FormData
): Promise<Material> => {
  const response = await axiosInstance.put(
    `/api/v1/management/session-material/file/${materialId}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};

export const deleteMaterial = async (materialId: string): Promise<void> => {
  const response = await axiosInstance.delete(
    `api/v1/management/session-material/${materialId}`
  );
  return response.data;
};
