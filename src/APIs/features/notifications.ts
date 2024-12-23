import axiosInstance from "../axios";

// API calls
export const fetchAllNotifications = async ({ page, size }: { page: number; size: number }) => {
  const response = await axiosInstance.get(`/api/v1/my-notification/all?size=${size}&page=${page}`);
  return response.data;
};

export const putNotifiRead = async (notifiId: string) => {
  const response = await axiosInstance.post(`/api/v1/my-notification/${notifiId}/read`);
  return response.data;
};

export const deleteNotification = async (notifiId: string) => {
  const response = await axiosInstance.delete(`/api/v1/my-notification/${notifiId}`);
  return response.data;
};