import axiosInstance from "../axios";
import type { Material } from "../../types";
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
  