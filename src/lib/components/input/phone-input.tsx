/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-param-reassign */
/* eslint-disable react/jsx-pascal-case */
import type { FieldHelperProps, FieldMetaProps } from 'formik';
import { CheckIcon, ChevronsUpDown } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import * as React from 'react';
import * as RPNInput from 'react-phone-number-input';
import flags from 'react-phone-number-input/flags';

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from '../ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { ScrollArea } from '../ui/scroll-area';
import { cn } from '@/lib/styles/utils';

import InputLabel from './inputLabel';

type InputPhoneProps = Omit<
  React.ComponentProps<'input'>,
  'onChange' | 'value' | 'ref'
> &
  Omit<RPNInput.Props<typeof RPNInput.default>, 'onChange'> &
  FieldMetaProps<string> &
  FieldHelperProps<unknown> & {
    onChange?: (value: RPNInput.Value) => void;
    label?: string;
    labelClassName?: string;
    containerClassName?: string;
  };

const FlagComponent = ({ country, countryName }: RPNInput.FlagProps) => {
  const Flag = flags[country];

  return (
    <span className="bg-foreground/20 flex h-4 w-6 overflow-hidden rounded-sm">
      {Flag && <Flag title={countryName} />}
    </span>
  );
};

interface CountrySelectOptionProps extends RPNInput.FlagProps {
  selectedCountry: RPNInput.Country;
  onChange: (country: RPNInput.Country) => void;
}

const CountrySelectOption = ({
  country,
  countryName,
  selectedCountry,
  onChange,
}: CountrySelectOptionProps) => {
  return (
    <CommandItem className="gap-2" onSelect={() => onChange(country)}>
      <FlagComponent country={country} countryName={countryName} />
      <span className="flex-1 text-sm">{countryName}</span>
      <span className="text-foreground/50 text-sm">{`+${RPNInput.getCountryCallingCode(
        country
      )}`}</span>
      <CheckIcon
        className={`ml-auto size-4 ${
          country === selectedCountry ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </CommandItem>
  );
};

const CountrySelect = ({
  disabled,
  value: selectedCountry,
  options: countryList,
  onChange,
}: CountrySelectProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          aria-label="Select country"
          // variant='outline'
          className={cn(
            'flex items-center gap-1 rounded-e-none rounded-s-[16px] px-3 py-4 focus:z-10',
            'border-0 focus:shadow-none focus:outline-none focus:ring-0 focus-visible:outline-none',
            'focus:bg-primary/5',
            'pl-4'
          )}
          disabled={disabled}
        >
          <FlagComponent
            country={selectedCountry}
            countryName={selectedCountry}
          />
          <ChevronsUpDown
            className={cn(
              '-mr-2 size-4 opacity-50',
              disabled ? 'hidden' : 'opacity-100'
            )}
          />
        </button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-[300px] bg-white p-0">
        <Command>
          <CommandList>
            <ScrollArea className="h-max max-h-72 overflow-y-auto">
              <CommandEmpty>No country found.</CommandEmpty>
              <CommandGroup>
                {countryList.map(({ value, label }) =>
                  value ? (
                    <CountrySelectOption
                      key={value}
                      country={value}
                      countryName={label}
                      selectedCountry={selectedCountry}
                      onChange={onChange}
                    />
                  ) : null
                )}
              </CommandGroup>
            </ScrollArea>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

const InputComponent = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<'input'>
>(({ className, ...props }, ref) => (
  <input
    className={cn(
      'w-full',
      'border-0 focus:shadow-none focus:outline-none focus:ring-0 focus-visible:outline-none',
      'rounded-e-[16px] rounded-s-none py-3 pr-4',
      'disabled:cursor-not-allowed disabled:opacity-50',
      'bg-transparent text-sm',
      className
    )}
    {...props}
    ref={ref}
  />
));
InputComponent.displayName = 'InputComponent';

const InputPhone: React.ForwardRefExoticComponent<InputPhoneProps> =
  React.forwardRef<React.ElementRef<typeof RPNInput.default>, InputPhoneProps>(
    (
      {
        className,
        onChange,
        setValue,
        setError: _setError,
        setTouched,
        touched,
        error,
        label,
        labelClassName,
        id,
        containerClassName,
        initialTouched: _initialTouched,

        ...props
      },
      ref
    ) => {
      delete props.initialError;

      delete props.initialValue;

      function handleBlur() {
        setTouched(true);
      }
      return (
        <div
          className={cn(
            'flex w-full flex-col items-start gap-2',
            containerClassName
          )}
        >
          {label && id && (
            <InputLabel
              id={id}
              label={label}
              className={cn('text-sm font-normal', labelClassName)}
            />
          )}
          <RPNInput.default
            ref={ref}
            defaultCountry="NG"
            // countries={['NG', 'GH', 'ZA']}
            className={cn(
              'flex w-full',
              'focus-within:ring-brand-primary rounded-xl focus-within:ring focus-within:ring-offset-2',
              'border-input-border/70 border',
              'bg-white',
              // [touched && !error && props.value && 'border-primary'],
              className
            )}
            flagComponent={FlagComponent}
            countrySelectComponent={CountrySelect}
            inputComponent={InputComponent}
            smartCaret={false}
            withCountryCallingCode
            international
            countryCallingCodeEditable={false}
            /**
             * Handles the onChange event.
             *
             * react-phone-number-input might trigger the onChange event as undefined
             * when a valid phone number is not entered. To prevent this,
             * the value is coerced to an empty string.
             *
             * @param {E164Number | undefined} value - The entered value
             */
            onChange={(value) => {
              onChange?.(value || ('' as RPNInput.Value));

              setValue?.(value || ('' as RPNInput.Value), true);
            }}
            onBlur={handleBlur}
            onFocus={handleBlur}
            {...props}
          />

          {touched && error && (
            <AnimatePresence>
              {touched && error && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 100 }}
                  transition={{ ease: 'easeOut', duration: 0.5 }}
                  className="text-xs font-semibold text-red-500"
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>
      );
    }
  );
InputPhone.displayName = 'InputPhone';

type CountryEntry = { label: string; value: RPNInput.Country | undefined };

type CountrySelectProps = {
  disabled?: boolean;
  value: RPNInput.Country;
  options: CountryEntry[];
  onChange: (country: RPNInput.Country) => void;
};

export { InputPhone };
