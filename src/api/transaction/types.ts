import type { Schedule } from '../schedule/types';

export const GET_TRANSACTIONS_KEY = 'getTransactions' as const;

export interface Transaction {
  acceptedAt: string | null;
  amount: string;
  charges: string;
  cancelledAt: string | null;
  createdAt: string;
  fulfilledAt: string | null;
  schedule?: Schedule;
  status: string;
  transactionId: string;
  type: string;
}
