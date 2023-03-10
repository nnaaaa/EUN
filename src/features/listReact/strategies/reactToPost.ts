import { reactAPI } from 'api/rest/list/react'
import { postActions } from 'states/slices/postSlice'
import ReactStrategy from '.'

export default class ReactToPost extends ReactStrategy {
    getReduxActions() {
        return {
            deleteReact: postActions.deleteReactFromPost,
            addOrUpdateReact: postActions.addOrUpdateReactToPost,
        }
    }
    getReactAPI() {
        return {
            addReact: reactAPI.addReactToPost,
        }
    }
}
