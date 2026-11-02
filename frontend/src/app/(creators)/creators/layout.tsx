import { SiteNavbar } from '@/components/elements/ navbar/site-navbar';
import { SiteSubNav } from '@/components/elements/ navbar/site-subnav';
import { Container } from '@/components/elements/container';

export default function CreatorsLayout({ children }: LayoutProps<'/creators'>) {
    return (
        <div className="flex flex-col min-h-svh">
            <SiteNavbar />
            <SiteSubNav section="creator" />
            <Container className="flex-1">{children}</Container>
        </div>
    );
}
