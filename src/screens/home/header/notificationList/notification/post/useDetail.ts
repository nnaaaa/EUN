import { friendAPI, postAPI } from 'api/rest'
import { IPost } from 'models/post'
import { IPublicInfo } from 'models/user'
import { useEffect, useState } from 'react'

export const useDetail = (path: string) => {
    const [isLoading, setIsLoading] = useState(false)
    const [post, setPost] = useState<IPost | null>(null)
    const [replyTo, setReplyTo] = useState<IPublicInfo | null>(null)

    useEffect(() => {
        ;(async () => {
            setIsLoading(true)
            const pathArray = path.split('/')
            const user = (await friendAPI.findById(pathArray[0])).data
            const rootPost = (await postAPI.getRootPost(pathArray[4])).data
            setPost(rootPost)
            setReplyTo(user)
            setIsLoading(false)
        })()
    }, [path])

    return { post, replyTo, isLoading }
}
