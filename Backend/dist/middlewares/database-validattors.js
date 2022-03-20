"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateAmount = void 0;
const validateAmount = (amount) => {
    try {
        if (amount <= 0) {
            throw new Error("An error has occurred, the amount must not be a negative number.");
        }
    }
    catch (err) {
        throw new Error("Error validating the amount.");
    }
};
exports.validateAmount = validateAmount;
//# sourceMappingURL=database-validattors.js.map