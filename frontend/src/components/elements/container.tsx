import { cn } from '@/lib/utils';
import { ComponentPropsWithoutRef } from 'react';

type ContainerProps = ComponentPropsWithoutRef<'div'>;

export function Container({ className, children, ...props }: ContainerProps) {
    return (
        <div
            className={cn(
                'mx-auto w-full max-w-6xl px-4 sm:px-6 md:px-8',
                className,
            )}
        >
            {children}
        </div>
    );
}
