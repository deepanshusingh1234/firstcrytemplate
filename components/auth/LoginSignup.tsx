// components/auth/LoginSignup.tsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Eye, EyeOff, X, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { UserData } from '@/context/AuthContext';
import Loader from '../loader/Loader';

interface LoginSignupProps {
    isOpen?: boolean;
    onClose?: () => void;
    redirectUrl?: string;
}

interface StoredUser {
    fullName: string;
    emailOrMobile: string;
    password: string;
    countryCode: string;
    isLoggedIn: boolean;
    loginTime: string;
}

const LoginSignup: React.FC<LoginSignupProps> = ({
    isOpen = true,
    onClose,
    redirectUrl = '/'
}) => {
    const router = useRouter();
    const { login } = useAuth();

    // Form state
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoginMode, setIsLoginMode] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [agreedToTerms, setAgreedToTerms] = useState(false);

    // Set default values for testing when component mounts
    useEffect(() => {
        if (isLoginMode) {
            setEmail('test@example.com');
            setPassword('Test@123');
        } else {
            setFullName('John Doe');
            setEmail('john.doe@example.com');
            setPassword('Test@123');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // Run only once on mount

    // Update fields when mode changes - using a ref to prevent infinite loop
    const isInitialMount = useRef(true);

    useEffect(() => {
        // Skip the first run when component mounts
        if (isInitialMount.current) {
            isInitialMount.current = false;
            return;
        }

        if (isLoginMode) {
            setEmail('test@example.com');
            setPassword('Test@123');
            setFullName('');
        } else {
            setFullName('John Doe');
            setEmail('john.doe@example.com');
            setPassword('Test@123');
        }
    }, [isLoginMode]);

    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage('');

        if (!isLoginMode && !fullName.trim()) {
            setErrorMessage('Please enter your full name');
            return;
        }

        if (!email.trim()) {
            setErrorMessage('Please enter your email address');
            return;
        }

        if (!validateEmail(email)) {
            setErrorMessage('Please enter a valid email address');
            return;
        }

        if (!password.trim()) {
            setErrorMessage('Please enter your password');
            return;
        }

        if (password.length < 6) {
            setErrorMessage('Password must be at least 6 characters');
            return;
        }

        if (!isLoginMode && !agreedToTerms) {
            setErrorMessage('Please agree to Terms of Use and Privacy Policy');
            return;
        }

        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            if (isLoginMode) {
                // Login Logic
                const storedUsers = localStorage.getItem('firstCryUsers');
                const users: StoredUser[] = storedUsers ? JSON.parse(storedUsers) : [];

                // For demo purposes, also accept the test credentials
                const isValidUser = users.some(
                    (u: StoredUser) => u.emailOrMobile === email && u.password === password
                ) || (email === 'test@example.com' && password === 'Test@123');

                if (isValidUser) {
                    // Find user data
                    const user = users.find((u: StoredUser) => u.emailOrMobile === email) || {
                        fullName: 'Test User',
                        emailOrMobile: email,
                        countryCode: '91'
                    };

                    // Store logged in user
                    const userData: UserData = {
                        fullName: user.fullName || 'Test User',
                        emailOrMobile: user.emailOrMobile,
                        countryCode: '91',
                        isLoggedIn: true,
                        loginTime: new Date().toISOString()
                    };

                    localStorage.setItem('firstCryUser', JSON.stringify(userData));

                    console.log('Login successful', { email });

                    // Update context
                    login(userData);

                    // Close modal and redirect
                    if (onClose) onClose();

                    // Redirect to the redirectUrl or home
                    router.push(redirectUrl);

                    setIsLoading(false);
                } else {
                    setErrorMessage('Invalid email or password');
                    setIsLoading(false);
                }
            } else {
                // Registration Logic
                const storedUsers = localStorage.getItem('firstCryUsers');
                const users: StoredUser[] = storedUsers ? JSON.parse(storedUsers) : [];

                // Check if user already exists
                const userExists = users.some((u: StoredUser) => u.emailOrMobile === email);

                if (userExists) {
                    setErrorMessage('User with this email already exists');
                    setIsLoading(false);
                } else {
                    // Create new user
                    const newUser: StoredUser = {
                        fullName,
                        emailOrMobile: email,
                        password,
                        countryCode: '91',
                        isLoggedIn: false,
                        loginTime: ''
                    };

                    users.push(newUser);
                    localStorage.setItem('firstCryUsers', JSON.stringify(users));

                    // Auto login after registration
                    const userData: UserData = {
                        fullName,
                        emailOrMobile: email,
                        countryCode: '91',
                        isLoggedIn: true,
                        loginTime: new Date().toISOString()
                    };

                    localStorage.setItem('firstCryUser', JSON.stringify(userData));

                    console.log('Registration successful', { fullName, email });

                    // Update context
                    login(userData);

                    // Close modal and redirect
                    if (onClose) onClose();

                    // Redirect to the redirectUrl or home
                    router.push(redirectUrl);

                    setIsLoading(false);
                }
            }
        }, 1500);
    };

    const handleGoogleLogin = () => {
        // Simulate Google login
        setIsLoading(true);

        setTimeout(() => {
            // Create a demo user for Google login
            const userData: UserData = {
                fullName: 'Google User',
                emailOrMobile: 'google.user@gmail.com',
                countryCode: '91',
                isLoggedIn: true,
                loginTime: new Date().toISOString()
            };

            localStorage.setItem('firstCryUser', JSON.stringify(userData));

            // Also add to users list if not exists
            const storedUsers = localStorage.getItem('firstCryUsers');
            const users: StoredUser[] = storedUsers ? JSON.parse(storedUsers) : [];

            const userExists = users.some((u: StoredUser) => u.emailOrMobile === 'google.user@gmail.com');

            if (!userExists) {
                users.push({
                    ...userData,
                    password: '' // No password for Google users
                });
                localStorage.setItem('firstCryUsers', JSON.stringify(users));
            }

            // Update context
            login(userData);

            // Close modal and redirect
            if (onClose) onClose();

            // Redirect to the redirectUrl or home
            router.push(redirectUrl);

            setIsLoading(false);
        }, 1500);
    };

    if (!isOpen) return null;

    return (
        <>
            {/* Overlay Loader */}
            {isLoading && (
                // <div className="fixed inset-0 bg-transparent bg-opacity-50 z-[60] flex items-center justify-center">
                //     <div className="bg-white p-8 rounded-lg shadow-xl">
                //         <Image
                //             src="//cdn.fcglcdn.com/brainbees/images/n/login-signup-loader.gif"
                //             alt="Loading..."
                //             width={50}
                //             height={50}
                //             className="mx-auto"
                //             unoptimized
                //         />
                //     </div>
                // </div>
                <Loader />
            )}

            {/* Main Container */}
            <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-50">
                <div className="min-h-screen flex items-center justify-center p-4">
                    <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
                        {/* Banner Image */}
                        <div className="w-full h-40 overflow-hidden">
                            <Image
                                src="//cdn.fcglcdn.com/brainbees/images/m/login_revamp_banner_mobile.jpg"
                                alt="Extra 5% OFF* Join us to grab more discounts + Free Shipping on First orders COUPON: NEW5CT"
                                width={448}
                                height={160}
                                className="w-full h-full object-cover"
                                unoptimized
                            />
                        </div>

                        {/* Login/Signup Content */}
                        <div className="p-6">
                            {/* Header with Close Button */}
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-2xl font-bold text-gray-900">
                                    {isLoginMode ? 'Log In' : 'Create Account'}
                                </h2>
                                {onClose && (
                                    <button
                                        onClick={onClose}
                                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                    >
                                        <X size={24} className="text-gray-500" />
                                    </button>
                                )}
                            </div>

                            {/* Info Message for Test Credentials */}
                            <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                                <p className="text-sm text-blue-600">
                                    <strong>Test Credentials:</strong> {isLoginMode
                                        ? 'Email: test@example.com / Password: Test@123'
                                        : 'Demo data pre-filled for testing'}
                                </p>
                            </div>

                            {/* Error Message */}
                            {errorMessage && (
                                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                                    <p className="text-sm text-red-600">{errorMessage}</p>
                                </div>
                            )}

                            {/* Form */}
                            <form onSubmit={handleSubmit} className="space-y-4">
                                {/* Full Name Field - Only in Register Mode */}
                                {!isLoginMode && (
                                    <div className="space-y-1">
                                        <label className="text-sm font-medium text-gray-700">
                                            Full Name<span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={fullName}
                                            onChange={(e) => setFullName(e.target.value)}
                                            placeholder="Enter your full name"
                                            className="w-full px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-yellow-400 text-base"
                                            autoComplete="name"
                                        />
                                    </div>
                                )}

                                {/* Email Input */}
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-gray-700">
                                        Email Address<span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter your email address"
                                        className="w-full px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-yellow-400 text-base"
                                        autoComplete="email"
                                    />
                                </div>

                                {/* Password Field */}
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-gray-700">
                                        Password<span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="Enter your password"
                                            className="w-full px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-yellow-400 text-base pr-12"
                                            autoComplete={isLoginMode ? "current-password" : "new-password"}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                        >
                                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                        </button>
                                    </div>
                                </div>

                                {/* Forgot Password Link - Only in Login Mode */}
                                {isLoginMode && (
                                    <div className="text-right">
                                        <button
                                            type="button"
                                            className="text-sm text-blue-600 hover:underline"
                                        >
                                            Forgot Password?
                                        </button>
                                    </div>
                                )}

                                {/* Terms & Conditions Checkbox - Only in Register Mode */}
                                {!isLoginMode && (
                                    <div className="flex items-start space-x-2">
                                        <input
                                            type="checkbox"
                                            id="terms"
                                            checked={agreedToTerms}
                                            onChange={(e) => setAgreedToTerms(e.target.checked)}
                                            className="mt-1 w-4 h-4 text-yellow-400 border-gray-300 rounded focus:ring-yellow-400"
                                        />
                                        <label htmlFor="terms" className="text-sm text-gray-600">
                                            I agree to FirstCry&apos;s{' '}
                                            <a href="#" className="text-gray-900 font-medium hover:underline">
                                                Terms of Use
                                            </a>{' '}
                                            and{' '}
                                            <a href="#" className="text-gray-900 font-medium hover:underline">
                                                Privacy Policy
                                            </a>
                                        </label>
                                    </div>
                                )}

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full py-3.5 bg-yellow-400 text-white font-semibold text-lg rounded-lg hover:bg-yellow-500 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                                >
                                    {isLoading ? 'Please wait...' : (isLoginMode ? 'CONTINUE' : 'REGISTER')}
                                </button>
                            </form>

                            {/* Toggle between Login/Register */}
                            <div className="mt-4 text-center">
                                <p className="text-base text-gray-600">
                                    {isLoginMode ? "New to FirstCry?" : "Already have an account?"}{' '}
                                    <button
                                        onClick={() => {
                                            setIsLoginMode(!isLoginMode);
                                            setErrorMessage('');
                                            setAgreedToTerms(false);
                                        }}
                                        className="text-blue-600 font-medium hover:underline"
                                    >
                                        {isLoginMode ? 'Register Here' : 'Log In'}
                                    </button>
                                </p>
                            </div>

                            {/* Terms and Privacy Footer */}
                            <div className="mt-4 text-center">
                                <p className="text-sm text-gray-500">
                                    By continuing, you agree to FirstCry&apos;s{' '}
                                    <a href="#" className="text-gray-700 font-medium hover:underline">
                                        Terms of Use
                                    </a>{' '}
                                    and{' '}
                                    <a href="#" className="text-gray-700 font-medium hover:underline">
                                        Privacy Policy
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Hidden inputs for form data */}
                <input type="hidden" name="fromapp" value={`?URL=${redirectUrl}`} />
                <input type="hidden" name="type" id="type" />
                <input type="hidden" name="by" id="by" />
                <input type="hidden" name="onetab" value="" />
                <input type="hidden" name="FcSocialToken" value="" />
                <input type="hidden" name="redirecturl" value={redirectUrl} />
                <input type="hidden" name="countryname" value="India (भारत)" />
            </div>
        </>
    );
};

export default LoginSignup;