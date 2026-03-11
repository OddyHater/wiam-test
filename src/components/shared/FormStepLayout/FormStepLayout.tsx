import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';
import { Typography } from 'src/components/shared/Typography';

interface FormStepLayoutProps extends Omit<ComponentPropsWithoutRef<'form'>, 'title'> {
  title: string;
  description: string;
  actions?: ReactNode;
  fieldsClassName?: string;
}

export const FormStepLayout = ({
  title,
  description,
  actions,
  children,
  className,
  fieldsClassName,
  ...props
}: FormStepLayoutProps) => {
  return (
    <form
      className={twMerge(
        'flex max-w-100 flex-1 flex-col gap-8 rounded-2xl bg-white p-8',
        className,
      )}
      {...props}
    >
      <div className="flex flex-col gap-2">
        <Typography as="h1" variant="h3" weight="bold">
          {title}
        </Typography>
        <Typography variant="body" color="description">
          {description}
        </Typography>
      </div>
      <div className={twMerge('flex flex-col gap-6', fieldsClassName)}>{children}</div>
      {actions}
    </form>
  );
};
