import React, { useRef, useEffect } from 'react';
import { toast } from 'react-toastify';
import { axiosPetition } from '../../helpers/Axios';
import { useForm } from '../../hooks/useForm';
import "../../styles/login.css";

export const SignupForm = ({ setShowForm }) => {

    const emailInput = useRef();

    useEffect(() => {
        emailInput.current.focus();
    }, []);

    const [userValues, userInputChange] = useForm({
        email: "",
        password: "",
        repeatPass: ""
    });

    const { email, password, repeatPass } = userValues;

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

    const signup = async (e) => {

        e.preventDefault();

        const petition = await axiosPetition("api/users", userValues, "POST");

        console.log(petition);

        if (!petition.ok) {
            return toast.error(petition.msg, configMessage);
        }

        toast.success("User created succesfully!", configMessage);

        setShowForm("Login");
    }

    return (
        <div id="left-content" className="max-w-md mx-auto mt-4">
            <h2 className="text-lg text-left max-w-lg text-gray-500">Welcome to</h2>
            <h1 id="main-title" className="text-3xl font-bold mb-8 text-left max-w-lg text">Personal Budget</h1>
            <form className="flex flex-col" onSubmit={signup}>
                <label className="loginLabel">Email:</label>
                <input
                    type="email"
                    name="email"
                    ref={emailInput}
                    className="loginInput"
                    placeholder="Enter your email"
                    value={email}
                    onChange={userInputChange}
                    autoComplete="off" />
                <label className="loginLabel">Password:</label>
                <input
                    type="password"
                    name="password"
                    className="loginInput"
                    placeholder="Enter your password"
                    value={password}
                    onChange={userInputChange}
                    autoComplete="off" />
                <label className="loginLabel">Repeat password:</label>
                <input
                    type="password"
                    name="repeatPass"
                    className="loginInput"
                    placeholder="Repeat your password"
                    value={repeatPass}
                    onChange={userInputChange}
                    autoComplete="off" />
                <button type="submit" className="loginButton">Sign Up!</button>
                <span
                    className="text underline mt-4 cursor-pointer"
                    onClick={() => setShowForm("Login")}>Do you have an account? Login!</span>
            </form>
        </div>
    );
}