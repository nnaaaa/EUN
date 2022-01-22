export type ID = string
export type CRUD = 'update' | 'insert' | 'delete'
export interface IQueryPost {
    _page?: number
    _limit?: number
    _id:ID
}

export type Populated<M, K extends keyof M> = Omit<M, K> & {
    [P in K]: Exclude<M[P], ID[] | ID>
}
