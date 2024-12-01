import axiosInstance from "../axios";
import type { FeesResponse } from "../../types";

export const fetchAllFees = async (): Promise<FeesResponse> => {
    const response = await axiosInstance.get<FeesResponse>(
        `/api/v1/teacher-fees/all`
    );
    return response.data;
};