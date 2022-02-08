import Axios, { imagesConditon } from 'api/rest/axios'
import { IComment } from 'models/comment'
import { ID, IQueryPost } from 'models/common'
import queryString from 'query-string'

class CommentAPI {
    url = `comment`
    async getListCommentFromTime(query: IQueryPost, possess: ID, fromTime: Date) {
        return Axios.get<IComment[]>(
            `${
                this.url
            }/getListCommentFromTime/${possess}/${fromTime}?${queryString.stringify(
                query
            )}`
        )
    }
    getComment = async (commentId: ID) => {
        return Axios.get<IComment>(`${this.url}/getComment/${commentId}`)
    }

    addCommentToPost = async (commentInfo: Partial<IComment>, possessId: string) => {
        let form = new FormData()
        form.append('content', commentInfo.content || '')
        if (commentInfo.images) {
            for (const image of commentInfo.images) form.append('images', image)
        }
        form.append('levelOrder', commentInfo.levelOrder?.toString() || '0')

        return Axios.post(
            `${this.url}/addCommentToPost/${possessId}`,
            form,
            imagesConditon
        )
    }
    addCommentToComment = async (commentInfo: Partial<IComment>, possessId: string) => {
        let form = new FormData()
        form.append('content', commentInfo.content || '')
        if (commentInfo.images) {
            for (const image of commentInfo.images) form.append('images', image)
        }
        form.append('levelOrder', commentInfo.levelOrder?.toString() || '0')

        return Axios.post(
            `${this.url}/addCommentToComment/${possessId}`,
            form,
            imagesConditon
        )
    }

    async updateComment(updateField: Partial<IComment>) {
        let form = new FormData()
        form.append('_id', updateField._id || '')
        form.append('content', updateField.content || '')
        if (updateField.images) {
            for (const image of updateField.images) form.append('images', image)
        }
        return Axios.put(`${this.url}/updateComment`, form, imagesConditon)
    }
    async deleteComment(commentId: ID) {
        return Axios.delete(`${this.url}/deleteComment/${commentId}`)
    }
}

export const commentAPI = new CommentAPI()
