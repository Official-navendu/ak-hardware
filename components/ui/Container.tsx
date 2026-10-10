import React from 'react';
import { cn } from '@/lib/utils';

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  clean?: boolean;
}

export const Container: React.FC<ContainerProps> = ({
  children,
  className,
  clean = false,
  ...props
}) => {
  return (
    <div
      className={cn(
        'w-full mx-auto max-w-[1536px]',
        !clean && 'px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
