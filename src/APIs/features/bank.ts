import axiosInstance from "../axios";
import type { BankAccountFormData, BankAccountResponse } from "../../types";

export const fetchAllBanks = async (): Promise<BankAccountResponse> => {
    const response = await axiosInstance.get<BankAccountResponse>(
        `/api/v1/bank-account/all?size=1000000&page=0&getActive=1`
    );
    return response.data;
};

export const deposit = async (formData: Partial<BankAccountFormData>): Promise<BankAccountFormData> => {
    const response = await axiosInstance.post<BankAccountFormData>(
      "/api/v1/deposit-confirmation",
      formData,
    );
    return response.data;
  };