import type { ChangePassword, TeacherProfile, TeacherProfileUpdate } from "~/types";
import axiosInstance from "../axios";

export const fetchTeacherProfile = async (): Promise<TeacherProfile> => {
  const response = await axiosInstance.get<TeacherProfile>(
    "/api/v1/my-account/profile/teacher",
  );
  return response.data;
};

export const fetchTeacherProfileUpdate = async (): Promise<TeacherProfile> => {
  const response = await axiosInstance.get<TeacherProfile>(
    "/api/v1/my-account/profile/teacher/update",
  );
  return response.data;
};

export const updateProfile = async (profileData: TeacherProfileUpdate): Promise<TeacherProfileUpdate> => {
    try {
      const response = await axiosInstance.put<TeacherProfileUpdate>(
        '/api/v1/my-account/profile/teacher/update',
        profileData
      );
      return response.data;
    } catch (error) {
      if (error) {
        console.log('Error:', error);
      }
      throw error; // Re-throw the error if you want to handle it elsewhere
    }
  };

export const updateProfilePicture = async (profileData: any): Promise<TeacherProfileUpdate> => {
    try {
      const response = await axiosInstance.put<any>(
        '/api/v1/my-account/picture',
        profileData
      );
      return response.data;
    } catch (error) {
      if (error) {
        console.log('Error:', error);
      }
      throw error; // Re-throw the error if you want to handle it elsewhere
    }
  };
  
  export const changePassword = async (data: ChangePassword): Promise<void> => {
    try {
      const response = await axiosInstance.post('/api/v1/my-account/password/change', data);
      return response.data; 
    } catch (error: any) {
      console.error('Error changing password:', error.response?.data || error.message);
      throw error; // Re-throw the error to be handled by the caller
    }
  };