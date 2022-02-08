import { commentAPI } from 'api/rest/list/comment'
import { commentActions } from 'states/slices/commentSlice'
import CommentStrategy from '.'

export default class CommentToPost extends CommentStrategy {
    getCommentAPI() {
        return {
            addComment: commentAPI.addCommentToPost,
            getComment: commentAPI.getComment,
        }
    }
    getReduxActions() {
        return {
            addOrUpdateComment: commentActions.addOrUpdateComment,
            deleteComment: commentActions.deleteComment,
        }
    }
}
