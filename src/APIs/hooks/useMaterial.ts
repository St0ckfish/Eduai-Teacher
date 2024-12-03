import { useMutation, UseMutationOptions, useQueryClient } from "@tanstack/react-query";
import type { Material } from "../../types";
import { createSessionMaterial } from "../features/material";

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