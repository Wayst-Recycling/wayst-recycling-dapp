import type { UseQueryOptions } from '@tanstack/react-query';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { GET_TOTAL_EARNING_KEY } from '../schedule/types';
import { GET_TRANSACTIONS_KEY } from '../transaction/types';

import { getDailyClaim, postClaimDailyReward } from './function';
import type { Transaction } from './types';
import { GET_DAILY_CLAIM_KEY } from './types';

export const useClaimDailyReward = () => {
  const queryClient = useQueryClient();

  const {
    mutateAsync: mutate,
    isPending,
    isError,
    error,
    isSuccess: claimDailyRewardSucces,
  } = useMutation({
    mutationFn: postClaimDailyReward,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [GET_TRANSACTIONS_KEY, GET_TOTAL_EARNING_KEY],
      }),
  });

  return { mutate, isPending, isError, error, claimDailyRewardSucces };
};

export const useGetDailyClaim = (
  ox: string,
  options?: Partial<UseQueryOptions<Transaction[], Error>>
) => {
  const { data, isPending } = useQuery({
    queryKey: [GET_DAILY_CLAIM_KEY],
    queryFn: () => getDailyClaim(ox),
    ...options,
  });

  return { data, isPending };
};
