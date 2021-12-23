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
            const contentAndImages = this._tool.getContentAndImages()
            const [mode] = this._modeTool

            if (contentAndImages) {
                const post: Partial<IPost> = {
                    ...contentAndImages,
                    mode: mode.value,
                }
                const savedPost = await postAPI.create(post)
                this._dispatch(postActions.insertPost(savedPost.data as any))
            }
        } catch (e) {
            console.log(e)
        }
    }
}

export default Create
