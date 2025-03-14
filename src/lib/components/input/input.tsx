/* eslint-disable no-param-reassign */
/* eslint-disable complexity */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
// import Loader from 'components/Loader';
import { AnimatePresence, motion } from 'framer-motion';
import { Loader, Search } from 'lucide-react';
import { useState } from 'react';
import { HiMiniEye, HiMiniEyeSlash } from 'react-icons/hi2';

import { cn } from '@/lib/styles/utils';

import InputLabel from './inputLabel';
import type { InputProps } from './types';

const Input = ({
  id,
  className,
  labelClassName,
  label,
  type = 'text',
  variant = 'primary',
  required,
  touched,
  error,
  containerClassName,
  value,
  helperText,
  eagerError,
  inputClassName,
  hiddenState = false,
  searchIcon = false,
  isLoading = false,
  ...rest
  // eslint-disable-next-line sonarjs/cognitive-complexity
}: InputProps) => {
  const [hidden, setHidden] = useState<boolean>(true);

  const toggleVisibility = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    setHidden((prevState) => !prevState);
  };

  delete rest.initialError;
  delete rest.initialTouched;
  delete rest.initialValue;

  return (
    !hiddenState && (
      <div className="w-full">
        <div className="mb-1 flex flex-col gap-2">
          {((label && !!label.length) ||
            (helperText && !!helperText.length)) && (
            <div className="flex flex-col items-start justify-center gap-1">
              {label && !!label.length && (
                <InputLabel
                  className={cn('text-sm font-medium', labelClassName)}
                  id={id}
                  label={label}
                />
              )}
              {helperText && !!helperText.length && (
                <label
                  htmlFor={id}
                  className="text-xs font-medium text-red-500 2xl:text-sm"
                >
                  {helperText}
                </label>
              )}
            </div>
          )}
          {type === 'password' && (
            <div
              className={cn(
                'relative flex w-full flex-row items-center overflow-hidden rounded-lg border border-transparent transition-all duration-300 ease-linear',
                [variant === 'primary' && 'bg-primary-grey'],
                [containerClassName]
              )}
            >
              <input
                type={hidden ? 'password' : 'text'}
                value={value}
                autoComplete="off"
                id={id}
                {...rest}
                className={cn(
                  'placeholder:text-grey-text text-primary-black h-12 w-full rounded-lg border border-transparent bg-transparent px-3 py-1 text-sm shadow-none placeholder:text-sm disabled:cursor-not-allowed',
                  'focus:border-platnova-purple focus:border-2 focus:outline-none',
                  [className],
                  [inputClassName],
                  [touched && error && 'border-error-primary']
                )}
                required={required}
              />

              <span className="absolute right-3 -translate-x-1/2">
                {!hidden ? (
                  <span
                    onClick={toggleVisibility}
                    className="text-grey-text h-4 w-6 select-none text-base font-medium"
                  >
                    <HiMiniEye className="h-4 w-6" />
                  </span>
                ) : (
                  <span
                    onClick={toggleVisibility}
                    className="text-grey-text h-4 w-6 select-none text-base font-medium"
                  >
                    <HiMiniEyeSlash className="h-4 w-6" />
                  </span>
                )}
              </span>
            </div>
          )}

          {(type === 'email' ||
            type === 'date' ||
            type === 'text' ||
            type === 'number' ||
            type === 'tel' ||
            type === 'time') && (
            <div
              className={cn(
                'relative flex w-full flex-row items-center overflow-hidden rounded-lg transition-all duration-300 ease-linear',
                [variant === 'primary' && 'border-2 border-gray-400 bg-white'],
                [variant === 'secondary' && 'bg-primary-grey'],
                [containerClassName]
              )}
            >
              {searchIcon && (
                <Search
                  className="text-grey-text/40 absolute left-4"
                  size={16}
                />
              )}
              <input
                type={type}
                value={value}
                id={id}
                {...rest}
                className={cn(
                  'placeholder:text-grey-text text-primary-black h-12 w-full rounded-lg border border-transparent bg-transparent px-3 py-1 text-sm shadow-none placeholder:text-sm disabled:cursor-not-allowed',
                  'focus:border-platnova-purple focus:border focus:outline-none',
                  searchIcon && 'pl-16',
                  [className],
                  [inputClassName],
                  [touched && error && 'border-error-primary']
                )}
                required={required}
              />
              {isLoading && <Loader />}
            </div>
          )}
        </div>
        <AnimatePresence>
          <div className="">
            {(eagerError || touched) && error && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 100 }}
                transition={{ ease: 'easeOut', duration: 0.5 }}
                className="pl-1 text-xs font-semibold text-red-500"
              >
                {error}
              </motion.div>
            )}
          </div>
        </AnimatePresence>
      </div>
    )
  );
};

export default Input;
