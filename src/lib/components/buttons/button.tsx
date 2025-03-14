/* eslint-disable react/button-has-type */
import * as React from 'react';

import Loader from '../loader';
import { cn } from '@/lib/styles/utils';

type ButtonProps = {
  className?: string;
  variant?: 'primary' | 'secondary';
  isDisabled?: boolean;
  isLoading?: boolean;
} & React.ComponentPropsWithRef<'button'>;

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      children,
      variant = 'primary',
      isDisabled = false,
      isLoading = false,
      ...rest
    },
    ref
  ) => {
    return !isLoading ? (
      <button
        ref={ref}
        className={cn(
          'h-10 w-full rounded-[8px] px-4 py-2 text-xs font-medium shadow-md hover:bg-opacity-90 hover:shadow-none md:h-14 xl:text-sm',
          'transition-colors duration-500',
          [isDisabled && 'cursor-not-allowed bg-gray-600'],
          [variant === 'primary' && 'bg-[#036937] text-white'],
          [
            variant === 'secondary' &&
              'text-platnova-purple bg-platnova-secondary',
          ],
          className
        )}
        disabled={isDisabled}
        {...rest}
      >
        {children}
      </button>
    ) : (
      <Loader />
    );
  }
);

export default Button;
