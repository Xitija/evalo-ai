
import React from 'react';
import { cn } from '@/lib/utils';

interface PageContainerProps {
  className?: string;
  children: React.ReactNode;
  fullWidth?: boolean;
}

const PageContainer = ({ 
  className, 
  children, 
  fullWidth = false 
}: PageContainerProps) => {
  return (
    <div className={cn(
      'w-full px-4 py-6 md:px-8 md:py-10',
      fullWidth ? 'max-w-full' : 'max-w-7xl mx-auto',
      className
    )}>
      {children}
    </div>
  );
};

export default PageContainer;
