import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { StudentsResponse } from "~/types";
import { getStudents } from "../features/student";

export const useGetStudents = (
  options?: UseQueryOptions<StudentsResponse, Error>
) => {
  return useQuery<StudentsResponse, Error>({
    queryKey: ["students"], 
    queryFn: getStudents,
    ...options,
  });
};
