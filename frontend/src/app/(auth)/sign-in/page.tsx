import {
    FieldDescription,
    FieldGroup,
    FieldSeparator,
} from '@/components/ui/field';
import { SignInForm } from '@/features/auth/sign-in-form';
import { SocialSignIn } from '@/features/auth/social-sign-in';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Sign In | Unturned.dev',
};

export default function SignInPage() {
    return (
        <main>
            <FieldGroup>
                <SignInForm />
                <FieldSeparator>Or continue with</FieldSeparator>
                <SocialSignIn />
                <FieldDescription className="text-center">
                    Don&apos;t have an account?{' '}
                    <Link
                        href="/sign-up"
                        className="underline underline-offset-4"
                    >
                        Sign up
                    </Link>
                </FieldDescription>
            </FieldGroup>
        </main>
    );
}
