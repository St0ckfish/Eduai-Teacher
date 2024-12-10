import {
  useMutation,
  UseMutationOptions,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";
import type { LessonSessionData, Material } from "../../types";
import { createSessionMaterial, fetchLessonSession } from "../features/material";

export const useCreateSessionMaterial = (
  options?: UseMutationOptions<Material, Error, FormData>,
) => {
  const queryClient = useQueryClient();

  return useMutation<Material, Error, FormData>({
    mutationFn: createSessionMaterial,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["session-materials"] });
    },
    ...options,
  });
};

export const useLessonSessionId = (
  date: string,
  scheduleItemId: string,
  options?: UseQueryOptions<LessonSessionData, Error>,
) => {
  return useQuery<LessonSessionData, Error>({
    queryKey: ["lesson-session", date, scheduleItemId],
    queryFn: () => fetchLessonSession(date, scheduleItemId),
    enabled: Boolean(date && scheduleItemId), // Prevent query if inputs are invalid
    ...options,
  });
};
