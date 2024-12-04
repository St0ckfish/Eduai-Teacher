import { useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import type {
    UseMutationOptions,
  UseQueryOptions,
} from "@tanstack/react-query";
import type { BankAccountFormData, BankAccountResponse } from "../../types";
import { fetchAllBanks, deposit } from "../features/bank";

export const useGetAllBanks = (
  options?: UseQueryOptions<BankAccountResponse, Error>,
) => {
  return useQuery<BankAccountResponse, Error>({
    queryKey: ["bankAccounts"],
    queryFn: () => fetchAllBanks(),
    staleTime: 1000 * 60 * 5,
    ...options,
  });
};
//
export const useDeposit = (
    options?: UseMutationOptions<BankAccountFormData, Error, Partial<BankAccountFormData>>,
  ) => {
    const queryClient = useQueryClient();
    return useMutation<BankAccountFormData, Error, Partial<BankAccountFormData>>({
      mutationFn: deposit,
      onSuccess: () => {
        void queryClient.invalidateQueries({ queryKey: ["deposit"] });
      },
      ...options,
    });
  };