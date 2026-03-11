import { twMerge } from 'tailwind-merge';
import { Typography } from 'src/components/shared/Typography';

export interface InputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange' | 'value'
> {
  value: string;
  onChange: (value: string) => void;
  format?: (value: string) => string;
  placeholder?: string;
  isValid: boolean;
  error?: string;
  className?: string;
}

export const Input = ({
  value,
  onChange,
  format,
  placeholder,
  isValid,
  error,
  className,
  ...props
}: InputProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    if (format) {
      const formatted = format(raw);
      onChange(formatted);
      return;
    }
    onChange(raw);
  };

  const showError = !isValid;

  return (
    <div className="relative">
      <input
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className={twMerge(
          'bg-white rounded-lg border border-primary px-4 py-2.5 w-full focus:outline-1 focus:outline-primary-30 placeholder:text-primary-30',
          showError && 'border-alert-red',
          className,
        )}
        {...props}
      />
      {error && (
        <Typography
          className="absolute -bottom-4.5 left-0"
          variant="caption"
          color="danger"
        >
          {error}
        </Typography>
      )}
    </div>
  );
};
