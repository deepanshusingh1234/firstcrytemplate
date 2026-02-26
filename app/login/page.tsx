// app/login/page.tsx
'use client';

import React, { useEffect } from 'react';
import LoginSignup from '@/components/auth/LoginSignup';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const router = useRouter();
    const { user } = useAuth();

    // If already logged in, redirect to home
    useEffect(() => {
        if (user) {
            const redirectUrl = new URLSearchParams(window.location.search).get('redirect') || '/';
            router.push(redirectUrl);
        }
    }, [user, router]);

    return (
        <LoginSignup
            isOpen={true}
            onClose={() => router.back()}
            redirectUrl={typeof window !== 'undefined'
                ? new URLSearchParams(window.location.search).get('redirect') || '/'
                : '/'
            }
        />
    );
}