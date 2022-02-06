import queryString from 'query-string'
import Axios, { imagesConditon } from 'api/rest/axios'
import { ID, IQueryPost } from 'models/common'
import { IModePost, IPost } from 'models/post'
import { IComment } from 'models/comment'
import { IPublicInfo } from 'models/user'

class PostAPI {
    url = `post`
    async get(postId: ID) {
        return Axios.get<IPost>(`${this.url}/get/${postId}`)
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

    async getComment(query: IQueryPost, postId: ID) {
        return Axios.get<IPost[]>(
            `${this.url}/getComment/${postId}?${queryString.stringify(query)}`
        )
    }
    async addComment(commentInfo: Partial<IComment>, postId: string) {
        let form = new FormData()
        form.append('content', commentInfo.content || '')
        if (commentInfo.images) {
            for (const image of commentInfo.images) form.append('images', image)
        }

        return Axios.put(`${this.url}/addComment/${postId}`, form, imagesConditon)
    }
    async updateComment(updateField: Partial<IComment>, postId: string) {
        let form = new FormData()
        form.append('_id', updateField._id || '')
        form.append('content', updateField.content || '')
        console.log(updateField)
        if (updateField.images) {
            for (const image of updateField.images) form.append('images', image)
        }
        return Axios.put(`${this.url}/updateComment/${postId}`, form, imagesConditon)
    }
    async deleteComment(commentId: ID) {
        return Axios.delete(`${this.url}/deleteComment/${commentId}`)
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
