import type { PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';

interface PageContainerProps extends PropsWithChildren {
  className?: string;
}

export const PageContainer = ({ children, className }: PageContainerProps) => {
  return (
    <div className={twMerge('flex h-screen items-center justify-center', className)}>
      {children}
    </div>
  );
};
