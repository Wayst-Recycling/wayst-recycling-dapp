import { useQuery } from '@tanstack/react-query';

import { getTransactions } from './function';
import { GET_TRANSACTIONS_KEY } from './types';

// eslint-disable-next-line import/prefer-default-export
export const useGetTransactions = ({
  ox,
  params,
}: {
  ox: string;
  params?: {
    type?: string;
    page?: number;
    limit?: number;
  };
}) => {
  const { data, isPending } = useQuery({
    queryKey: [GET_TRANSACTIONS_KEY],
    queryFn: () => getTransactions({ ox, params }),
  });

  return { data, isPending };
};
