import type { RPaginated } from '../api.types';
import http from '../http';

import type { Transaction } from './types';

// eslint-disable-next-line import/prefer-default-export
export const getTransactions = async ({
  ox,
  params,
}: {
  ox: string;
  params?: { type?: string; page?: number; limit?: number };
}): Promise<RPaginated<Transaction>> => {
  const queryString = new URLSearchParams();
  if (params?.type) queryString.append('type', params.type.toString());

  const res = await http.get(`/transaction/${ox}?${queryString.toString()}`);
  return res.data.data;
};
