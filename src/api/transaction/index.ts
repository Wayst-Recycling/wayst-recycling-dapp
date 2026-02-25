import type { UseQueryOptions } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

import type { RPaginated } from '../api.types';

import { getTransactions } from './function';
import type { Transaction } from './types';
import { GET_TRANSACTIONS_KEY } from './types';

// eslint-disable-next-line import/prefer-default-export
export const useGetTransactions = (
  params?: {
    page?: number;
    limit?: number;
  },
  options?: Partial<UseQueryOptions<RPaginated<Transaction>, Error>>
) => {
  const { data, isPending } = useQuery({
    queryKey: [GET_TRANSACTIONS_KEY, params],
    queryFn: () => getTransactions({ params }),
    ...options,
  });

  return { data, isPending };
};
