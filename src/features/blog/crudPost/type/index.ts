import { useContent } from 'hooks/useContent';
import { IPost } from 'models/post';
import { useInitMode } from '../selectMode';

export type ToolType = ReturnType<typeof useContent>
export type IModeToolType = ReturnType<typeof useInitMode>

export abstract class CRUDType{
    protected _title!: string
    protected _completedTitle!: string
    protected _tool!: ToolType
    protected _modeTool!: IModeToolType
    protected _post: Partial<IPost> | undefined
    constructor(post?: Partial<IPost>) {
        this._post = post
    }
    public getTitle() {
        return this._title
    }
    public getCompletedTitle() {
        return this._completedTitle
    }
    public setTool(tool:ToolType): void{
        this._tool = tool
    }
    public setModeTool(modeTool: IModeToolType): void{
        this._modeTool = modeTool
    }
    public init(): void{}
    public async complete(){}
}