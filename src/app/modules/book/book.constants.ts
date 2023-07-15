export const filterableFields: Array<string> = [
  'author',
  'genre',
  'publicationDate',
]

export const searchAndFilterableFields: Array<string> = [
  'searchTerm',
  ...filterableFields,
]
