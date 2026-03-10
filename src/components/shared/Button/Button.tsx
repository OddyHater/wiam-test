import type { ButtonHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

export const Button = ({ className, disabled, variant = 'primary', ...props }: ButtonProps) => {
  const styles = {
    primary: 'bg-primary text-white hover:bg-primary-30',
    secondary: 'bg-secondary text-primary hover:bg-secondary-30',
  };

  return (
    <button
      disabled={disabled}
      className={twMerge(
        'rounded-sm font-regular transition-colors cursor-pointer text-[14px] leading-[1.2]',
        styles[variant],
        'disabled:bg-gray disabled:cursor-not-allowed',
        className,
      )}
      {...props}
    />
  );
};
