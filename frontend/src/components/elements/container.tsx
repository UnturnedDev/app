import { cn } from '@/lib/utils';
import { ComponentPropsWithoutRef, HtmlHTMLAttributes } from 'react';

type ContainerProps = ComponentPropsWithoutRef<'div'>;

export function Container({ className, children, ...props }: ContainerProps) {
    return (
        <div
            className={cn(
                'max-w-6xl mx-auto container px-2 sm:px-6 md:px-20',
                className,
            )}
        >
            {children}
        </div>
    );
}
