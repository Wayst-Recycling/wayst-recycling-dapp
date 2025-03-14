'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useId, useMemo } from 'react';
import ReactSelect from 'react-select';

import { cn } from '@/lib/styles/utils';

import styles from './styles/select.module.scss';
import type { SelectOption, SelectProps } from './types';

const Select = ({
  label,
  labelClassName,
  id,
  required,
  setTouched,
  setValue,
  placeholder,
  value,
  options,
  disabled,
  name,
  error,
  touched,
  onValueChange,
  isLoading,
  autoFocus,
  onSearch,
}: SelectProps) => {
  const handleChange = async (option: SelectOption | null) => {
    // logic here
    if (setValue && option) {
      await setValue(option.value, true);
    }

    if (onValueChange && option) {
      onValueChange(option);
    }
  };

  const handleBlur = async () => {
    if (setTouched) {
      await setTouched(true, true);
    }
  };

  const selectOption = 'Select Option';

  const selectedValue: SelectOption = useMemo(() => {
    if (!value || !options) {
      return { value: '', label: placeholder || selectOption };
    }
    const findSelected = options.find((option) => option.value === value);

    if (!findSelected) {
      return { value: '', label: placeholder || selectOption };
    }
    return findSelected;
  }, [options, value, placeholder]);

  return (
    <div className={`w-full ${styles.select_wrapper}`}>
      <div className="flex flex-col gap-2">
        {label && !!label.length && (
          <div className="flex items-center gap-1">
            <label
              htmlFor={id}
              className={cn(
                'text-primary-black text-sm font-normal',
                labelClassName
              )}
              id={id}
            >
              {label}
            </label>
          </div>
        )}
        <ReactSelect
          placeholder={`${placeholder || selectOption}`}
          value={selectedValue}
          autoFocus={autoFocus}
          options={options}
          onBlur={handleBlur}
          onFocus={handleBlur}
          id={id}
          onChange={handleChange}
          isDisabled={disabled}
          required={required}
          name={name}
          captureMenuScroll
          instanceId={useId()}
          onInputChange={(inputValue, actionMeta) => {
            if (actionMeta.action === 'input-change' && onSearch) {
              onSearch(inputValue); // Call the custom search handler
            }
          }}
          classNames={{
            option: (state) =>
              cn(
                'hover:bg-primary-orange/10 bg-transparent p-2 text-xs',
                [state.isSelected && 'text-primary-orange font-semibold'],
                [state.isFocused && 'bg-primary bg-opacity-10']
              ),
            control: () =>
              `w-full rounded-lg border-2 border-gray-400 ${
                error && touched && 'bg-red-500/10'
              } p-4 text-base outline-none transition-all duration-300 ease-in placeholder:text-xs xl:placeholder:text-sm flex react-select`,
            placeholder: () =>
              'text-secondary-grey text-xs md:text-sm lg:text-base',
            noOptionsMessage: () => 'text-xs lg:text-sm',
            dropdownIndicator: () => cn('text-primary-black/80 p-0'),
            input: () => cn('p-0'),
          }}
          styles={{
            control: () => {
              return {};
            },
            option: () => ({}),
            valueContainer: (baseStyles) => ({
              ...baseStyles,
              padding: 0,
              margin: 0,
            }),
            dropdownIndicator: () => ({}),
            input: (baseStyles) => ({ ...baseStyles, margin: 0, padding: 0 }),
            indicatorSeparator: () => ({}),
            placeholder: () => ({}),
            menuList: (base) => ({ ...base, maxHeight: '10rem' }),
          }}
          isLoading={isLoading}
        />
      </div>
      <AnimatePresence>
        {error && touched && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ ease: 'easeOut', duration: 0.5 }}
            className="pl-1 pt-1 text-xs font-semibold text-red-500"
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Select;
