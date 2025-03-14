import type React from 'react';
import Skeleton from 'react-loading-skeleton';

interface NumberProps {
  value: number | undefined;
  wholeNumberClassName: string;
  decimalClassName: string;
  isLoading?: boolean;
}

const FormatBalance: React.FC<NumberProps> = ({
  value,
  wholeNumberClassName,
  decimalClassName,
  isLoading,
}) => {
  const wholePart = value && Math.floor(value);
  const decimalPart =
    value && value % 1 !== 0 ? value.toString().split('.')[1] : null;

  return (
    <div>
      {!isLoading && value && (
        <div>
          <span className={wholeNumberClassName}>{wholePart}</span>
          {decimalPart && (
            <span className={decimalClassName}>.{decimalPart}</span>
          )}
        </div>
      )}

      {isLoading && <Skeleton className="h-12" />}
    </div>
  );
};

export default FormatBalance;
