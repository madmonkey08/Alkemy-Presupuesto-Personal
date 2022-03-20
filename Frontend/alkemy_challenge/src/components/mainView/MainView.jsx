import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Budget } from './Budget';
import "../../styles/mainView.css";
import { ToastContainer } from 'react-toastify';
import { NewOperation } from './modals/NewOperation';
import { HeaderTable } from './HeaderTable';
import { EditOperation } from './modals/EditOperation';
import { Filters } from './Filters';

export const MainView = () => {

    const [flag, setFlag] = useState(false);
    const [hidden, setHidden] = useState(true);
    const [hiddenEdit, setHiddenEdit] = useState(true);
    const [budgetFlag, setBudgetFlag] = useState(false);
    const [filter, setFilter] = useState("All");

    const navigate = useNavigate();

    useEffect(() => {

        const token = localStorage.getItem("token");

        if (token === undefined || token === null) {
            navigate("/login");
        }

    }, [flag]);

    return (
        <div className="w-screen h-screen overflow-x-hidden">
            <Budget budgetFlag={budgetFlag} />
            <div className="flex w-full justify-center">
                <button
                    className="mainViewButton"
                    onClick={() => setHidden(false)}
                >New operation</button>
                <button
                    className="logoutButton"
                    onClick={() => {
                        localStorage.removeItem("token");
                        localStorage.removeItem("user");
                        setFlag(!flag);
                    }}>Logout</button>
            </div>
            <Filters setFilter={setFilter} budgetFlag={budgetFlag} />
            <HeaderTable budgetFlag={budgetFlag} setBudgetFlag={setBudgetFlag} hidden={hiddenEdit} setHidden={setHiddenEdit} filter={filter} setFilter={setFilter} />
            <NewOperation hidden={hidden} setHidden={setHidden} budgetFlag={budgetFlag} setBudgetFlag={setBudgetFlag} />
            <EditOperation hidden={hiddenEdit} setHidden={setHiddenEdit} budgetFlag={budgetFlag} setBudgetFlag={setBudgetFlag} />
            <ToastContainer />
        </div>
    );
}
