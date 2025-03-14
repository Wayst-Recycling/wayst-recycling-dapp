import { Check, ChevronDown } from 'lucide-react';
import * as React from 'react';

import { cn } from '../styles/utils';

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from './ui/command';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';

const currencies = [
  {
    value: 'ngn',
    label: (
      <div className="flex items-center space-x-1">
        <img
          src="/assets/ng.png"
          alt="ng"
          className="relative aspect-square w-4"
        />
        <p className="text-xs font-medium">Nigerian Naira ~ NGN</p>
      </div>
    ),
  },
];

export function CurrencySelect() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('');

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          role="combobox"
          aria-controls="currencies"
          aria-expanded={open}
          className="flex items-center space-x-3 rounded-lg border p-1"
        >
          {value
            ? currencies.find((currency) => currency.value === value)?.label
            : currencies[0].label}
          <ChevronDown className="ml-2 h-4 w-4 shrink-0" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="bg-white p-0">
        <Command>
          <CommandInput className="text-xs" placeholder="Search currency..." />
          <CommandList>
            <CommandEmpty>No currency found.</CommandEmpty>
            <CommandGroup>
              {currencies.map((currency) => (
                <CommandItem
                  key={currency.value}
                  value={currency.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? '' : currentValue);
                    setOpen(false);
                  }}
                >
                  <Check className={cn('mr-2 h-4 w-4 opacity-100')} />
                  {currency.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
