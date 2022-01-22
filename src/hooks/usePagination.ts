import { useState } from "react"


const usePagination = (limit: number) => {
    const [_page, setPage] = useState(1)
    const [_limit, setLimit] = useState(limit)
    
    return {currentPage:_page,limitPerPage:_limit}
}

export default usePagination