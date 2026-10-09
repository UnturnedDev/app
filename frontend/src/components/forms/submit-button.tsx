import type { LucideIcon } from 'lucide-react';
import { useFormContext } from '@/lib/forms';
import { Button } from '../ui/button';
import { Spinner } from '../ui/spinner';
import { ComponentProps } from 'react';

type SubmitButtonProps = ComponentProps<typeof Button> & {
    label: string;
    icon: LucideIcon;
};

export function SubmitButton({ label, ...props }: SubmitButtonProps) {
    const form = useFormContext();
    const { icon: _, ...rest } = props;

    return (
        <form.Subscribe selector={(s) => s.isSubmitting}>
            {(isSubmitting) => (
                <Button type="submit" {...rest}>
                    {isSubmitting && <Spinner />}
                    {!isSubmitting && <props.icon />}
                    {label}
                </Button>
            )}
        </form.Subscribe>
    );
}
