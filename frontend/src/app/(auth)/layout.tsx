import { AuthContainer } from '@/features/auth/auth-container';

export default function AuthLayout({ children }: LayoutProps<'/'>) {
    return <AuthContainer>{children}</AuthContainer>;
}
