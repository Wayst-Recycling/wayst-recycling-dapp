import type { RPaginated, ApiResponse } from '../api.types';
import http from '../http';

import type { Transaction } from './types';

// eslint-disable-next-line import/prefer-default-export
export const getTransactions = async ({
  params,
}: {
  params?: { type?: string; page?: number; limit?: number };
}): Promise<RPaginated<Transaction>> => {
  const queryString = new URLSearchParams();
  if (params?.type) queryString.append('type', params.type.toString());

  const res =
    await http.get<ApiResponse<RPaginated<Transaction>>>(`/transaction`);
  return res.data.data;
};
