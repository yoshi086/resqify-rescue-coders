import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface StickyFooterProps {
  children: ReactNode;
  className?: string;
}

/**
 * Mobile-safe sticky footer used for primary actions (Save/Submit/Apply).
 * Sits above content, remains visible, and has elevation + contrast.
 */
export function StickyFooter({ children, className }: StickyFooterProps) {
  return (
    <div
      className={cn(
        'sticky bottom-0 z-20 bg-card/95 backdrop-blur-md border-t border-border px-6 py-4 safe-bottom shadow-card',
        className
      )}
    >
      {children}
    </div>
  );
}
