import { SubmitButton } from '@/components/forms/submit-button';
import { TextField } from '@/components/forms/text-field';
import {
    createFormHookContexts,
    createFormHook,
} from '@tanstack/react-form-nextjs';

const { fieldContext, formContext, useFieldContext, useFormContext } =
    createFormHookContexts();

const { useAppForm } = createFormHook({
    fieldComponents: {
        TextField,
    },
    formComponents: {
        SubmitButton,
    },
    fieldContext,
    formContext,
});

function getFormError(error: unknown): string | null {
    if (typeof error === 'string') return error;
    if (
        error &&
        typeof error === 'object' &&
        'form' in error &&
        typeof error.form === 'string'
    ) {
        return error.form;
    }
    return null;
}

export { useAppForm, useFormContext, useFieldContext, getFormError };
