export const SERVER_EXPRESS =
    process.env.SERVER_EXPRESS ||
    'http://localhost:4000' ||
    'https://facebookserverexpress.herokuapp.com'
export const SERVER_SOCKET =
    process.env.SERVER_SOCKET ||
    'http://localhost:9000' ||
    'https://facebookserversocket.herokuapp.com'

interface IDB {
    name: string
    coll: {
        users: string
        chatRooms: string
        messages: string
        comments: string
        posts: string
        reacts: string
        notifications: string
    }
}

export const FACEBOOK_DB: IDB = {
    name: 'Facebook',
    coll: {
        users: 'users',
        chatRooms: 'chatrooms',
        messages: 'messages',
        comments: 'comments',
        posts: 'posts',
        reacts: 'reacts',
        notifications: 'notifications',
    },
}
export const BATTLESHIP_DB = 'BattleShip'
