import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import "../../styles/login.css";
import { LoginForm } from './LoginForm';
import { SignupForm } from './SignupForm';

export const Login = () => {

    const [showForm, setShowForm] = useState("Login");

    return (
        <div className="grid grid-cols-1 md:grid-cols-2">
            <div id="left-col" className="min-h-screen pt-12 md:pt-20 pb-6 px-6 bg-white">
                {
                    showForm === "Login" ?
                        <LoginForm setShowForm={setShowForm} />
                        :
                        <SignupForm setShowForm={setShowForm} />
                }
            </div>
            <div id="right-col" className="flex flex-col justify-center items-center h-screen invisible md:visible">
            </div>
            <ToastContainer theme="dark" />
        </div>
    );
}
