export const GET_DAILY_CLAIM_KEY = 'daily_claim' as const;

export type Transaction = {
  amount: string;
  charges: string;
  date: string;
  status: string;
  transaction_id: string;
  type: string;
  acceptedAt: string;
  createdAt: string;
  cancelledAt: string;
};
