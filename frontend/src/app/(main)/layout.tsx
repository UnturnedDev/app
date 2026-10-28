import { SiteNavbar } from '@/components/elements/ navbar/site-navbar';

export default function MainLayout({ children }: LayoutProps<'/'>) {
    return (
        <div className="flex min-h-svh flex-col">
            <SiteNavbar />
            <main className="flex-1">{children}</main>
        </div>
    );
}
