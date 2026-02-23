import moment from 'moment';
import React from 'react';
import type { Schedule } from '@/api/schedule/types';
import TransactionStatus from '@/lib/components/transactionStatus';
import { formatcUsd } from '@/lib/utils/format';

const ScheduleCard = ({ transaction }: { transaction: Schedule }) => {
  return (
    <div className="flex w-full justify-between rounded-xl bg-white p-3 shadow-sm">
      <div className="flex items-center space-x-2">
        <img
          src="/assets/plastic.svg"
          alt="plastic"
          className="aspect-square w-11"
        />
        <div className="flex flex-col items-start">
          <p className="font-medium capitalize">{transaction.material}</p>
          <div className="flex items-center space-x-1">
            <svg
              width="14"
              height="14"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.0625 2.25V3.9375M12.9375 2.25V3.9375M2.25 14.0625V5.625C2.25 5.17745 2.42779 4.74823 2.74426 4.43176C3.06072 4.11529 3.48995 3.9375 3.9375 3.9375H14.0625C14.5101 3.9375 14.9393 4.11529 15.2557 4.43176C15.5722 4.74823 15.75 5.17745 15.75 5.625V14.0625M2.25 14.0625C2.25 14.5101 2.42779 14.9393 2.74426 15.2557C3.06072 15.5722 3.48995 15.75 3.9375 15.75H14.0625C14.5101 15.75 14.9393 15.5722 15.2557 15.2557C15.5722 14.9393 15.75 14.0625V8.4375C2.25 7.98995 2.42779 7.56073 2.74426 7.24426C3.06072 6.92779 3.48995 6.75 3.9375 6.75H14.0625C14.5101 6.75 14.9393 6.92779 15.2557 7.24426C15.5722 7.56073 15.75 7.98995 15.75 8.4375V14.0625"
                stroke="#919191"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p className="text-xs text-[#919191]">
              {moment(transaction.date || transaction.schedule_date).format(
                'MMM Do YYYY'
              )}
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-end space-y-1">
        <p className="text-brand-primary text-sm font-semibold">
          cUSD {formatcUsd(Number(transaction.amount))}
        </p>
        <TransactionStatus status={transaction.status} />
      </div>
    </div>
  );
};

export default ScheduleCard;
