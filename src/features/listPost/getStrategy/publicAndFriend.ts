import { postAPI } from 'api/rest'
import { IQueryPost } from 'models/common'
import GetPostStrategy from '.'

class PublicFriend extends GetPostStrategy {
    getData = async (query: IQueryPost) => {
        const res = await postAPI.getFromAllUser(query, this.user)
        return res.data
    }
}

export default PublicFriend
