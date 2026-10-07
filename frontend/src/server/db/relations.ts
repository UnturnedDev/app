// ---------------------------------------------------------------------------
// Relations v2
// ---------------------------------------------------------------------------
// Pass every table to defineRelations (a `* as schema` import works too if the

import { defineRelations } from 'drizzle-orm/relations';
import {
    users,
    sessions,
    accounts,
    verifications,
    organizations,
    members,
    invitations,
    jwkss,
} from './schema';

// tables live in a separate file).
export const relations = defineRelations(
    {
        users,
        sessions,
        accounts,
        verifications,
        organizations,
        members,
        invitations,
        jwkss,
    },
    (r) => ({
        users: {
            sessions: r.many.sessions(),
            accounts: r.many.accounts(),
            members: r.many.members(),
            invitations: r.many.invitations(),
        },
        sessions: {
            user: r.one.users({
                from: r.sessions.userId,
                to: r.users.id,
            }),
        },
        accounts: {
            user: r.one.users({
                from: r.accounts.userId,
                to: r.users.id,
            }),
        },
        organizations: {
            members: r.many.members(),
            invitations: r.many.invitations(),
        },
        members: {
            organization: r.one.organizations({
                from: r.members.organizationId,
                to: r.organizations.id,
            }),
            user: r.one.users({
                from: r.members.userId,
                to: r.users.id,
            }),
        },
        invitations: {
            organization: r.one.organizations({
                from: r.invitations.organizationId,
                to: r.organizations.id,
            }),
            user: r.one.users({
                from: r.invitations.inviterId,
                to: r.users.id,
            }),
        },
    }),
);
