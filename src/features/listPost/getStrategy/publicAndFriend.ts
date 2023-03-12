import { postAPI } from 'api/restful-user'
import { IQueryPost } from 'models/index'
import GetPostStrategy from '.'

class PublicFriend extends GetPostStrategy {
    getData = async (query: IQueryPost) => {
        const res = await postAPI.getFromAllUser(query, this.user)
        return res.data
    }
}

export default PublicFriend
