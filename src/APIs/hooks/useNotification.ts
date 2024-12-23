import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type {
  UseQueryOptions,
  UseMutationOptions,
} from "@tanstack/react-query";
import { deleteNotification, fetchAllNotifications, putNotifiRead } from "../features/notifications";

export const useGetAllNotificationsQuery = (
    params: { page: number; size: number },
    options?: UseQueryOptions<any, Error>
  ) => {
    return useQuery<any, Error>({
      queryKey: ["notifications", params],
      queryFn: () => fetchAllNotifications(params),
      staleTime: 1000 * 60 * 5,
      ...options,
    });
  };
  
  export const useDeleteNotificationMutation = (options?: UseMutationOptions<any, Error, string>) => {
    const queryClient = useQueryClient();
    return useMutation<any, Error, string>({
      mutationFn: (id: string) => deleteNotification(id),
      onSuccess: () => {
        // Invalidate the main "notifications" query
        void queryClient.invalidateQueries({ queryKey: ["notifications"] });
      },
      ...options,
    });
  };
  
  export const usePutNotifiReadMutation = (options?: UseMutationOptions<any, Error, string>) => {
    const queryClient = useQueryClient();
    return useMutation<any, Error, string>({
      mutationFn: (id: string) => putNotifiRead(id),
      onSuccess: () => {
        // Invalidate the main "notifications" query
        void queryClient.invalidateQueries({ queryKey: ["notifications"] });
      },
      ...options,
    });
  };