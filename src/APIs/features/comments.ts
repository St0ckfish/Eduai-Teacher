import type { CommentsResponse, PostCommentRequest } from "~/types";
import axiosInstance from "../axios";

export const fetchAllCommentsForPost = async (
  postId: number,
  page: number,
  size: number,
): Promise<CommentsResponse> => {
  const response = await axiosInstance.get<CommentsResponse>(
    `/api/v1/post/${postId}/comment/all`, // Endpoint for comments
    {
      params: { page, size }, // Query parameters
    },
  );
  return response.data;
};

export const createComment = async (postId: number, comment: string): Promise<void> => {
    const response = await axiosInstance.post(`/api/v1/post/${postId}/comment`, {
      comment,
    });
    return response.data; // Assuming you don't need to return anything
  };

export const updateComment = async (postId: number, commentId: number ,comment: string): Promise<void> => {
    const response = await axiosInstance.put(`/api/v1/post/${postId}/comment/${commentId}`, {
      comment,
    });
    return response.data; // Assuming you don't need to return anything
  };

export const deleteComment = async (postId: number, commentId: number): Promise<void> => {
    const response = await axiosInstance.delete(`/api/v1/post/${postId}/comment/${commentId}`);
    return response.data; // Assuming you don't need to return anything
  };

  export const likeComment = async (
    postId: number, 
    commentId: number, 
    liked: boolean
  ): Promise<void> => {
    const response = await axiosInstance.put(`/api/v1/post/${postId}/comment/${commentId}/like?liked=${liked}`);
    // /api/v1/post/1/comment/39/like?liked=false
    return response.data; // If no response data is needed, this can be omitted
  };