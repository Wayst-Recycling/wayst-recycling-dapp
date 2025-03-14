import http from '../http';

import type { Transaction } from './types';

// eslint-disable-next-line import/prefer-default-export
export const getTransactions = async (ox: string): Promise<Transaction[]> => {
  const res = await http.get(`/transactions/${ox}`);
  return res.data.data;
};
