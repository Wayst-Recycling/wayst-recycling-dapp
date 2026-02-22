import type { ApiResponse } from '../api.types';
import http from '../http';

import type { Transaction } from './types';

export const postClaimDailyReward = async (data: {
  oxAddress: string;
}): Promise<ApiResponse<unknown>> => {
  return http.post('/transaction/daily-claim', data);
};

export const getDailyClaim = async (ox: string): Promise<Transaction[]> => {
  const res = await http.get<ApiResponse<Transaction[]>>(
    `/transactions/${ox}/daily-claim`
  );
  return res.data.data;
};
