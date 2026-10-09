import type { HTMLInputTypeAttribute } from 'react';
import { Field, FieldError, FieldLabel } from '../ui/field';
import { useFieldContext } from '@/lib/forms';
import { Input } from '../ui/input';

type TextFieldProps = {
    label: string;
    type: HTMLInputTypeAttribute;
    placeholder?: string;
};

export function TextField({ label, type, placeholder }: TextFieldProps) {
    const field = useFieldContext<string | number>();
    const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
    const isNumber = type === 'number';

    return (
        <Field data-invalid={isInvalid}>
            <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
            <Input
                id={field.name}
                type={type}
                name={field.name}
                value={field.state.value}
                placeholder={placeholder}
                aria-invalid={isInvalid}
                onBlur={(e) => {
                    field.handleBlur();

                    const valueRaw = e.target.value;
                    if (isNumber && valueRaw != '') {
                        const numValue = Number(valueRaw);
                        if (!isNaN(numValue)) field.handleChange(numValue);
                    }
                }}
                onChange={(e) => field.handleChange(e.target.value)}
            />
            {isInvalid && <FieldError errors={field.state.meta.errors} />}
        </Field>
    );
}
