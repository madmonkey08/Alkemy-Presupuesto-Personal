import { createContext, useContext } from "react";

export const EditOperationContext = createContext(null);

export const useEditOperationContext = () => {
    return useContext(EditOperationContext);
}