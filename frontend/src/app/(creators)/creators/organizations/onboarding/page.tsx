import { Container } from '@/components/elements/container';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { OnboardingForm } from '@/features/creators/forms/onboarding-form';
import { SparklesIcon, StoreIcon } from 'lucide-react';

export default function CreatorOnboardingPage() {
    return (
        <main className="py-6">
            <Card className="shadow-sm">
                <CardHeader className="border-b">
                    <div className="flex items-center gap-3">
                        <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                            <StoreIcon aria-hidden className="size-5" />
                        </span>
                        <div className="space-y-1">
                            <CardTitle>Create Organization</CardTitle>
                            <CardDescription>
                                Onboard your storefront and start selling your
                                products! You can change these later in your
                                settings.
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="pt-6">
                    <OnboardingForm />
                </CardContent>
            </Card>
        </main>
    );
}
