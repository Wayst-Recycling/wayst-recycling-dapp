import http from '../http';
import type { GeneralApiResponse } from '@/lib/types';

import type { Transaction } from './types';

export const postClaimDailyReward = async (data: {
  oxAddress: string;
}): Promise<GeneralApiResponse<unknown>> => {
  const res = await http.post('/rewards/daily-claim', data);
  return res.data;
};

export const getDailyClaim = async (
  ox: string
): Promise<GeneralApiResponse<Transaction[]>> => {
  const res = await http.get(`/transactions/${ox}/daily-claim`);
  return res.data;
};
