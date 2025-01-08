import axiosInstance from "../axios";

export const getAllMessages = async (id: string): Promise<any> => {
    const response = await axiosInstance.get<any>(
        `/api/v1/messages/messagesInChat/${id}?page=0&size=100`
    );
    return response.data;
};
export const getAllUsersChat = async (): Promise<any> => {
    const response = await axiosInstance.get<any>(
        `/api/v1/shared/user/all?size=1000000&page=0`
    );
    return response.data;
};
export const createNewChat = async (formData: Partial<any>): Promise<any> => {
    const response = await axiosInstance.post<any>(
        "/api/v1/chat/new",
        formData,
    );
    return response.data;
};
export const deleteChat = async (id: string): Promise<void> => {
    await axiosInstance.delete(`/api/v1/chat/${id}`);
};

export const getAllChats = async (): Promise<any> => {
    const response = await axiosInstance.get<any>(
        `/api/v1/chat/all`
    );
    return response.data;
};