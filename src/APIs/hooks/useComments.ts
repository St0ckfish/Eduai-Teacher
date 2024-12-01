 import { createComment, deleteComment, fetchAllCommentsForPost, updateComment } from "../features/comments";
import { useMutation, useQuery } from "@tanstack/react-query";
import { CommentsResponse } from "~/types";

export function useGetAllCommentsForPost({
  postId,
  page,
  size,
}: {
  postId: number;
  page: number;
  size: number;
}) {
  return useQuery<CommentsResponse, Error>({
    queryKey: ["posts", postId, "comments", { page, size }], // Unique key with all parameters
    queryFn: () => fetchAllCommentsForPost(postId, page, size), // Pass arguments as separate parameters
    enabled: !!postId, // Run only if `postId` exists
  });
}

export function useCreateComment() {
    return useMutation<void, Error, { postId: number; comment: string }>({
      mutationFn: ({ postId, comment }) => createComment(postId, comment), // Pass postId and comment as an object
    });
  }

export function useUpdateComment() {
    return useMutation<void, Error, { postId: number; commentId: number; comment: string }>({
      mutationFn: ({ postId, commentId, comment }) => updateComment(postId, commentId, comment), // Pass postId and comment as an object
    });
  }

export function useDeleteComment() {
    return useMutation<void, Error, { postId: number; commentId: number; }>({
      mutationFn: ({ postId, commentId }) => deleteComment(postId, commentId), // Pass postId and comment as an object
    });
  }