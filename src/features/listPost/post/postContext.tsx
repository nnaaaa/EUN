import { createContext, Dispatch, ReactChild, SetStateAction, useState } from 'react'
interface IPostContextValue {
    isLoading: boolean
    setIsLoading?: Dispatch<SetStateAction<boolean>>
    isDisplayNERContent: boolean
    setIsDisplayNERContent?: Dispatch<SetStateAction<boolean>>
}

const initValue: IPostContextValue = {
    isLoading: false,
    isDisplayNERContent: true,
}

export const PostContext = createContext<IPostContextValue>(initValue)

function PostProvider({ children }: { children: ReactChild }) {
    const [isLoading, setIsLoading] = useState(false)
    const [isDisplayNERContent, setIsDisplayNERContent] = useState(true)

    return (
        <PostContext.Provider value={{ isLoading, setIsLoading, isDisplayNERContent, setIsDisplayNERContent }}>
            {children}
        </PostContext.Provider>
    )
}

export default PostProvider
