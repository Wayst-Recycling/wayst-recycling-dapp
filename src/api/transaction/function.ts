import type { RPaginated, ApiResponse } from '../api.types';
import http from '../http';

import type { Transaction } from './types';

// eslint-disable-next-line import/prefer-default-export
export const getTransactions = async ({
  params,
}: {
  params?: { page?: number; limit?: number };
}): Promise<RPaginated<Transaction>> => {
  const queryString = new URLSearchParams();
  if (params?.page) queryString.append('page', params.page.toString());
  if (params?.limit) queryString.append('limit', params.limit.toString());

  const res = await http.get<ApiResponse<RPaginated<Transaction>>>(
    `/transaction?${queryString.toString()}`
  );
  return res.data.data;
};
