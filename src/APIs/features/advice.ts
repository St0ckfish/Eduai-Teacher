import axiosInstance from "../axios";
import type { Advice, PaginatedAdvices } from "../../types";

export const fetchAllAdvices = async (params: {
  page: number;
  limit: number;
  categoryId?: number;
}): Promise<PaginatedAdvices> => {
  const response = await axiosInstance.get<PaginatedAdvices>(
    "/api/v1/my-notification/all",
    {
      params,
    },
  );
  return response.data;
};

export const deleteAdvice = async (
  id: number,
): Promise<{ message: string }> => {
  const response = await axiosInstance.delete<{ message: string }>(
    `/advice/${id}`,
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
