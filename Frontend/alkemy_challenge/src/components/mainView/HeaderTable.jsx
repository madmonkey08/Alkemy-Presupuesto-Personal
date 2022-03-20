import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { axiosPetition } from '../../helpers/Axios';
import { OperationsList } from './OperationsList';

export const HeaderTable = ({ budgetFlag, setBudgetFlag, hidden, setHidden, filter, setFilter }) => {

    const [operations, setOperations] = useState([]);

    let numData = 0;

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

    useEffect(() => {

        const getOperations = async () => {

            const id_user = localStorage.getItem("user");

            const search = await axiosPetition(`api/operations/${id_user}`);

            if (!search.ok) {
                return toast(search.msg, configMessage);
            }

            setOperations(search.operations);
            setFilter("All");

        }

        getOperations();

    }, [budgetFlag]);

    return (
        <div className="w-full overflow-x-scroll md:overflow-hidden">
            <div className="px-12 py-4">
                <table className={`leading-normal w-full`}>
                    <thead>
                        <tr>
                            <th
                                className="px-5 py-3 border-b-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Identifier
                            </th>
                            <th
                                className="px-5 py-3 border-b-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Type
                            </th>
                            <th
                                className="px-5 py-3 border-b-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Category
                            </th>
                            <th
                                className="px-5 py-3 border-b-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Concept
                            </th>
                            <th
                                className="px-5 py-3 border-b-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Amount
                            </th>
                            <th
                                className="px-5 py-3 border-b-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Date
                            </th>
                            <th
                                className="px-5 py-3 border-b-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {

                            operations?.map((operation, index) => {

                                numData += 1;

                                const condition = (operation.category === filter);

                                if (numData <= 10) {

                                    if (filter !== "All") {
                                        if (condition) {
                                            return <OperationsList key={index} props={operation} budgetFlag={budgetFlag} setBudgetFlag={setBudgetFlag} hidden={hidden} setHidden={setHidden} />;
                                        }
                                    } else {
                                        return <OperationsList key={index} props={operation} budgetFlag={budgetFlag} setBudgetFlag={setBudgetFlag} hidden={hidden} setHidden={setHidden} />;
                                    }

                                }
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}
