import { postAPI } from 'api/rest'
import { IPost } from 'models/post'
import { postActions } from 'states/slices/postSlice'
import { CRUDType } from '.'

class Create extends CRUDType {
    constructor() {
        super()
        this._title = 'Create Post'
        this._completedTitle = 'Create'
    }
    public async complete() {
        try {
            if (!this._tool || !this._modeTool || !this._dispatch) throw new Error()
            const contentAndImages = this._tool.getContentAndImages()
            const [mode] = this._modeTool

            if (contentAndImages) {
                const post: Partial<IPost> = {
                    ...contentAndImages,
                    mode: mode.value,
                }
                const res = await postAPI.create(post)
                // res.data là id của post vừa được tạo
                const savedPost = await postAPI.get(res.data as any)
                this._dispatch(postActions.insertPost(savedPost.data))
            }
        } catch (e) {
            console.log(e)
        }
    }
}

export default Create
