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
  const hasValue = value !== undefined;
  const wholePart = hasValue ? Math.floor(value) : 0;
  const decimalPart =
    hasValue && value % 1 !== 0 ? value.toString().split('.')[1] : null;

  return (
    <div>
      {!isLoading && hasValue && (
        <div>
          <span className={wholeNumberClassName}>
            {wholePart.toLocaleString()}
          </span>
          {decimalPart && (
            <span className={decimalClassName}>.{decimalPart}</span>
          )}
        </div>
      )}

      {!isLoading && !hasValue && (
        <div>
          <span className={wholeNumberClassName}>0</span>
          <span className={decimalClassName}>.000</span>
        </div>
      )}

      {isLoading && <Skeleton className="h-12" />}
    </div>
  );
};

export default FormatBalance;
