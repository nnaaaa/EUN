import { postAPI } from "api/rest";
import { IPost } from "models/post";
import { CRUDType } from ".";

class Create extends CRUDType{
    constructor() {
        super()
        this._title = 'Create Post'
        this._completedTitle = 'Create'
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

export default Create