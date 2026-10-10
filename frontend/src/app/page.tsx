import { BrandBackdrop } from '@/components/elements/brand-backdrop/brand-backdrop';
import { Button } from '@/components/ui/button';

export default function HomePage() {
    return (
        <main>
            <section className="relative isolate overflow-hidden">
                <BrandBackdrop
                    className="absolute inset-0 -z-10"
                    showBrandIcon={false}
                />

                <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-6 py-32 text-center text-primary-foreground">
                    <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
                        Welcome to Unturned.dev
                    </h1>
                    <p className="text-lg text-primary-foreground max-w-md">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Nulla omnis eos fuga nemo magni reiciendis laboriosam
                    </p>
                    <div className="flex gap-3">
                        <Button size="lg" variant="secondary">
                            Get started
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            className="border-white/40 bg-transparent text-white hover:bg-white/10 hover:text-white"
                        >
                            Learn more
                        </Button>
                    </div>
                </div>
            </section>
        </main>
    );
}
