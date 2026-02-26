// app/login/page.tsx
'use client';

import React from 'react';
import LoginSignup from '@/components/auth/LoginSignup';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const router = useRouter();

    return (
        <LoginSignup
            isOpen={true}
            onClose={() => router.back()}
            redirectUrl={typeof window !== 'undefined'
                ? new URLSearchParams(window.location.search).get('redirect') || 'https://checkout.firstcry.com/pay'
                : 'https://checkout.firstcry.com/pay'
            }
        />
    );
}