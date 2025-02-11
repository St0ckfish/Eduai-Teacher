import { useMutation, type UseMutationOptions, useQuery, type UseQueryOptions } from "@tanstack/react-query";
import type { ChangePassword, TeacherProfile, TeacherProfileUpdate } from "../../types";
import {
  changePassword,
  fetchTeacherProfile,
  fetchTeacherProfileUpdate,
  updateProfile,
  updateProfilePicture,
} from "../features/profile";

export const useProfile = (
  options?: UseQueryOptions<TeacherProfile, Error>,
) => {
  return useQuery<TeacherProfile, Error>({
    queryKey: ["teacherProfile"],
    queryFn: fetchTeacherProfile,
    ...options,
  });
};

export const useGetProfileUpdate = (
  options?: UseQueryOptions<TeacherProfile, Error>,
) => {
  return useQuery<TeacherProfile, Error>({
    queryKey: ["teacherProfileUpdate"],
    queryFn: fetchTeacherProfileUpdate,
    ...options,
  });
};

export const useUpdateProfile = (
    options?: UseMutationOptions<TeacherProfileUpdate, Error, TeacherProfileUpdate>
  ) => {
    return useMutation<TeacherProfileUpdate, Error, TeacherProfileUpdate>({
      mutationFn: updateProfile, // The mutation function
      ...options, // Spread any additional options (onSuccess, onError, etc.)
    });
  };

export const useUpdateProfilePicture = (
    options?: UseMutationOptions<any, Error, any>
  ) => {
    return useMutation<any, Error, any>({
      mutationFn: updateProfilePicture, // The mutation function
      ...options, // Spread any additional options (onSuccess, onError, etc.)
    });
  };

  export const useChangePassword = (
    options?: UseMutationOptions<void, Error, ChangePassword>
  ) => {
    return useMutation<void, Error, ChangePassword>({
      mutationFn: changePassword, // Use the changePassword mutation function
      ...options, // Spread any additional options like onSuccess, onError, etc.
    });
  };