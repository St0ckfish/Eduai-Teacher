import { useQuery } from "@tanstack/react-query";
import type {
  UseQueryOptions,
} from "@tanstack/react-query";
import {
  fetchAllComplains,
} from "../features/complains";
import type { ComplainsResponse } from "../../types";

export const useGetAllComplains = (
    options?: UseQueryOptions<ComplainsResponse, Error>,
  ) => {
    return useQuery<ComplainsResponse, Error>({
      queryKey: ["complains"],
      queryFn: () => fetchAllComplains(),
      staleTime: 1000 * 60 * 5,
      ...options,
    });
  };