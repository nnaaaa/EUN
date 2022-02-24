import Axios from 'api/rest/axios'
import { IComment } from 'models/comment'
import { ID, IQueryPost } from 'models/common'
import { INotification } from 'models/notification'
import { IPublicInfo } from 'models/user'
import queryString from 'query-string'

interface IPossess {
    _id: ID
    owner: IPublicInfo
    participants: ID[] | IPublicInfo[]
    levelOrder: number
}

//những field bị omit sẽ được server tạo
type OmitNotification = Omit<INotification, '_id' | 'createAt' | 'owner' | 'seen'>

class NotificationAPI {
    url = `notification`
    async getListFromTime(query: IQueryPost, fromTime: Date) {
        return Axios.get<INotification[]>(
            `${this.url}/getListFromTime/${fromTime}?${queryString.stringify(query)}`
        )
    }
    get = async (NotificationId: ID) => {
        return Axios.get<INotification>(`${this.url}/get/${NotificationId}`)
    }

    createCommentNotification = async (comment: IComment, possess: IPossess) => {
        const {
            participants,
            owner: { _id: userId },
            _id,
        } = possess
        const title = possess.levelOrder === 0 ? 'comment on post' : 'reply on comment'
        const notification: OmitNotification = {
            path: `${userId}/post/${_id}/comments/${comment._id}`,
            title,
            sent: participants,
        }
        return Axios.post(`${this.url}/add`, notification)
    }
    createAddFriendNotification = async (friendId: ID) => {
        const notification: OmitNotification = {
            path: `addFriend/${friendId}`,
            title: 'add friend',
            sent: [friendId],
        }
        return Axios.post(`${this.url}/add`, notification)
    }

    async seenNotification() {
        return Axios.put(`${this.url}/seenNotification`)
    }
    async update(updateField: Partial<INotification>) {
        return Axios.put(`${this.url}/update`, updateField)
    }
    async delete(notificationId: ID) {
        return Axios.delete(`${this.url}/delete/${notificationId}`)
    }
}

export const notificationAPI = new NotificationAPI()
