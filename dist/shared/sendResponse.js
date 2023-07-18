"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const sendResponse = (res, data) => {
    const responseData = {
        success: (data === null || data === void 0 ? void 0 : data.success) || true,
        statusCode: (data === null || data === void 0 ? void 0 : data.statusCode) || undefined,
        message: (data === null || data === void 0 ? void 0 : data.message) || 'Document created successfully!',
        meta: data === null || data === void 0 ? void 0 : data.meta,
        data: (data === null || data === void 0 ? void 0 : data.data) || null,
    };
    res.status((data === null || data === void 0 ? void 0 : data.statusCode) || http_status_1.default.OK).json(responseData);
};
exports.default = sendResponse;
