'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import { Shield, ShieldCheck, User, Crown } from 'lucide-react';

const EASE = [0.22, 1, 0.36, 1] as const;

const SUPER_ADMIN_EMAIL = 'singhaditya4333@gmail.com';

const roleConfig: Record<string, { label: string; color: string; icon: typeof Shield; bg: string }> = {
    superadmin: { label: 'Super Admin', color: 'text-amber-400', icon: Crown, bg: 'bg-amber-500/10' },
    admin: { label: 'Admin', color: 'text-violet-400', icon: ShieldCheck, bg: 'bg-violet-500/10' },
    user: { label: 'User', color: 'text-white/40', icon: User, bg: 'bg-white/[0.04]' },
};

export default function UsersPage() {
    const { data: session } = useSession();
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState<string | null>(null);

    const isSuperAdmin = (session?.user as any)?.role === 'superadmin';

    useEffect(() => {
        async function fetchUsers() {
            try {
                const res = await fetch('/api/users');
                if (!res.ok) throw new Error('Unauthorized');
                const data = await res.json();
                setUsers(data.users || []);
            } catch (error) {
                console.error('Error fetching users:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchUsers();
    }, []);

    const handleRoleChange = async (userId: string, newRole: 'user' | 'admin') => {
        setUpdating(userId);
        try {
            const res = await fetch(`/api/users/${userId}/role`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ role: newRole }),
            });

            if (!res.ok) {
                const data = await res.json();
                alert(data.error || 'Failed to update role');
                return;
            }

            setUsers(users.map(u =>
                u._id === userId ? { ...u, role: newRole } : u
            ));
        } catch (error) {
            console.error('Error updating role:', error);
            alert('Failed to update role');
        } finally {
            setUpdating(null);
        }
    };

    if (!isSuperAdmin) {
        return (
            <div className="flex items-center justify-center py-20">
                <p className="text-white/30 text-sm">You don&apos;t have permission to view this page.</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: EASE }}
            >
                <h1 className="text-2xl font-heading font-bold text-white tracking-tight">User Management</h1>
                <p className="text-white/40 text-sm mt-1">
                    Manage user roles. Promote users to admin or demote them back.
                </p>
            </motion.div>

            {/* Users Table */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
                className="rounded-2xl border border-white/[0.06] bg-white/[0.02] overflow-hidden"
            >
                {loading ? (
                    <div className="p-12 text-center text-white/30 text-sm">Loading users...</div>
                ) : users.length === 0 ? (
                    <div className="p-12 text-center text-white/30 text-sm">No users found.</div>
                ) : (
                    <div className="divide-y divide-white/[0.04]">
                        {/* Header */}
                        <div className="hidden lg:grid grid-cols-12 gap-4 px-6 py-3 text-[11px] font-bold uppercase tracking-wider text-white/20">
                            <div className="col-span-4">User</div>
                            <div className="col-span-3">Email</div>
                            <div className="col-span-2">Role</div>
                            <div className="col-span-3">Actions</div>
                        </div>

                        {users.map(user => {
                            const config = roleConfig[user.role] || roleConfig.user;
                            const isSelf = user.email === SUPER_ADMIN_EMAIL;

                            return (
                                <div
                                    key={user._id}
                                    className="grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-4 px-6 py-4 hover:bg-white/[0.015] transition-colors items-center"
                                >
                                    {/* User info */}
                                    <div className="lg:col-span-4 flex items-center gap-3">
                                        {user.image ? (
                                            <img
                                                src={user.image}
                                                alt={user.name}
                                                className="w-9 h-9 rounded-full object-cover ring-2 ring-white/[0.06]"
                                            />
                                        ) : (
                                            <div className="w-9 h-9 rounded-full bg-primary/15 flex items-center justify-center text-primary text-sm font-bold">
                                                {user.name?.charAt(0) || '?'}
                                            </div>
                                        )}
                                        <div className="truncate">
                                            <p className="text-white text-[14px] font-medium truncate">{user.name}</p>
                                            <p className="text-white/25 text-[12px] lg:hidden truncate">{user.email}</p>
                                        </div>
                                    </div>

                                    {/* Email */}
                                    <div className="hidden lg:block lg:col-span-3">
                                        <span className="text-white/35 text-[13px] truncate">{user.email}</span>
                                    </div>

                                    {/* Role badge */}
                                    <div className="lg:col-span-2">
                                        <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider ${config.bg} ${config.color}`}>
                                            <config.icon className="w-3 h-3" />
                                            {config.label}
                                        </span>
                                    </div>

                                    {/* Actions */}
                                    <div className="lg:col-span-3 flex items-center gap-2">
                                        {isSelf ? (
                                            <span className="text-white/20 text-[12px] font-medium italic">Protected account</span>
                                        ) : (
                                            <>
                                                {user.role !== 'admin' && (
                                                    <button
                                                        onClick={() => handleRoleChange(user._id, 'admin')}
                                                        disabled={updating === user._id}
                                                        className="px-3 py-1.5 rounded-lg bg-violet-500/10 text-violet-400 text-[12px] font-bold hover:bg-violet-500/20 transition-colors disabled:opacity-50"
                                                    >
                                                        {updating === user._id ? '...' : 'Promote to Admin'}
                                                    </button>
                                                )}
                                                {user.role === 'admin' && (
                                                    <button
                                                        onClick={() => handleRoleChange(user._id, 'user')}
                                                        disabled={updating === user._id}
                                                        className="px-3 py-1.5 rounded-lg bg-red-500/10 text-red-400 text-[12px] font-bold hover:bg-red-500/20 transition-colors disabled:opacity-50"
                                                    >
                                                        {updating === user._id ? '...' : 'Demote to User'}
                                                    </button>
                                                )}
                                            </>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </motion.div>
        </div>
    );
}
