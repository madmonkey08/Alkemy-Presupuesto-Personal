import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { axiosPetition } from '../../helpers/Axios';
import "../../styles/budget.css";

export const Budget = ({ budgetFlag }) => {

    const [amount, setAmount] = useState(0);

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

    useEffect(async () => {

        const email = localStorage.getItem("user");

        const findAmount = await axiosPetition(`api/users/${email}`);

        if (!findAmount.ok) {
            return toast.error(findAmount.msg, configMessage);
        }

        setAmount(findAmount.amount);

    }, [budgetFlag]);

    return (
        <div className="mt-20">
            <h2 className={`text-6xl font-semibold text-center ${amount < 0 ? "negativeAmount" : ""}`}>{amount}</h2>
            <span className="w-full block text-center text-2xl font-semibold text">Current Balance</span>
        </div>
    )
}
