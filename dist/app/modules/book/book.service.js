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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const mongoose_1 = require("mongoose");
const ApiError_1 = __importDefault(require("../../../errorHandlers/ApiError"));
const paginationHelpers_1 = require("../../../helpers/paginationHelpers");
const book_constants_1 = require("./book.constants");
const book_model_1 = require("./book.model");
const auth_model_1 = require("../auth/auth.model");
const getAllBooksFromDB = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const { page, limit, skip, sortBy, sortOrder } = paginationHelpers_1.paginationHelpers.calculatePagination(paginationOptions);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: book_constants_1.filterableFields.map(field => ({
                [field]: {
                    $regex: searchTerm,
                    $options: 'i',
                },
            })),
        });
    }
    if (Object.keys(filtersData).length) {
        andConditions.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    const whereConditions = andConditions.length > 0 ? { $and: andConditions } : {};
    const result = yield book_model_1.Book.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const total = yield book_model_1.Book.countDocuments(whereConditions);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const createBookInDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (!payload.user) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, `User is required!`);
    }
    const createdBook = yield book_model_1.Book.create(payload);
    if (!createdBook) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create book!');
    }
    return createdBook;
});
const getBookFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield book_model_1.Book.findById(id).populate({
        path: 'reviews',
        populate: {
            path: 'user',
            select: 'name',
        },
    });
    if (!book) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, `No book found with id ${id}`);
    }
    return book;
});
const updateBookInDB = (id, payload, email) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield book_model_1.Book.findById(id);
    if (!book) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, `No book found with id ${id}`);
    }
    const bookCreatorId = mongoose_1.Types.ObjectId.prototype.toString.call(book.user);
    const user = yield auth_model_1.User.findById(payload.user);
    if (!user) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, `No user found with id ${payload.user}`);
    }
    if (email !== user.email) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, `User doesn't match`);
    }
    if (bookCreatorId !== payload.user) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, `You did't create the book`);
    }
    const updatedBook = yield book_model_1.Book.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    if (!updatedBook) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Book update failed!');
    }
    return updatedBook;
});
const deleteBookFromDB = (id, email) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield book_model_1.Book.findById(id);
    if (!book) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, `No book found with id ${id}`);
    }
    const user = yield auth_model_1.User.findById(book.user);
    if (!user) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, `No user found with id ${book.user}`);
    }
    if (user.email !== email) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, `You didn't create this book`);
    }
    const result = yield book_model_1.Book.findByIdAndDelete(id);
    if (result === null) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Book delete failed!');
    }
    return result;
});
const createCommentInDB = (id, payload, email) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield book_model_1.Book.findById(id);
    if (!book) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, `No book found with id ${id}`);
    }
    const user = yield auth_model_1.User.findOne({ email }).select('id').lean();
    if (!user) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, `No user found with email: ${email}`);
    }
    const commenterId = mongoose_1.Types.ObjectId.prototype.toString.call(user._id);
    const updatedBook = yield book_model_1.Book.findByIdAndUpdate(book._id, {
        $push: {
            reviews: { review: payload.review, user: commenterId },
        },
    }, { new: true }).populate({
        path: 'reviews',
        populate: {
            path: 'user',
            select: 'name',
        },
    });
    return updatedBook;
});
exports.BookService = {
    getAllBooksFromDB,
    createBookInDB,
    getBookFromDB,
    updateBookInDB,
    deleteBookFromDB,
    createCommentInDB,
};
