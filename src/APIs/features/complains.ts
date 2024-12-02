import axiosInstance from "../axios";
import type { ComplainsResponse } from "../../types";

export const fetchAllComplains = async (): Promise<ComplainsResponse> => {
    const response = await axiosInstance.get<ComplainsResponse>(
        `/api/v1/complain/all?size=1000000&page=0`
    );
    return response.data;
};