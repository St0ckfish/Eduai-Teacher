import type { PostResponse } from "~/types";
import axiosInstance from "../axios";

export const fetchAllPosts = async (params: {
  page: number;
  size: number;
}): Promise<PostResponse> => {
  const response = await axiosInstance.get<PostResponse>(`/api/v1/post/all`, {
    params,
  });
  return response.data;
};

export const likePost = async (postId: number, liked: boolean): Promise<void> => {
  const response = await axiosInstance.put(`/api/v1/post/${postId}/like`, {
    liked,
  });
  return response.data; // Assuming you don't need to return anything
};

