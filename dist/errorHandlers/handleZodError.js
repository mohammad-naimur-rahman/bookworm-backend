"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleZodError = (err) => {
    const errors = err.issues.map(zodIssue => {
        return {
            path: zodIssue.path[zodIssue.path.length - 1],
            message: zodIssue.message,
        };
    });
    return {
        statusCode: 400,
        message: 'Zod Validation error',
        errorMessages: errors,
    };
};
exports.default = handleZodError;
