import { FieldDescription, FieldGroup } from '@/components/ui/field';
import { SignUpForm } from '@/features/auth/sign-up-form';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Sign In | Unturned.dev',
};

export default function SignUpPage() {
    return (
        <main>
            <FieldGroup>
                <SignUpForm />
                <FieldDescription className="text-center">
                    Already have an account?{' '}
                    <Link
                        href="/sign-in"
                        className="underline underline-offset-4"
                    >
                        Sign in
                    </Link>
                </FieldDescription>
            </FieldGroup>
        </main>
    );
}
