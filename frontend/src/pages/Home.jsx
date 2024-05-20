import React, { useState } from 'react';
import Logo from "../components/Logo";
import LoginForm from '../components/auth/LoginForm';
import SignupForm from '../components/auth/SignupForm';

export default function Home() {
    const [showSignup, setShowSignup] = useState(false);

    const handleSignupClick = () => {
        setShowSignup(true);
    };

    const handleLoginClick = () => {
        setShowSignup(false);
    };

    return (
        <div className="text-white flex flex-col w-screen h-screen justify-center items-center space-y-8">
            <Logo />
            {showSignup ? (
                <SignupForm onLoginClick={handleLoginClick} />
            ) : (
                <LoginForm onSignupClick={handleSignupClick} />
            )}
        </div>
    );
}
