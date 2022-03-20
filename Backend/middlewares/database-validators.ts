export const validateAmount = async (amount: number) => {

    if (amount <= 0) {
        throw new Error("The amount must not be a negative number or zero.");
    }

}