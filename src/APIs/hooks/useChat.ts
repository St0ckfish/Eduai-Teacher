import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type {
  UseQueryOptions,
  UseMutationOptions,
} from "@tanstack/react-query";
import { createNewChat, deleteChat, getAllChats, getAllMessages, getAllUsersChat } from "../features/chat";
import { AxiosError } from "axios";
//
export const useGetAllMessages = (
    id: string,
  options?: UseQueryOptions<any, Error>,
) => {
  return useQuery<any, Error>({
    queryKey: ["chatMessages", id],
    queryFn: () => getAllMessages(id),
    staleTime: 1000 * 60 * 5,
    retry: false,
    ...options,
  });
};
export const useAllUsersChat = (
  options?: UseQueryOptions<any, Error>,
) => {
  return useQuery<any, Error>({
    queryKey: ["chatUsers"],
    queryFn: () => getAllUsersChat(),
    staleTime: 1000 * 60 * 5,
    retry: false,
    ...options,
  });
};
export const useCreateNewChat = (
  options?: UseMutationOptions<any, Error, Partial<any>>,
) => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, Partial<any>>({
    mutationFn: createNewChat,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["createChat"] });
    },
    ...options,
  });
};
export const useDeleteChat = (
  options?: UseMutationOptions<void, AxiosError, string>
) => {
  return useMutation<void, AxiosError, string>({
    mutationFn: deleteChat,
    ...options,
  });
};
export const useAllChats = (
    options?: UseQueryOptions<any, Error>,
  ) => {
    return useQuery<any, Error>({
      queryKey: ["chats"],
      queryFn: () => getAllChats(),
      staleTime: 1000 * 60 * 5,
      retry: false,
      ...options,
    });
  };