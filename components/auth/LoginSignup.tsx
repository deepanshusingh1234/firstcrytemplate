// components/auth/LoginSignup.tsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Eye, EyeOff, X, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

interface LoginSignupProps {
    isOpen?: boolean;
    onClose?: () => void;
    redirectUrl?: string;
}

const LoginSignup: React.FC<LoginSignupProps> = ({
    isOpen = true,
    onClose,
    redirectUrl = '/'
}) => {
    const router = useRouter();
    const { login } = useAuth();

    // Default test credentials
    const [fullName, setFullName] = useState('');
    const [emailOrMobile, setEmailOrMobile] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoginMode, setIsLoginMode] = useState(true);
    const [countryCode, setCountryCode] = useState('91');
    const [showCountryDropdown, setShowCountryDropdown] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [agreedToTerms, setAgreedToTerms] = useState(false);

    // Set default values for testing
    useEffect(() => {
        if (isLoginMode) {
            setEmailOrMobile('test@example.com');
            setPassword('Test@123');
        } else {
            setFullName('John Doe');
            setEmailOrMobile('john.doe@example.com');
            setPassword('Test@123');
        }
    }, [isLoginMode]);

    const countryDropdownRef = useRef<HTMLDivElement>(null);

    const countries = [
        { code: '91', name: 'India (भारत)', flag: 'in' },
        { code: '1', name: 'United States', flag: 'us' },
        { code: '971', name: 'UAE', flag: 'ae' },
        { code: '44', name: 'United Kingdom', flag: 'gb' },
        { code: '61', name: 'Australia', flag: 'au' },
        { code: '966', name: 'Saudi Arabia', flag: 'sa' },
        { code: '974', name: 'Qatar', flag: 'qa' },
        { code: '65', name: 'Singapore', flag: 'sg' },
        { code: '64', name: 'New Zealand', flag: 'nz' },
        { code: '353', name: 'Ireland', flag: 'ie' },
        { code: '965', name: 'Kuwait', flag: 'kw' },
        { code: '968', name: 'Oman', flag: 'om' },
        { code: '977', name: 'Nepal', flag: 'np' },
        { code: '973', name: 'Bahrain', flag: 'bh' },
        { code: '31', name: 'Netherlands', flag: 'nl' },
        { code: '41', name: 'Switzerland', flag: 'ch' },
        { code: '254', name: 'Kenya', flag: 'ke' },
        { code: '94', name: 'Sri Lanka', flag: 'lk' },
    ];

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (countryDropdownRef.current && !countryDropdownRef.current.contains(event.target as Node)) {
                setShowCountryDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage('');

        if (!isLoginMode && !fullName.trim()) {
            setErrorMessage('Please enter your full name');
            return;
        }

        if (!emailOrMobile.trim()) {
            setErrorMessage('Please enter your valid Email-id or Mobile No.');
            return;
        }

        if (!password.trim()) {
            setErrorMessage('Please enter your password');
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
                const users = storedUsers ? JSON.parse(storedUsers) : [];

                // For demo purposes, also accept the test credentials
                const isValidUser = users.some(
                    (u: any) => u.emailOrMobile === emailOrMobile && u.password === password
                ) || (emailOrMobile === 'test@example.com' && password === 'Test@123');

                if (isValidUser) {
                    // Find user data
                    const user = users.find((u: any) => u.emailOrMobile === emailOrMobile) || {
                        fullName: 'Test User',
                        emailOrMobile: 'test@example.com',
                        countryCode
                    };

                    // Store logged in user
                    const userData = {
                        fullName: user.fullName || 'Test User',
                        emailOrMobile: user.emailOrMobile,
                        countryCode: user.countryCode || countryCode,
                        isLoggedIn: true,
                        loginTime: new Date().toISOString()
                    };

                    localStorage.setItem('firstCryUser', JSON.stringify(userData));

                    console.log('Login successful', { emailOrMobile, countryCode });

                    // Update context
                    login(userData);

                    // Close modal and redirect
                    if (onClose) onClose();

                    // Redirect to the redirectUrl or home
                    router.push(redirectUrl);

                    setIsLoading(false);
                } else {
                    setErrorMessage('Invalid email/mobile or password');
                    setIsLoading(false);
                }
            } else {
                // Registration Logic
                const storedUsers = localStorage.getItem('firstCryUsers');
                const users = storedUsers ? JSON.parse(storedUsers) : [];

                // Check if user already exists
                const userExists = users.some((u: any) => u.emailOrMobile === emailOrMobile);

                if (userExists) {
                    setErrorMessage('User with this email/mobile already exists');
                    setIsLoading(false);
                } else {
                    // Create new user
                    const newUser = {
                        fullName,
                        emailOrMobile,
                        password,
                        countryCode,
                        isLoggedIn: false,
                        loginTime: ''
                    };

                    users.push(newUser);
                    localStorage.setItem('firstCryUsers', JSON.stringify(users));

                    // Auto login after registration
                    const userData = {
                        fullName,
                        emailOrMobile,
                        countryCode,
                        isLoggedIn: true,
                        loginTime: new Date().toISOString()
                    };

                    localStorage.setItem('firstCryUser', JSON.stringify(userData));

                    console.log('Registration successful', { fullName, emailOrMobile, countryCode });

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
            const userData = {
                fullName: 'Google User',
                emailOrMobile: 'google.user@gmail.com',
                countryCode: '91',
                isLoggedIn: true,
                loginTime: new Date().toISOString()
            };

            localStorage.setItem('firstCryUser', JSON.stringify(userData));

            // Also add to users list if not exists
            const storedUsers = localStorage.getItem('firstCryUsers');
            const users = storedUsers ? JSON.parse(storedUsers) : [];

            const userExists = users.some((u: any) => u.emailOrMobile === 'google.user@gmail.com');

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
            {/* Overlay */}
            {isLoading && (
                <div className="fixed inset-0 bg-transparent bg-opacity-50 z-[60] flex items-center justify-center">
                    <div className="bg-white p-8 rounded-lg shadow-xl">
                        <Image
                            src="//cdn.fcglcdn.com/brainbees/images/n/login-signup-loader.gif"
                            alt="Loading..."
                            width={50}
                            height={50}
                            className="mx-auto"
                            unoptimized
                        />
                    </div>
                </div>
            )}

            {/* Main Container */}
            <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-50">
                <div className="min-h-screen flex items-center justify-center p-4">
                    <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden">
                        {/* Banner Image */}
                        <div className="w-full h-48 overflow-hidden">
                            <img
                                src="//cdn.fcglcdn.com/brainbees/images/m/login_revamp_banner_mobile.jpg"
                                alt="Extra 5% OFF* Join us to grab more discounts + Free Shipping on First orders COUPON: NEW5CT"
                                className="w-full h-full object-cover"
                                tabIndex={0}
                            />
                        </div>

                        {/* Login/Signup Content */}
                        <div className="p-8">
                            {/* Header with Close Button */}
                            <div className="flex items-center justify-between mb-6">
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

                                {/* Email/Mobile Input with Country Code */}
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-gray-700">
                                        {isLoginMode ? 'Email or Mobile No.' : 'Email or Mobile No.'}<span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <div className="flex items-center border rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-yellow-400 focus-within:border-transparent">
                                            {/* Country Code Dropdown */}
                                            <div className="relative" ref={countryDropdownRef}>
                                                <button
                                                    type="button"
                                                    onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                                                    className="flex items-center space-x-1 px-4 py-3 bg-gray-50 border-r hover:bg-gray-100 transition-colors"
                                                >
                                                    <span className={`iti__flag iti__${countries.find(c => c.code === countryCode)?.flag || 'in'} w-4 h-3 bg-cover`}
                                                        style={{ backgroundImage: 'url(https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/img/flags.png)' }}>
                                                    </span>
                                                    <span className="text-sm">+{countryCode}</span>
                                                    <ChevronDown size={14} className="text-gray-500" />
                                                </button>

                                                {showCountryDropdown && (
                                                    <div className="absolute top-full left-0 mt-1 w-72 bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto z-10">
                                                        {countries.map((country) => (
                                                            <button
                                                                key={country.code}
                                                                type="button"
                                                                onClick={() => {
                                                                    setCountryCode(country.code);
                                                                    setShowCountryDropdown(false);
                                                                }}
                                                                className={`w-full flex items-center space-x-3 px-4 py-2.5 hover:bg-gray-50 transition-colors ${country.code === countryCode ? 'bg-yellow-50' : ''
                                                                    }`}
                                                            >
                                                                <span className={`iti__flag iti__${country.flag} w-4 h-3 bg-cover`}
                                                                    style={{ backgroundImage: 'url(https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/img/flags.png)' }}>
                                                                </span>
                                                                <span className="text-sm flex-1 text-left">{country.name}</span>
                                                                <span className="text-sm text-gray-500">+{country.code}</span>
                                                            </button>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>

                                            {/* Input Field */}
                                            <input
                                                type="text"
                                                value={emailOrMobile}
                                                onChange={(e) => setEmailOrMobile(e.target.value)}
                                                placeholder={isLoginMode ? "Enter your Email or Mobile No." : "Enter your Email or Mobile No."}
                                                className="flex-1 px-4 py-3 outline-none text-base"
                                                autoComplete="username"
                                            />
                                        </div>
                                    </div>
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
                            <div className="mt-6 text-center">
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

                            {/* OR Divider */}
                            <div className="mt-6 flex items-center">
                                <div className="flex-1 h-px bg-gray-200"></div>
                                <p className="px-4 text-sm text-gray-500">Or log-In with</p>
                                <div className="flex-1 h-px bg-gray-200"></div>
                            </div>

                            {/* Social Login */}
                            <div className="mt-6">
                                <button
                                    onClick={handleGoogleLogin}
                                    className="w-full flex items-center justify-center space-x-3 py-3 border rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    <img
                                        src="//cdn.fcglcdn.com/brainbees/images/m/loginrev_google.jpg"
                                        alt="Google"
                                        className="w-6 h-6"
                                    />
                                    <span className="text-base font-medium text-gray-700">Continue with Google</span>
                                </button>
                            </div>

                            {/* Terms and Privacy Footer */}
                            <div className="mt-6 text-center">
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