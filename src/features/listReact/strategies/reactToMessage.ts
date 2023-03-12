import { reactAPI } from 'api/restful-user/list/react'
import { chatActions } from 'states/slices/chatSlice'
import ReactStrategy from '.'

export default class ReactToMessage extends ReactStrategy {
    getReduxActions() {
        return {
            deleteReact: chatActions.deleteReactFromPost,
            addOrUpdateReact: chatActions.addOrUpdateReactToPost,
        }
    }
    getReactAPI() {
        return {
            addReact: reactAPI.addReactToMessage,
        }
    }
}
