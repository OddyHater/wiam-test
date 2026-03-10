import { twMerge } from 'tailwind-merge';

interface SelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

interface SelectProps
  extends Omit<
    React.SelectHTMLAttributes<HTMLSelectElement>,
    'children' | 'defaultValue' | 'onChange' | 'value'
  > {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  className?: string;
}

export const Select = ({
  value,
  onChange,
  options,
  placeholder,
  className,
  ...props
}: SelectProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value);
  };

  return (
    <select
      value={value}
      onChange={handleChange}
      className={twMerge(
        'bg-white rounded-lg border border-primary px-4 py-2.5 w-full focus:outline-2 focus:outline-primary-30',
        className,
      )}
      {...props}
    >
      {placeholder ? (
        <option value="" disabled>
          {placeholder}
        </option>
      ) : null}
      {options.map((option) => (
        <option key={option.value} value={option.value} disabled={option.disabled}>
          {option.label}
        </option>
      ))}
    </select>
  );
};
