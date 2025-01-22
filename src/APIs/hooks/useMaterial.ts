import {
  useMutation,
  UseMutationOptions,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";
import type { LessonSessionData, Material } from "../../types";
import { createSessionMaterial, deleteMaterial, fetchLessonSession, fetchUnreviedQuestions, generateExam, getAllTopics, updateQuestion, updateSessionMaterialDetails, updateSessionMaterialFile } from "../features/material";

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

export const useGenerateExam = (
  options?: UseMutationOptions<any, Error, string>,
) => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, string>({
    mutationFn: generateExam,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["generateExam"] });
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

export const useGetAllUnreviedQuestions = (
  options?: UseQueryOptions<any, Error>,
) => {
  return useQuery<any, Error>({
    queryKey: ["UnreviedQuestions"],
    queryFn: () => fetchUnreviedQuestions(),
    // enabled: Boolean(), // Prevent query if inputs are invalid
    ...options,
  });
};

export const useGetAllTopics = (
  courseId: string | undefined,
  options?: UseQueryOptions<any, Error>,
) => {
  return useQuery<any, Error>({
    queryKey: ["topics", courseId],
    queryFn: () => getAllTopics(courseId!),
    enabled: Boolean(courseId),
    ...options,
  });
};


export const useUpdateupdateQuestion = (
  options?: UseMutationOptions<any, Error, { data: any }>
) => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, { data: any }>({
    mutationFn: ({ data }) => updateQuestion(data),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["session-materials"] });
    },
    ...options,
  });
};

// Hook for updating title and description
export const useUpdateSessionMaterialDetails = (
  options?: UseMutationOptions<Material, Error, { materialId: string; data: { title: string; description: string } }>
) => {
  const queryClient = useQueryClient();

  return useMutation<Material, Error, { materialId: string; data: { title: string; description: string } }>({
    mutationFn: ({ materialId, data }) => updateSessionMaterialDetails(materialId, data),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["session-materials"] });
    },
    ...options,
  });
};

// Hook for updating the file
export const useUpdateSessionMaterialFile = (
  options?: UseMutationOptions<Material, Error, { materialId: string; formData: FormData }>
) => {
  const queryClient = useQueryClient();

  return useMutation<Material, Error, { materialId: string; formData: FormData }>({
    mutationFn: ({ materialId, formData }) => updateSessionMaterialFile(materialId, formData),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["session-materials"] });
    },
    ...options,
  });
};

export const useDeleteMaterial = (
  options?: UseMutationOptions<void, Error, string>
) => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: deleteMaterial,
    onSuccess: () => {
      console.log("File deleted successfully!");
      void queryClient.invalidateQueries({ queryKey: ["session-materials"] });
    },
    ...options,
  });
};