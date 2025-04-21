import type { Schedule } from '../schedule/types';

export const GET_TRANSACTIONS_KEY = 'getTransactions' as const;

export interface Transaction {
  id: string;
  amount: string;
  charges: string;
  createdAt: string;
  oxAddress: string;
  schedule?: Schedule | null;
  status: string;
  type: string;
}
