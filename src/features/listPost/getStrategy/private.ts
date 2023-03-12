import { postAPI } from 'api/restful-user'
import { IQueryPost } from 'models/index'
import GetPostStrategy from '.'

class Private extends GetPostStrategy {
    getData = async (query: IQueryPost) => {
        const res = await postAPI.getFromOneUser(query, this.user)
        return res.data
        // const { dispatch, _page, _limit, setPage, setIsHasMore, isHasMore } = pagination
        // try {
        //     if (!isHasMore) return
        //     const res = await postAPI.getFromAllUser({ _page, _limit })
        //     if (!res.data || res.data.length === 0) throw new Error()
        //     // setPage((pre) => pre + 1)
        //     setPage(pre=>pre+1)
        //     dispatch(postActions.getMorePost(res.data as any))

        //     //nếu mảng trả về nhỏ hơn limit thì cũng có nghĩa là đã hết data
        //     if (res.data.length < limitPerPage) throw new Error()
        // } catch (e) {
        //     // setIsHasMore(false)
        //     setIsHasMore(false)
        // }
    }
}

export default Private
