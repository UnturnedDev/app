import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import Image from 'next/image';

export default function Home() {
    return (
        <main>
            <Card>
                <CardHeader>
                    <CardTitle>Welcome to Unturned.dev!</CardTitle>
                    <CardDescription>
                        Please sign in to get started
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Button>Hello world!</Button>
                </CardContent>
            </Card>
        </main>
    );
}
