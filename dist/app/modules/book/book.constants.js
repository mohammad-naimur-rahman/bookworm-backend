"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookGenres = exports.searchAndFilterableFields = exports.filterableFields = void 0;
exports.filterableFields = [
    'title',
    'author',
    'genre',
    'publicationDate',
];
exports.searchAndFilterableFields = [
    'searchTerm',
    ...exports.filterableFields,
];
exports.bookGenres = [
    'fiction',
    'mystery',
    'science_fiction',
    'fantasy',
    'thriller',
];
