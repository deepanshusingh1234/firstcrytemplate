// context/AuthContext.tsx
'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export interface UserData {
    fullName: string;
    emailOrMobile: string;
    countryCode: string;
    isLoggedIn: boolean;
    loginTime: string;
}

interface AuthContextType {
    user: UserData | null;
    isLoading: boolean;
    login: (userData: UserData) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<UserData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    // Load user from localStorage on mount
    useEffect(() => {
        const loadUser = () => {
            try {
                const userData = localStorage.getItem('firstCryUser');
                if (userData) {
                    const parsed = JSON.parse(userData);
                    setUser(parsed);
                    console.log('User loaded from localStorage:', parsed);
                } else {
                    setUser(null);
                }
            } catch (error) {
                console.error('Error parsing user data:', error);
                localStorage.removeItem('firstCryUser');
                setUser(null);
            } finally {
                setIsLoading(false);
            }
        };

        loadUser();
    }, []);

    const login = (userData: UserData) => {
        localStorage.setItem('firstCryUser', JSON.stringify(userData));
        setUser(userData);
        console.log('User logged in:', userData);
    };

    const logout = () => {
        localStorage.removeItem('firstCryUser');
        setUser(null);
        console.log('User logged out');
        router.push('/');
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}