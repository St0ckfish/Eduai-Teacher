import { useMutation, useQuery, UseQueryOptions } from "@tanstack/react-query";
import type { PostResponse, SinglePostResponse } from "../../types";
import { fetchAllPosts, fetchPostById, likePost } from "../features/post";

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
export const useGetPost = (
  params: { postId: number },
  options?: UseQueryOptions<SinglePostResponse, Error>,
) => {
  return useQuery<SinglePostResponse, Error>({
    queryKey: ["post", params.postId],
    queryFn: () => fetchPostById(params.postId),
    ...options,
  });
};


export function useLikePost() {
  return useMutation<void, Error, { postId: number; liked: boolean }>({
    mutationFn: ({ postId, liked }) => likePost(postId, liked), 
  });
}