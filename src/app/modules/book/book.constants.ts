export const filterableFields: Array<string> = [
  'title',
  'author',
  'genre',
  'publicationDate',
]

export const searchAndFilterableFields: Array<string> = [
  'searchTerm',
  ...filterableFields,
]

export const bookGenres = [
  'fiction',
  'mystery',
  'science_fiction',
  'fantasy',
  'thriller',
]
