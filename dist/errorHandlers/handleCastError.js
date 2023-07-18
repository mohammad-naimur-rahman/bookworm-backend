"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleCastError = (err) => {
    const message = 'Invalid Id';
    const errorMessage = {
        path: err.path,
        message,
    };
    return {
        statusCode: 500,
        message,
        errorMessages: [errorMessage],
    };
};
exports.default = handleCastError;
