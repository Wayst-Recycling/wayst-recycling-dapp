/* eslint-disable sonarjs/no-duplicate-string */
import { ChevronLeft, ChevronRight } from 'lucide-react';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { IoIosArrowRoundBack } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { useAccount, useWriteContract } from 'wagmi';

import { useClaimDailyReward } from '@/api/daily-claim';
import { useGetTransactions } from '@/api/transaction';
import { CARUS, CARUSABI } from '@/contract/contractAddress';
import Button from '@/lib/components/buttons/button';
import { cn } from '@/lib/styles/utils';
import { formatcUsd } from '@/lib/utils/format';

const DailyClaim = () => {
  const navigate = useNavigate();
  const { mutate, isPending: isLoadingClaimReward } = useClaimDailyReward();
  const { address } = useAccount();
  const { data: dailyClaimResponse, isPending: isLoadingGetDailyClaim } =
    useGetTransactions({
      ox: address as string,
      params: {
        type: 'dailyClaim',
      },
    });

  const {
    writeContract,
    isPending: isLoadingWriteContract,
    // isError: writeContractIsError,
    isSuccess: writeContractIsSuccess,
  } = useWriteContract();

  const today = moment();
  const [currentMonth, setCurrentMonth] = useState(today);
  const previousMonth = moment(currentMonth).subtract(1, 'month');
  const nextMonth = moment(currentMonth).add(1, 'month');
  const handleSetPreviousMonth = () => {
    setCurrentMonth(previousMonth);
  };
  const handleSetNextMonth = () => {
    setCurrentMonth(nextMonth);
  };

  const daysInMonth = moment(currentMonth).daysInMonth();

  const currentDay = moment(currentMonth).subtract(1, 'day').date();

  const claimReward = () => {
    writeContract({
      abi: CARUSABI,
      address: CARUS,
      functionName: 'dailyMint',
      account: address,
    });
  };

  useEffect(() => {
    if (address && writeContractIsSuccess) {
      mutate({ oxAddress: address as string });
    }
  }, [address, mutate, writeContractIsSuccess]);

  const days = [
    ...Array.from(
      { length: daysInMonth - currentDay + 1 },
      (_, index) => currentDay + index
    ),
    ...Array.from({ length: currentDay - 1 }, (_, index) => index + 1),
  ];

  const transactionDates = dailyClaimResponse?.data.map((tx) =>
    moment(tx.createdAt).format('YYYY MM DD')
  );

  const isClaimed = transactionDates?.includes(today.format('YYYY MM DD'));

  return (
    <div className="mt-5">
      <div className="flex items-center space-x-3">
        <button aria-label="back" type="button" onClick={() => navigate(-1)}>
          <IoIosArrowRoundBack size={20} />
        </button>
        <p className="text-xl font-semibold">Daily Claim</p>
      </div>

      <div className="mt-5 flex items-center justify-between">
        <button
          aria-label="setPreviousMonth"
          type="button"
          onClick={handleSetPreviousMonth}
        >
          <ChevronLeft />
        </button>
        <p className="text-sm font-medium">
          {currentMonth.format('MMMM YYYY')}
        </p>
        <button
          type="button"
          aria-label="setNextMonth"
          onClick={handleSetNextMonth}
        >
          <ChevronRight />
        </button>
      </div>
      <div className="hide-scroll mt-3 flex flex-nowrap space-x-3 overflow-x-scroll pb-1">
        {days.map((day) => {
          const dayDate = moment(currentMonth).date(day);
          const dayDateString = dayDate.format('YYYY MM DD');
          const isTransactionDate = transactionDates?.includes(dayDateString);
          const isFutureDate = dayDate.isAfter(today, 'day');
          return (
            <div key={day} className="flex flex-col items-center gap-y-2">
              <p className="text-xs font-medium">
                {moment(currentMonth).date(day).format('ddd')}
              </p>
              <div
                className={cn(
                  'flex min-h-12 min-w-12 items-center justify-center rounded-full bg-white shadow-md',
                  [isFutureDate && 'bg-gray-200'],
                  [isTransactionDate && 'border-2 border-[#036937]']
                )}
              >
                {day}
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-5">
        <p className="text-xl font-semibold">Claim History</p>
        {dailyClaimResponse &&
          !isLoadingGetDailyClaim &&
          dailyClaimResponse.data.map((item) => (
            <div key={item.id} className="mt-3">
              <p className="text-xs font-medium capitalize text-gray-400">
                {moment(item.createdAt).startOf('second').fromNow()}
              </p>
              <div className="mt-1 flex items-center justify-between rounded-lg bg-white p-3">
                <div className="flex items-center space-x-2">
                  <img
                    src="/assets/gift.png"
                    alt="gift"
                    className="relative aspect-square w-11 object-contain"
                  />
                  <div>
                    <p className="text-sm font-medium">Daily Claim</p>
                    <div className="flex items-end space-x-1">
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5.0625 2.25V3.9375M12.9375 2.25V3.9375M2.25 14.0625V5.625C2.25 5.17745 2.42779 4.74823 2.74426 4.43176C3.06072 4.11529 3.48995 3.9375 3.9375 3.9375H14.0625C14.5101 3.9375 14.9393 4.11529 15.2557 4.43176C15.5722 4.74823 15.75 5.17745 15.75 5.625V14.0625M2.25 14.0625C2.25 14.5101 2.42779 14.9393 2.74426 15.2557C3.06072 15.5722 3.48995 15.75 3.9375 15.75H14.0625C14.5101 15.75 14.9393 15.5722 15.2557 15.2557C15.5722 14.9393 15.75 14.5101 15.75 14.0625M2.25 14.0625V8.4375C2.25 7.98995 2.42779 7.56073 2.74426 7.24426C3.06072 6.92779 3.48995 6.75 3.9375 6.75H14.0625C14.5101 6.75 14.9393 6.92779 15.2557 7.24426C15.5722 7.56073 15.75 7.98995 15.75 8.4375V14.0625"
                          stroke="#919191"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <p className="text-xs text-[#919191]">
                        {moment(item.createdAt).format('MMM Do YYYY')}
                      </p>
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9 4.5V9H12.375M15.75 9C15.75 9.88642 15.5754 10.7642 15.2362 11.5831C14.897 12.4021 14.3998 13.1462 13.773 13.773C13.1462 14.3998 12.4021 14.897 11.5831 15.2362C10.7642 15.5754 9.88642 15.75 9 15.75C8.11358 15.75 7.23583 15.5754 6.41689 15.2362C5.59794 14.897 4.85382 14.3998 4.22703 13.773C3.60023 13.1462 3.10303 12.4021 2.76381 11.5831C2.42459 10.7642 2.25 9.88642 2.25 9C2.25 7.20979 2.96116 5.4929 4.22703 4.22703C5.4929 2.96116 7.20979 2.25 9 2.25C10.7902 2.25 12.5071 2.96116 13.773 4.22703C15.0388 5.4929 15.75 7.20979 15.75 9Z"
                          stroke="#919191"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <p className="text-xs text-[#919191]">
                        {moment(item.createdAt).format('LT')}
                      </p>
                    </div>
                  </div>
                </div>
                <p className="text-sm font-medium">
                  cUSD {formatcUsd(Number(item.amount))}
                </p>
              </div>
            </div>
          ))}
      </div>
      <div className="fixed bottom-0 left-0 flex w-full max-w-lg flex-col items-center space-y-2 px-[5%] py-6">
        {/* <p className="text-xs">
          Earnings from Claims:{' '}
          <span className="font-medium text-[#036937]">cUSD 16.42</span>
        </p> */}
        {(!dailyClaimResponse && !isLoadingClaimReward) ||
          (!isClaimed && (
            <Button
              isLoading={isLoadingClaimReward || isLoadingWriteContract}
              onClick={claimReward}
            >
              Claim Today&apos;s Earnings
            </Button>
          ))}
      </div>
    </div>
  );
};

export default DailyClaim;
