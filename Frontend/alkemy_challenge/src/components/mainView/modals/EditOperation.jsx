import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { axiosPetition } from "../../../helpers/Axios";
import { useForm } from "../../../hooks/useForm";
import { useEditOperationContext } from '../../../context/EditOperationContext';
import "../../../styles/newOperation.css";

export const EditOperation = ({ hidden, setHidden, budgetFlag, setBudgetFlag }) => {

    const { editOp, setEditOp } = useEditOperationContext();

    const [operationValues, handleOperationsChange, resetForm, setValues] = useForm({
        id: editOp?.id || "",
        type: editOp?.type || "",
        category: editOp?.category || "",
        concept: editOp?.concept || "",
        amount: editOp?.amount || "",
        user: editOp?.id_user || ""
    });

    const { type, category, concept, amount } = operationValues;

    useEffect(() => {
        if (editOp !== {}) {
            setValues({
                id: editOp?.id || "",
                type: editOp?.type || "",
                category: editOp?.category || "",
                concept: editOp?.concept || "",
                amount: editOp?.amount || "",
                user: editOp?.id_user || ""
            });
        }
    }, [editOp]);

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

    const editOperation = async (e) => {

        e.preventDefault();

        const update = await axiosPetition(`api/operations`, operationValues, "PUT");

        if (!update.ok) {
            return toast.error(update.msg, configMessage);
        }

        setHidden(true);
        toast.success("Operation updated successfully", configMessage);
        resetForm();
        setBudgetFlag(!budgetFlag);
    }

    return (
        <div className={`w-screen h-screen background fixed top-0 bottom-0 flex justify-center items-center ${hidden === true ? 'hidden' : ''}`}>
            <div className="bg-white w-fit px-12 py-12 rounded-xl">
                <h2 className="ABMTitle"> Edit ABM Operation</h2>
                <form className="flex flex-col" onSubmit={editOperation}>
                    <label className="ABMLabel" htmlFor="type">Type:</label>
                    <input name="type" className="ABMInput" value={type} onChange={handleOperationsChange} disabled />
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
                    <button className="ABMButton">Update</button>
                </form>
                <button
                    className="ABMCancelButton"
                    onClick={() => {
                        setHidden(true);
                        resetForm();
                        setEditOp({});
                    }}
                >Cancel</button>
            </div>
        </div>
    );
}
