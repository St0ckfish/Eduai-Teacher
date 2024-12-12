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

export const fetchLessonSession = async (
  date: string,
  scheduleItemId: string,
): Promise<LessonSessionData> => {
  const response = await axiosInstance.get<LessonSessionResponse>(
    `/api/v1/management/lesson-session/for-schedule-item?date=${date}&scheduleItemId=${scheduleItemId}`,
  );
  return response.data.data;
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
