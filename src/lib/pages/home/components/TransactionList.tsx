import { useSearchParams } from 'react-router-dom';

import { useGetTransactions } from '@/api/transaction';
import Loader from '@/lib/components/loader';
import Pagination from '@/lib/components/pagination';
import TransactionCard from '@/lib/components/transactionCard';
import { cn } from '@/lib/styles/utils';

const TransactionList = ({ home = false }: { home?: boolean }) => {
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page');
  const { data: transactions, isPending: isLoadingGetTransactions } =
    useGetTransactions({ page: Number(page) || 1, limit: home ? 3 : 10 });

  return (
    <div
      className={cn('mt-10 flex flex-col items-center space-y-2 pb-20', [
        home && 'mt-0 pb-0',
      ])}
    >
      {transactions &&
        !isLoadingGetTransactions &&
        transactions.data.map((transaction) => (
          <TransactionCard transaction={transaction} key={transaction.id} />
        ))}

      {!home && transactions && transactions.totalPages > 1 && (
        <Pagination totalPages={transactions.totalPages} />
      )}

      {isLoadingGetTransactions && <Loader />}

      {!isLoadingGetTransactions &&
        (!transactions || transactions.total === 0) && (
          <div className="mx-auto flex max-w-[60%] flex-col items-center text-center">
            <img
              className="mx-auto pt-10"
              src="/assets/garbage.png"
              alt="empty"
            />
            <p className="text-sm font-semibold">No transacation history</p>
            <p className="text-xs text-gray-500">
              Your transaction history is currently empty. Start recycling today
              to see your impact.
            </p>
          </div>
        )}
    </div>
  );
};

export default TransactionList;
