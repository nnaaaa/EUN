import Axios, { imagesConditon } from 'api/rest/axios'
import { ID, IQueryPost } from 'models/common'
import { IModePost, IPost } from 'models/post'
import { IPublicInfo } from 'models/user'
import queryString from 'query-string'

class PostAPI {
    url = `post`
    async get(postId: ID) {
        return Axios.get<IPost>(`${this.url}/get/${postId}`)
    }
    async getRootPost(commentId: ID) {
        return Axios.get<IPost>(`${this.url}/getRootPost/${commentId}`)
    }
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
    async delete(postId: ID) {
        return Axios.delete(`${this.url}/delete/${postId}`)
    }

    async getFromAllUser(query: IQueryPost, user: IPublicInfo) {
        return Axios.get<IPost[]>(
            `${this.url}/getAllUser/${user._id}?${queryString.stringify(query)}`
        )
    }
    async getFromOneUser(query: IQueryPost, user: IPublicInfo) {
        return Axios.get<IPost[]>(
            `${this.url}/getOneUser/${user._id}?${queryString.stringify(query)}`
        )
    }
}

export const postAPI = new PostAPI()
