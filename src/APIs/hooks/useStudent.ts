import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { StudentsResponse, StudentsWithGradesResponse } from "~/types";
import { getStudents, getStudentsWithGrades } from "../features/student";

export const useGetStudents = (
  options?: UseQueryOptions<StudentsResponse, Error>
) => {
  return useQuery<StudentsResponse, Error>({
    queryKey: ["students"], 
    queryFn: getStudents,
    ...options,
  });
};

// Hook to fetch students with grades by exam ID
export const useGetStudentsWithGrades = (
  examId: string,
  options?: UseQueryOptions<StudentsWithGradesResponse, Error>
) => {
  return useQuery<StudentsWithGradesResponse, Error>({
    queryKey: ["students-with-grades", examId],
    queryFn: () => getStudentsWithGrades(examId),
    enabled: !!examId, // Prevent query from running if examId is not provided
    ...options,
  });
};

