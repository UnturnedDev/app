import { useFieldContext } from '@/lib/forms';
import { Field, FieldLabel } from '../ui/field';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '../ui/select';
import { LucideIcon } from 'lucide-react';

type SelectFieldProps = {
    label: string;
    placeholder?: string;
    options: {
        label: string;
        value: string;
        icon?: LucideIcon;
    }[];
};

export function SelectField({ label, placeholder, options }: SelectFieldProps) {
    const field = useFieldContext<string>();
    const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

    return (
        <Field data-invalid={isInvalid}>
            <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
            <Select
                name={field.name}
                value={field.state.value}
                onValueChange={(v) => field.handleChange(v ?? '')}
            >
                <SelectTrigger>
                    <SelectValue
                        className={'min-w-30'}
                        aria-invalid={isInvalid}
                        placeholder={placeholder}
                    />
                </SelectTrigger>
                <SelectContent>
                    {options.map((opt) => (
                        <SelectItem key={opt.label} value={opt.value}>
                            {opt.icon && <opt.icon />}
                            {opt.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </Field>
    );
}
