import { requireRole } from '@/lib/auth-guards';

export default async function DashboardPage() {
    const { session, user } = await requireRole('creator', '/dashboard');

    return <main>{user.name}</main>;
}
