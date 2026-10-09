import { BrandBlueIcon } from '@/components/icons/brand/blue-icon';
import { BrandBlueWordmark } from '@/components/icons/brand/blue-wordmark';
import type { ReactNode } from 'react';
import { AuthBackdrop } from './auth-backdrop';
import Link from 'next/link';

type AuthContainerProps = {
    children: ReactNode;
};

export function AuthContainer({ children }: AuthContainerProps) {
    return (
        <div className="grid min-h-svh lg:grid-cols-2">
            <div className="flex flex-col gap-4 p-6 md:p-10">
                <div className="flex justify-center gap-2 md:justify-start">
                    <Link
                        href="/"
                        className="flex items-center gap-2 font-medium"
                    >
                        <BrandBlueIcon className="h-10 w-auto" />
                        <BrandBlueWordmark className="h-10 w-auto" />
                        <span className="sr-only">Unturned.dev</span>
                    </Link>
                </div>
                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full max-w-md">{children}</div>
                </div>
            </div>
            <AuthBackdrop />
        </div>
    );
}
