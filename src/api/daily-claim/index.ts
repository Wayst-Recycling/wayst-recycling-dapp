import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { getDailyClaim, postClaimDailyReward } from './function';
import { GET_DAILY_CLAIM_KEY } from './types';

export const useClaimDailyReward = () => {
  const queryClient = useQueryClient();

  const {
    mutate,
    isPending,
    isError,
    error,
    isSuccess: schedulePickupSucces,
  } = useMutation({
    mutationFn: postClaimDailyReward,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [GET_DAILY_CLAIM_KEY],
      }),
  });

  return { mutate, isPending, isError, error, schedulePickupSucces };
};

export const useGetDailyClaim = (ox: string) => {
  const { data, isPending } = useQuery({
    queryKey: [GET_DAILY_CLAIM_KEY],
    queryFn: () => getDailyClaim(ox),
  });

  return { data, isPending };
};
