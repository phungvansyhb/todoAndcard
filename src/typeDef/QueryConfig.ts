export type QueryConfig = {
    page?: number,
    limit?: number,
    sortBy?: string,
    orderBy?: 'desc' | 'asc',
    search?: string,
    filter?: string,
    title?: string
}