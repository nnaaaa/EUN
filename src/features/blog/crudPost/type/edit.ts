import { postAPI } from "api/rest";
import { IPost } from "models/post";
import { CRUDType } from ".";
import { modeOptions } from 'features/blog/crudPost/selectMode';

class Edit extends CRUDType{
    constructor(post:Partial<IPost>) {
        super(post)
        this._title = 'Edit Post'
        this._completedTitle = 'Edit'
    }
    public init(){
        if (!this._post)
            return
        this._tool.setContent(this._post.content)
        this._tool.setPreviewImages(this._post.images)
        const [mode, setMode] = this._modeTool
        setMode(modeOptions.find(option=>option.value === this._post?.mode) || mode)
    }
    public async complete(){
        try {
            const contentAndImages = this._tool.getContentAndImages()
            const [mode] = this._modeTool
            if (contentAndImages) {
                const post: Partial<IPost> = {
                    ...contentAndImages,
                    mode,
                }
                await postAPI.create(post)
            }
        } catch (e) {
            console.log(e)
        }
    }
}

export default Edit