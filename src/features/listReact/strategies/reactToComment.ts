import { reactAPI } from 'api/rest/list/react'
import { commentActions } from 'states/slices/commentSlice'
import ReactStrategy from '.'

export default class ReactToComment extends ReactStrategy {
    getReduxActions() {
        return {
            deleteReact: commentActions.deleteReactFromComment,
            addOrUpdateReact: commentActions.addOrUpdateReactToComment,
        }
    }
    getReactAPI() {
        return {
            addReact: reactAPI.addReactToComment,
        }
    }
}
