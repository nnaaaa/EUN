import { postAPI } from 'api/rest'
import { IQueryPost } from 'models/index'
import { IPost } from 'models/post'
import { IPublicInfo } from 'models/user'

abstract class GetPostStrategy {
    protected user: IPublicInfo
    constructor(user: IPublicInfo) {
        this.user = user
    }
    abstract getData(query: IQueryPost): Promise<IPost[]>
}
export default GetPostStrategy
