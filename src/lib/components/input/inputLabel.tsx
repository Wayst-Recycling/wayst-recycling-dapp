import type { ReactNode } from 'react';

import { cn } from '@/lib/styles/utils';

interface InputLabelProps {
  id?: string;
  label?: ReactNode;
  className?: string;
}

const InputLabel = ({ id, label, className }: InputLabelProps) => {
  if (!id || !label) {
    return <div />;
  }
  return (
    <label htmlFor={id} className={cn('font-medium', [className])}>
      {label}
    </label>
  );
};

export default InputLabel;
