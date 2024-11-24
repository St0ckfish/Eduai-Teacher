import axiosInstance from "../axios";
import type { Advice, SignUpFormData } from "../../types";

export const getAllCounties = async () => {
  const response = await axiosInstance.get<{ data: unknown }>(
    "/api/v1/public/enumeration/country-code",
    {},
  );
  return response.data;
};
//
export const getAllNationalities = async () => {
  const response = await axiosInstance.get<{ data: unknown }>(
    "/api/v1/public/enumeration/nationality",
    {},
  );
  return response.data;
};
//
export const getAllSchools = async () => {
  const response = await axiosInstance.get<{ data: unknown }>(
    "/api/v1/public/school/basic-info?name&size=1000000&page=0",
    {},
  );
  return response.data;
};
//
export const getAllRegions = async () => {
  const response = await axiosInstance.get<{ data: unknown }>(
    "/api/v1/public/region/search?page=0&size=1000000&name",
    {},
  );
  return response.data;
};
//
export const signUp = async (formData: Partial<SignUpFormData>): Promise<SignUpFormData> => {
  const response = await axiosInstance.post<SignUpFormData>(
    "/api/v1/auth/teacher-registration",
    formData,
  );
  return response.data;
};
//
export const login = async (formData: Partial<Advice>): Promise<Advice> => {
  const response = await axiosInstance.post<Advice>(
    "/api/v1/auth/login",
    formData,
  );
  return response.data;
};
