import { twMerge } from 'tailwind-merge';
import { useState } from 'react';

interface InputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange' | 'value'
> {
  value: string;
  onChange: (value: string) => void;
  format: (value: string) => string;
  placeholder?: string;
  isValid: (value: string) => boolean;
  className?: string;
}

export const Input = ({
  value,
  onChange,
  format,
  placeholder,
  isValid,
  className,
  ...props
}: InputProps) => {
  const [isTouched, setIsTouched] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const formatted = format(raw);
    onChange(formatted);
  };

  const handleBlur = () => {
    setIsTouched(true);
  };

  const showError = isTouched && !isValid(value);

  return (
    <input
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      onBlur={handleBlur}
      className={twMerge(
        'bg-white rounded-lg border border-primary px-4 py-2.5 w-full focus:outline-2 focus:outline-primary-30',
        showError && 'border-alert-red',
        className,
      )}
      {...props}
    />
  );
};
