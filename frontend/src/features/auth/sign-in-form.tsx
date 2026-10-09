'use client';

import { authClient } from '@/auth/client';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { getFormError, useAppForm } from '@/lib/forms';
import { getSafeRedirect } from '@/lib/utils';
import { useSelector } from '@tanstack/react-form-nextjs';
import { AlertTriangleIcon, LogInIcon } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { toast } from 'sonner';
import { z } from 'zod';

const signInSchema = z.object({
    email: z.email(),
    password: z.string().min(1),
});

const INVALID_CREDENTIALS_MESSAGE = 'Invalid email or password';

export function SignInForm() {
    return (
        <Suspense fallback={<SignInFormSkeleton />}>
            <SignInFormInner />
        </Suspense>
    );
}

function FieldSkeleton({ labelWidth }: { labelWidth: string }) {
    return (
        <div className="flex flex-col gap-2">
            <Skeleton className={`h-4 ${labelWidth}`} />
            <Skeleton className="h-8 w-full" />
        </div>
    );
}

function SignInFormSkeleton() {
    return (
        <div
            className="space-y-6"
            role="status"
            aria-busy="true"
            aria-label="Loading sign in form"
        >
            <div className="flex flex-col items-center gap-2">
                <Skeleton className="h-7 w-64" />
                <Skeleton className="h-4 w-72 max-w-full" />
            </div>

            <FieldSkeleton labelWidth="w-10" />
            <FieldSkeleton labelWidth="w-16" />

            <Skeleton className="h-9 w-full" />
        </div>
    );
}

function SignInFormInner() {
    const router = useRouter();
    const search = useSearchParams();
    const redirectTo = getSafeRedirect(search.get('callback_url'));

    const form = useAppForm({
        defaultValues: {
            email: '',
            password: '',
        },
        validators: {
            onSubmit: signInSchema,
        },
        onSubmit: async ({ value, formApi }) => {
            const { data, error } = await authClient.signIn.email({
                email: value.email,
                password: value.password,
            });

            if (error) {
                if (error.code === 'INVALID_EMAIL_OR_PASSWORD') {
                    formApi.setErrorMap({
                        onSubmit: {
                            form: INVALID_CREDENTIALS_MESSAGE,
                            fields: { email: INVALID_CREDENTIALS_MESSAGE },
                        },
                    });
                    formApi.setFieldValue('password', '', {
                        dontValidate: true,
                    });
                } else {
                    toast.error(
                        'Oops! An error occurred trying to sign in...',
                        {
                            description: error.message,
                        },
                    );
                }
                return;
            }

            toast.success(`Welcome back, ${data.user.name}!`, {
                description: 'Redirecting...',
            });

            router.push(redirectTo);
        },
    });

    const formError = useSelector(form.store, (state) =>
        getFormError(state.errorMap.onSubmit),
    );

    return (
        <form
            className="space-y-6"
            onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();

                void form.handleSubmit();
            }}
        >
            <div className="flex flex-col items-center gap-1 text-center">
                <h1 className="text-2xl font-bold">Sign In to Unturned.dev</h1>
                <p className="text-sm text-balance text-muted-foreground">
                    Enter your email below to login to your account
                </p>
            </div>

            {formError && (
                <Alert variant="destructive">
                    <AlertTriangleIcon />
                    <AlertTitle>
                        Oops! An error occurred signing in...
                    </AlertTitle>
                    <AlertDescription>{formError}</AlertDescription>
                </Alert>
            )}

            <form.AppField name="email">
                {(field) => (
                    <field.TextField
                        label="Email"
                        type="email"
                        placeholder="m@unturned.dev"
                    />
                )}
            </form.AppField>

            <form.AppField name="password">
                {(field) => (
                    <field.TextField
                        label="Password"
                        type="password"
                        placeholder="Password"
                    />
                )}
            </form.AppField>

            <form.AppForm>
                <form.SubmitButton
                    label="Sign In"
                    icon={LogInIcon}
                    size="lg"
                    className="w-full"
                />
            </form.AppForm>
        </form>
    );
}
