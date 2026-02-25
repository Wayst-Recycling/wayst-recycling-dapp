import { IoIosArrowRoundBack } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

import TransactionList from '../home/components/TransactionList';

const History = () => {
  const navigate = useNavigate();

  return (
    <div className="mt-5">
      <div className="flex items-center space-x-3">
        <button aria-label="back" type="button" onClick={() => navigate(-1)}>
          <IoIosArrowRoundBack size={20} />
        </button>
        <p className="text-xl font-semibold">Transaction History</p>
      </div>

      {/* <p className="mt-4 text-xs">
        Total Transaction Earnings:{' '}
        <span className="font-medium text-[#008343]">
          cUSD {formatcUsd(totalEarning?.total)}
        </span>
      </p> */}
      <TransactionList />
    </div>
  );
};

export default History;
