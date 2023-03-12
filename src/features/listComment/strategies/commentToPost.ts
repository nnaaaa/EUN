import { commentAPI } from 'api/restful-user/list/comment'
import { notificationAPI } from 'api/restful-user/list/notification'
import { INotification } from 'models/notification'
import { commentActions } from 'states/slices/commentSlice'
import CommentStrategy from '.'

export default class CommentToPost extends CommentStrategy {
    getReplyAPI() {
        return {
            add: commentAPI.addCommentToPost,
            get: commentAPI.getComment,
        }
    }
    getReduxActions() {
        return {
            addOrUpdate: commentActions.addOrUpdateComment,
            delete: commentActions.deleteComment,
        }
    }
}
