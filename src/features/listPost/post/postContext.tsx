import { createContext, Dispatch, ReactChild, SetStateAction, useState } from 'react'
interface IPostContextValue {
    isLoading: boolean
    setIsLoading?: Dispatch<SetStateAction<boolean>>
}

const initValue: IPostContextValue = {
    isLoading: false,
}

export const PostContext = createContext<IPostContextValue>(initValue)

function PostProvider({ children }: { children: ReactChild }) {
    const [isLoading, setIsLoading] = useState(false)

    return (
        <PostContext.Provider value={{ isLoading, setIsLoading }}>
            {children}
        </PostContext.Provider>
    )
}

export default PostProvider
