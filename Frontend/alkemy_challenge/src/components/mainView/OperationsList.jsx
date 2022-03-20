import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { useEditOperationContext } from '../../context/EditOperationContext';
import { axiosPetition } from '../../helpers/Axios';
import { toast } from 'react-toastify';

export const OperationsList = ({ props, setHidden, budgetFlag, setBudgetFlag }) => {

    const { setEditOp } = useEditOperationContext();
    const { id, type, category, concept, amount, createdAt } = props;

    const date = new Date(createdAt).toLocaleDateString();

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

    const deleteOperation = async () => {

        props.user = props.id_user;

        const petition = await axiosPetition("api/operations", props, "DELETE");

        if (!petition.ok) {
            return toast.error(petition.msg, configMessage);
        }

        toast.success(petition.msg, configMessage);
        setBudgetFlag(!budgetFlag);

    }

    return (
        <>
            <tr className="border-b-2">
                <td className="px-5 py-3 text-sm text-left">
                    <p className="text-gray-600 font-semibold whitespace-no-wrap">{id}</p>
                </td>
                <td className="px-5 py-3 text-sm text-left">
                    <p className="text-gray-600 font-semibold whitespace-no-wrap">{type}</p>
                </td>
                <td className="px-5 py-3 text-sm text-left">
                    <p className="text-gray-600 font-semibold whitespace-no-wrap">{category}</p>
                </td>
                <td className="px-5 py-3 text-sm text-left">
                    <p className="text-gray-600 font-semibold whitespace-no-wrap">{concept}</p>
                </td>
                <td className="px-5 py-3 text-sm text-left">
                    <p className="text-gray-600 font-semibold whitespace-no-wrap">{amount}</p>
                </td>
                <td className="px-5 py-3 text-sm text-left">
                    <p className="text-gray-600 font-semibold whitespace-no-wrap">{date}</p>
                </td>
                <td className="px-5 py-3 text-sm text-left">
                    <p className="text-gray-600 font-semibold whitespace-no-wrap">
                        <FontAwesomeIcon
                            alt="editar"
                            title="Editar"
                            className="text-xl cursor-pointer mr-2"
                            icon={faPencilAlt}
                            onClick={() => {
                                setEditOp(props);
                                setHidden(false);
                            }} />
                        <FontAwesomeIcon
                            alt="eliminar"
                            title="Eliminar"
                            className="text-xl cursor-pointer"
                            icon={faTrashCan}
                            onClick={deleteOperation} />
                    </p>
                </td>
            </tr>
        </>
    );
}
