"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookController = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const http_status_1 = __importDefault(require("http-status"));
const pick_1 = require("../../../shared/pick");
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const book_constants_1 = require("./book.constants");
const book_service_1 = require("./book.service");
const getAllBooks = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const paginationOptions = (0, pick_1.pick)(req.query, [
        'page',
        'limit',
        'sortBy',
        'sortOrder',
    ]);
    const filters = (0, pick_1.pick)(req.query, book_constants_1.searchAndFilterableFields);
    const books = yield book_service_1.BookService.getAllBooksFromDB(filters, paginationOptions);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Retrieved all books successfully',
        meta: books === null || books === void 0 ? void 0 : books.meta,
        data: books === null || books === void 0 ? void 0 : books.data,
    });
}));
const createBook = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const createdBook = yield book_service_1.BookService.createBookInDB(req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Book created successfully',
        data: createdBook,
    });
}));
const getBook = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { params: { id }, } = req;
    const book = yield book_service_1.BookService.getBookFromDB(id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Retrieved book successfully',
        data: book,
    });
}));
const updateBook = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body, params: { id }, email, } = req;
    const updatedBook = yield book_service_1.BookService.updateBookInDB(id, body, email);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Book updated successfully',
        data: updatedBook,
    });
}));
const deleteBook = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { params: { id }, email, } = req;
    yield book_service_1.BookService.deleteBookFromDB(id, email);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Book deleted successfully',
        data: id,
    });
}));
const createReview = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { params: { id }, body, email, } = req;
    const data = yield book_service_1.BookService.createCommentInDB(id, body, email);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Comment added successfully',
        data,
    });
}));
exports.BookController = {
    getAllBooks,
    createBook,
    getBook,
    updateBook,
    deleteBook,
    createReview,
};
