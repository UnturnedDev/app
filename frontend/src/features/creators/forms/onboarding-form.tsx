'use client';

import { authClient } from '@/auth/client';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useAppForm } from '@/lib/forms';
import { slugify } from '@/lib/utils';
import { AlertTriangleIcon, PlusCircleIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import z from 'zod';

const onboardingSchema = z.object({
    name: z
        .string()
        .trim()
        .min(2, 'Name must be at least 2 characters')
        .max(50, 'Name must be 50 characters or fewer'),
    slug: z
        .string()
        .min(3, 'Slug must be at least 3 characters')
        .max(40, 'Slug must be 40 characters or fewer')
        .regex(
            /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
            'Use lowercase letters, numbers, and single hyphens only',
        ),
});

export function OnboardingForm() {
    const router = useRouter();
    const [formError, setFormError] = useState<string | null>(null);

    const form = useAppForm({
        defaultValues: {
            name: '',
            slug: '',
        },
        validators: {
            onChange: onboardingSchema,
        },
        onSubmit: async ({ value }) => {
            setFormError(null);

            const { error } = await authClient.organization.create({
                name: value.name,
                slug: value.slug,
                keepCurrentActiveOrganization: false,
            });

            if (error) {
                const msg =
                    error.message ??
                    'An unknown error occurred. Please try again';
                setFormError(msg);
                return;
            }

            router.push('/dashboard');
            router.refresh();
        },
    });

    return (
        <form
            className="grid items-center sm:grid-cols-2 gap-6"
            onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();

                void form.handleSubmit();
            }}
        >
            {formError && (
                <div className="sm:col-span-full">
                    <Alert variant={'destructive'}>
                        <AlertTriangleIcon />
                        <AlertTitle>Oops! An error occurred...</AlertTitle>
                        <AlertDescription>{formError}</AlertDescription>
                    </Alert>
                </div>
            )}
            <form.AppField
                name="name"
                listeners={{
                    onChange: ({ value }) => {
                        if (!form.getFieldMeta('slug')?.isDirty) {
                            form.setFieldValue('slug', slugify(value), {
                                dontUpdateMeta: true,
                            });
                        }
                    },
                }}
            >
                {(field) => (
                    <field.TextField
                        label="Name"
                        type="text"
                        placeholder="Example Store"
                    />
                )}
            </form.AppField>
            <form.AppField name="slug">
                {(field) => (
                    <field.TextField
                        label="Slug"
                        type="text"
                        placeholder="example-org-slug"
                    />
                )}
            </form.AppField>

            <form.AppForm>
                <div className="sm:col-span-full flex justify-end">
                    <form.SubmitButton
                        label="Create Organization"
                        icon={PlusCircleIcon}
                    />
                </div>
            </form.AppForm>
        </form>
    );
}
