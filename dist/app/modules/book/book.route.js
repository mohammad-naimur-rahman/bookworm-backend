"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookRoutes = void 0;
const express_1 = require("express");
const book_controller_1 = require("./book.controller");
const checkAuth_1 = __importDefault(require("../../middlewares/checkAuth"));
const validateRequest_1 = require("../../middlewares/validateRequest");
const book_validation_1 = require("./book.validation");
const router = (0, express_1.Router)();
router
    .route('/')
    .get(book_controller_1.BookController.getAllBooks)
    .post((0, validateRequest_1.validateRequest)(book_validation_1.BookValidation.createBookSchema), checkAuth_1.default, book_controller_1.BookController.createBook);
router
    .route('/:id')
    .get(book_controller_1.BookController.getBook)
    .patch((0, validateRequest_1.validateRequest)(book_validation_1.BookValidation.updateBookSchema), checkAuth_1.default, book_controller_1.BookController.updateBook)
    .delete(checkAuth_1.default, book_controller_1.BookController.deleteBook);
router
    .route('/comment/:id')
    .post((0, validateRequest_1.validateRequest)(book_validation_1.BookValidation.createReviewSchema), checkAuth_1.default, book_controller_1.BookController.createReview);
exports.BookRoutes = router;
