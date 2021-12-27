import Axios, { imagesConditon } from 'api/rest/axios'
import { ID, IQueryPost } from 'models/common'
import { IModePost, IPost } from 'models/post'
import { IComment } from 'models/comment'
import { IEmotionList, IReact } from 'models/react'

class PostAPI {
    url = `post`

    async create(postInfo: Partial<IPost>) {
        let form = new FormData()
        form.append('content', postInfo.content || '')
        form.append('mode', postInfo.mode || 'public')
        if (postInfo.images) {
            for (const image of postInfo.images) form.append('images', image)
        }

        return Axios.post(`${this.url}/create`, form, imagesConditon)
    }
    async update(postInfo: Partial<IPost>) {
        let form = new FormData()
        form.append('content', postInfo.content as string)
        form.append('mode', postInfo.mode as IModePost)
        if (postInfo.images) {
            for (const image of postInfo.images) form.append('images', image)
        }

        return Axios.put(`${this.url}/update/${postInfo._id}`, form, imagesConditon)
    }

    async updateEmotion(reactId: ID, updateType: IEmotionList) {
        return Axios.put<IEmotionList>(`react/update/${reactId}/${updateType}`)
    }

    async addComment(commentInfo: Partial<IComment>, postId: string) {
        let form = new FormData()
        form.append('content', commentInfo.content || '')
        if (commentInfo.images) {
            for (const image of commentInfo.images) form.append('images', image)
        }

        return Axios.put(`${this.url}/addComment/${postId}`, form, imagesConditon)
    }

    async getFromAllUser(query?: IQueryPost) {
        return Axios.get<IPost[]>(`${this.url}/getAllUser`)
    }
    async getFromOneUser(query?: IQueryPost) {
        return Axios.get<IPost[]>(`${this.url}/getOneUser`)
    }
    async getReact(reactId: ID) {
        return Axios.get<IReact>(`react/get/${reactId}`)
    }
    async acceptInvite(friendId: string) {
        return Axios.post(`${this.url}/acceptInvite`, { friendId })
    }
}

export const postAPI = new PostAPI()
