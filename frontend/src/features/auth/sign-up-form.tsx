'use client';

import { authClient } from '@/auth/client';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { getFormError, useAppForm } from '@/lib/forms';
import { getSafeRedirect } from '@/lib/utils';
import { useSelector } from '@tanstack/react-form-nextjs';
import { AlertTriangleIcon, UserPlusIcon } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { toast } from 'sonner';
import { z } from 'zod';

const signUpSchema = z
    .object({
        name: z.string().min(3),
        email: z.email(),
        password: z.string().min(8),
        confirmPassword: z.string(),
    })
    .refine((v) => v.password === v.confirmPassword, {
        error: 'Passwords do not match',
        path: ['confirmPassword'],
    });

export function SignUpForm() {
    return (
        <Suspense fallback={<SignUpFormSkeleton />}>
            <SignUpFormInner />
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

function SignUpFormSkeleton() {
    return (
        <div
            className="space-y-6"
            role="status"
            aria-busy="true"
            aria-label="Loading sign up form"
        >
            <div className="flex flex-col items-center gap-2">
                <Skeleton className="h-7 w-72 max-w-full" />
                <Skeleton className="h-4 w-80 max-w-full" />
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
                <FieldSkeleton labelWidth="w-12" />
                <FieldSkeleton labelWidth="w-10" />
            </div>
            <FieldSkeleton labelWidth="w-16" />
            <FieldSkeleton labelWidth="w-28" />

            <Skeleton className="h-9 w-full" />
        </div>
    );
}

function SignUpFormInner() {
    const router = useRouter();
    const search = useSearchParams();
    const redirectTo = getSafeRedirect(search.get('callback_url'));

    const form = useAppForm({
        defaultValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
        validators: {
            onSubmit: signUpSchema,
        },
        onSubmit: async ({ value }) => {
            const { data, error } = await authClient.signUp.email({
                name: value.name,
                email: value.email,
                password: value.password,
            });

            if (error) {
                toast.error('Oops! An error occurred trying to sign up...', {
                    description: error.message,
                });
                return;
            }

            toast.success(`Welcome to Unturned.dev, ${data.user.name}!`, {
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
                <h1 className="text-2xl font-bold">Sign up for Unturned.dev</h1>
                <p className="text-sm text-balance text-muted-foreground">
                    Fill out the details below to get started with your account.
                </p>
            </div>

            {formError && (
                <Alert variant="destructive">
                    <AlertTriangleIcon />
                    <AlertTitle>
                        Oops! An error occurred signing up...
                    </AlertTitle>
                    <AlertDescription>{formError}</AlertDescription>
                </Alert>
            )}

            <div className="grid gap-6 sm:grid-cols-2">
                <form.AppField name="name">
                    {(field) => (
                        <field.TextField
                            label="Name"
                            type="text"
                            placeholder="John Doe"
                        />
                    )}
                </form.AppField>
                <form.AppField name="email">
                    {(field) => (
                        <field.TextField
                            label="Email"
                            type="email"
                            placeholder="m@unturned.dev"
                        />
                    )}
                </form.AppField>
            </div>

            <form.AppField name="password">
                {(field) => (
                    <field.TextField
                        label="Password"
                        type="password"
                        placeholder="Password"
                    />
                )}
            </form.AppField>

            <form.AppField name="confirmPassword">
                {(field) => (
                    <field.TextField
                        label="Confirm Password"
                        type="password"
                        placeholder="Password"
                    />
                )}
            </form.AppField>

            <form.AppForm>
                <form.SubmitButton
                    label="Sign Up"
                    icon={UserPlusIcon}
                    size="lg"
                    className="w-full"
                />
            </form.AppForm>
        </form>
    );
}
