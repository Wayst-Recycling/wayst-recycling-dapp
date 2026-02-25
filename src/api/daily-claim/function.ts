import type { ApiResponse } from '../api.types';
import http from '../http';

import type { Transaction } from './types';

export const postClaimDailyReward = async (data: {
  currency: string;
}): Promise<ApiResponse<unknown>> => {
  const res = await http.post('/transaction/daily-claim', data);
  return res.data;
};

export const getDailyClaim = async (ox: string): Promise<Transaction[]> => {
  const res = await http.get<ApiResponse<Transaction[]>>(
    `/transactions/${ox}/daily-claim`
  );
  return res.data.data;
};
