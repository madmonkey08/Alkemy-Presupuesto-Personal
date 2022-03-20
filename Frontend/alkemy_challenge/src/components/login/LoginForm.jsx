import React, { useRef, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { axiosPetition } from '../../helpers/Axios';
import { useForm } from '../../hooks/useForm';
import { useNavigate } from 'react-router-dom';
import "../../styles/login.css";

export const LoginForm = ({ setShowForm }) => {

    const emailInput = useRef();

    const navigate = useNavigate();

    useEffect(() => {
        emailInput.current.focus();
    }, []);

    const [emailValues, emailInputChange] = useForm({
        email: "",
        password: ""
    });

    const { email, password } = emailValues;

    const configMessage = {
        position: "bottom-center",
        background: "#191c1f !important",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
    };

    const login = async (e) => {

        e.preventDefault();

        const petition = await axiosPetition("api/auth", emailValues, "POST");

        if (!petition.ok) {
            return toast.error(petition.msg, configMessage);
        }

        localStorage.setItem("token", petition.token);
        localStorage.setItem("user", petition.user.email);

        toast.success("Logged!", configMessage);

        navigate("/");

    }

    return (
        <div id="left-content" className="max-w-md mx-auto mt-12">
            <h2 className="text-lg text-left max-w-lg text-gray-500">Welcome to</h2>
            <h1 id="main-title" className="text-3xl font-bold mb-8 text-left max-w-lg text">Personal Budget</h1>
            <form className="flex flex-col" onSubmit={login}>
                <label className="loginLabel">Email:</label>
                <input
                    type="email"
                    name="email"
                    ref={emailInput}
                    className="loginInput"
                    placeholder="Enter your email"
                    value={email}
                    onChange={emailInputChange}
                    autoComplete="off" />
                <label className="loginLabel">Password:</label>
                <input
                    type="password"
                    name="password"
                    className="loginInput"
                    placeholder="Enter your password"
                    value={password}
                    onChange={emailInputChange}
                    autoComplete="off" />
                <button type="submit" className="loginButton">Login</button>
                <span
                    className="text underline mt-4 cursor-pointer"
                    onClick={() => setShowForm("Signup")}>Don't you have an account? Sign Up!</span>
            </form>
            <ToastContainer theme="dark" />
        </div>
    );
}
