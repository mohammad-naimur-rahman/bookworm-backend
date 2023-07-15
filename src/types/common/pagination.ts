export type PaginationOptionsType = {
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

export type FiltersType = {
  searchTerm?: string
  minPrice?: number
  maxPrice?: number
}
