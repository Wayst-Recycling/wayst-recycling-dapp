import { useSearchParams } from 'react-router-dom';

import ScheduleCard from '../../schedule/components/ScheduleCard';
import { useGetSchedules } from '@/api/schedule';
import Loader from '@/lib/components/loader';
import Pagination from '@/lib/components/pagination';
import { cn } from '@/lib/styles/utils';

const ScheduleList = ({ home = false }: { home?: boolean }) => {
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page');
  const { data: schedules, isPending: isLoadingGetSchedules } = useGetSchedules(
    { page: Number(page) || 1, limit: home ? 3 : 10 }
  );

  return (
    <div
      className={cn('mt-10 flex flex-col items-center space-y-2 pb-20', [
        home && 'mt-0 pb-0',
      ])}
    >
      {schedules &&
        !isLoadingGetSchedules &&
        schedules.data.map((transaction) => (
          <ScheduleCard transaction={transaction} key={transaction.id} />
        ))}

      {!home && schedules && schedules.totalPages > 1 && (
        <Pagination totalPages={schedules.totalPages} />
      )}

      {isLoadingGetSchedules && <Loader />}

      {!isLoadingGetSchedules && (!schedules || schedules.total === 0) && (
        <div className="mx-auto flex max-w-[60%] flex-col items-center text-center">
          <img
            className="mx-auto pt-10"
            src="/assets/garbage.png"
            alt="empty"
          />
          <p className="text-sm font-semibold">No schedule history</p>
          <p className="text-xs text-gray-500">
            Your schedule history is currently empty. Start recycling today to
            see your impact.
          </p>
        </div>
      )}
    </div>
  );
};

export default ScheduleList;
