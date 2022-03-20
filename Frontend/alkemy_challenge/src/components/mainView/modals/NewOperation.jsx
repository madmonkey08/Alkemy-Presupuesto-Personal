import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import { axiosPetition } from "../../../helpers/Axios";
import { useForm } from "../../../hooks/useForm";
import "../../../styles/newOperation.css";

export const NewOperation = ({ hidden, setHidden, budgetFlag, setBudgetFlag }) => {

    const [operationValues, handleOperationsChange, resetForm] = useForm({
        type: "Income",
        category: "Salary",
        concept: "",
        amount: ""
    });

    const { type, category, concept, amount } = operationValues;

    useEffect(() => {
        if (type === "Income") {
            operationValues.category = "Salary";
        } else if (type === "Outgoing") {
            operationValues.category = "Food";
        }
    }, [type]);

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

    const createOperation = async (e) => {

        e.preventDefault();

        operationValues.user = localStorage.getItem("user");

        const creation = await axiosPetition("api/operations", operationValues, "POST");

        if (!creation.ok) {
            return toast.error(creation.msg, configMessage);
        }

        setHidden(true);
        toast.success("Operation created successfully", configMessage);
        resetForm();
        setBudgetFlag(!budgetFlag);
    }

    return (
        <div className={`w-screen h-screen background fixed top-0 bottom-0 flex justify-center items-center ${hidden === true ? 'hidden' : ''}`}>
            <div className="bg-white w-fit px-12 py-12 rounded-xl">
                <h2 className="ABMTitle">ABM of Operations</h2>
                <form className="flex flex-col" onSubmit={createOperation}>
                    <label className="ABMLabel" htmlFor="type">Type:</label>
                    <select name="type" className="ABMInput" value={type} onChange={handleOperationsChange}>
                        <option value="Income">Income</option>
                        <option value="Outgoing">Outgoing</option>
                    </select>
                    <label className="ABMLabel" htmlFor="category">Category:</label>
                    <select name="category" className={`ABMInput ${type !== "Income" ? "hidden" : ""}`} value={category} onChange={handleOperationsChange}>
                        <option value="Salary">Salary</option>
                        <option value="Bonus">Bonus</option>
                        <option value="Extras">Extras</option>
                        <option value="Other">Other</option>
                    </select>
                    <select name="category" className={`ABMInput ${type === "Income" ? "hidden" : ""}`} value={category} onChange={handleOperationsChange}>
                        <option value="Food">Food</option>
                        <option value="Entertainment">Entertainment</option>
                        <option value="House">House</option>
                        <option value="Services">Services</option>
                        <option value="Education">Education</option>
                        <option value="Transport">Transport</option>
                        <option value="Health">Health</option>
                        <option value="Taxes">Taxes</option>
                        <option value="Other">Other</option>
                    </select>
                    <label className="ABMLabel" htmlFor="type">Concept:</label>
                    <input name="concept" value={concept}
                        onChange={handleOperationsChange}
                        maxLength={25}
                        className="ABMInput" />
                    <label className="ABMLabel" htmlFor="type">Amount:</label>
                    <input name="amount" value={amount} onChange={handleOperationsChange} type="number" className="ABMInput" />
                    <button className="ABMButton">Register</button>
                </form>
                <button
                    className="ABMCancelButton"
                    onClick={() => {
                        setHidden(true);
                        resetForm();
                    }}
                >Cancel</button>
            </div>
        </div>
    );
}
