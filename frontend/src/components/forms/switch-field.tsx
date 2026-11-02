'use client';

import { useFieldContext } from '@/lib/forms';
import { Field, FieldContent, FieldDescription, FieldLabel } from '../ui/field';
import { Switch } from '../ui/switch';

type SwitchFieldProps = {
    label: string;
    description?: string;
};
export function SwitchField({ label, description }: SwitchFieldProps) {
    const field = useFieldContext<boolean>();
    const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

    return (
        <Field orientation={'horizontal'} data-invalid={isInvalid}>
            <FieldContent>
                <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
                {description && (
                    <FieldDescription>{description}</FieldDescription>
                )}
            </FieldContent>
            <Switch
                id={field.name}
                name={field.name}
                checked={field.state.value}
                onCheckedChange={field.handleChange}
                aria-invalid={isInvalid}
            />
        </Field>
    );
}
