import { useMutation, useQuery, UseQueryOptions } from "@tanstack/react-query";
import type { PostResponse } from "../../types";
import { fetchAllPosts, likePost } from "../features/post";

export const useGetAllPosts = (
  params: { page: number; size: number },
  options?: UseQueryOptions<PostResponse, Error>
) => {
  return useQuery<PostResponse, Error>({
    queryKey: ["posts", params], 
    queryFn: () => fetchAllPosts(params),
    ...options,
  });
};

export function useLikePost() {
  return useMutation<void, Error, { postId: number; liked: boolean }>({
    mutationFn: ({ postId, liked }) => likePost(postId, liked), 
  });
}