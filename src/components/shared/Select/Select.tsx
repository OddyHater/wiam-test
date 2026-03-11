import { Select as MantineSelect } from '@mantine/core';
import { twMerge } from 'tailwind-merge';
import { Typography } from 'src/components/shared/Typography';

export interface SelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface SelectProps extends Omit<
  React.ComponentProps<typeof MantineSelect>,
  'onChange' | 'value'
> {
  value: string;
  onChange: (value: string) => void;
  isValid?: boolean;
  error?: string;
  required?: boolean;
  options: SelectOption[];
  placeholder?: string;
  className?: string;
}

export const Select = ({
  value,
  onChange,
  isValid,
  error,
  required = false,
  options,
  placeholder,
  className,
  ...props
}: SelectProps) => {
  const handleChange = (nextValue: string | null) => {
    onChange(nextValue ?? '');
  };

  return (
    <div className="relative">
      <MantineSelect
        data={options}
        value={value}
        required={required}
        onChange={handleChange}
        placeholder={placeholder}
        allowDeselect={false}
        checkIconPosition="right"
        className={twMerge('w-full', className)}
        styles={{
          input: {
            borderColor: isValid ? '' : 'var(--color-alert-red)',
          },
        }}
        rightSection={
          <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z"
              fill="currentColor"
              fillRule="evenodd"
              clipRule="evenodd"
            />
          </svg>
        }
        {...props}
      />
      {error && (
        <Typography
          variant="caption"
          color="danger"
          className="absolute left-0 -bottom-4.5"
        >
          {error}
        </Typography>
      )}
    </div>
  );
};
