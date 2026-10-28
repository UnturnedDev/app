type UserWithRole =
    | {
          role?: string | null;
      }
    | null
    | undefined;

export function hasRole(user: UserWithRole, role: string): boolean {
    if (!user?.role) return false;

    return user.role
        .split(',')
        .map((r) => r.trim())
        .includes(role);
}
