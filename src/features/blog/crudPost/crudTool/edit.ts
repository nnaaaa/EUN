import { postActions } from 'states/slices/postSlice'
import { postAPI } from 'api/rest'
import { IPost } from 'models/post'
import { CRUDType } from '.'
import { modeOptions } from 'features/blog/crudPost/selectMode'

class Edit extends CRUDType {
    constructor(post: Partial<IPost>) {
        super(post)
        this._title = 'Edit Post'
        this._completedTitle = 'Edit'
    }
    public init() {
        if (!this._post) return
        this._tool.setContent(this._post.content)
        this._tool.setPreviewImages(this._post.images)
        const [mode, setMode] = this._modeTool
        setMode(modeOptions.find((option) => option.value === this._post?.mode) || mode)
    }

    public async complete() {
        try {
            const contentAndImages = this._tool.getContentAndImages()
            const [mode] = this._modeTool
            if (contentAndImages) {
                if (!this._tool.imageFiles) contentAndImages.images = this._post?.images
                const post: Partial<IPost> = {
                    ...this._post,
                    ...contentAndImages,
                    mode: mode.value,
                }
                const updatedPost = await postAPI.update(post)
                this._dispatch(postActions.updatePost(updatedPost.data as any))
            }
        } catch (e) {
            console.log(e)
        }
    }
}

export default Edit
