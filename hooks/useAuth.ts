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

    const loadUser = () => {
        setIsLoading(true);
        try {
            const userData = localStorage.getItem('firstCryUser');
            if (userData) {
                const parsed = JSON.parse(userData);
                setUser(parsed);
                console.log('User loaded:', parsed);
            } else {
                setUser(null);
                console.log('No user found');
            }
        } catch (error) {
            console.error('Error parsing user data:', error);
            localStorage.removeItem('firstCryUser');
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadUser();

        // Listen for storage events (for multi-tab support)
        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === 'firstCryUser') {
                loadUser();
            }
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    const logout = () => {
        localStorage.removeItem('firstCryUser');
        setUser(null);
        console.log('User logged out');
        router.push('/');
    };

    const login = (userData: UserData) => {
        localStorage.setItem('firstCryUser', JSON.stringify(userData));
        setUser(userData);
        console.log('User logged in:', userData);
    };

    return { user, isLoading, logout, login };
};