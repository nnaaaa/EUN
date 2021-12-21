import Axios, { imagesConditon } from 'api/rest/axios'
import { IQueryPost } from 'models/Common'
import { IPost } from 'models/post'

class PostAPI {
    url = `post`

    async create(postInfo: Partial<IPost>) {
        let form = new FormData()
        form.append("content", postInfo.content || '')
        form.append("mode", postInfo.mode || 'public')
        if (postInfo.images) {
            for (const image of postInfo.images)
                form.append("images", image)
        }

        return Axios.post(`${this.url}/create`,form,imagesConditon)
    }
    async getFromAllUser(query?: IQueryPost) {
        return Axios.get<IPost[]>(`${this.url}/getAllUser`)
    }
    async getFromOneUser(query?: IQueryPost) {
        return Axios.get<IPost[]>(`${this.url}/getOneUser`)
    }
    async acceptInvite(friendId: string) {
        return Axios.post(`${this.url}/acceptInvite`, { friendId })
    }
}

export const postAPI = new PostAPI()
