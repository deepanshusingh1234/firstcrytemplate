// hooks/useAuth.ts
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export interface UserData {
    fullName: string;
    emailOrMobile: string;
    countryCode: string;
    isLoggedIn: boolean;
    loginTime: string;
}

export const useAuth = () => {
    const [user, setUser] = useState<UserData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const userData = localStorage.getItem('firstCryUser');
        if (userData) {
            try {
                const parsed = JSON.parse(userData);
                setUser(parsed);
            } catch (error) {
                console.error('Error parsing user data:', error);
                localStorage.removeItem('firstCryUser');
            }
        }
        setIsLoading(false);
    }, []);

    const logout = () => {
        localStorage.removeItem('firstCryUser');
        setUser(null);
        // Optionally redirect to home page
        router.push('/');
    };

    const login = (userData: UserData) => {
        localStorage.setItem('firstCryUser', JSON.stringify(userData));
        setUser(userData);
    };

    return { user, isLoading, logout, login };
};