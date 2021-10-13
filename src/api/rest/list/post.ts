import { SERVER_EXPRESS } from 'config/keys';
import { IQueryPost } from 'models/Common';
import { IPost } from 'models/post';
import Axios from 'api/rest/axios';

class PostAPI {
    url = `${SERVER_EXPRESS}/post`

    async create(postInfo: IPost) {
        return Axios.post<IPost>(`${this.url}/create`, postInfo)  
    }
    async getFromAllUser(query: IQueryPost) {
        return Axios.get<IPost[]>(`${this.url}/getAllUser`)
    }
    async getFromOneUser(query: IQueryPost) {
        return Axios.get<IPost[]>(`${this.url}/getOneUser`)
    }
    async acceptInvite(friendId: string) {
        return Axios.post(`${this.url}/acceptInvite`, { friendId })
    }
}

export const postAPI = new PostAPI()
