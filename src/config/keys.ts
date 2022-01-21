export const SERVER_EXPRESS =
    process.env.SERVER_EXPRESS ||
    'http://localhost:5000' ||
    'https://facebookserverexpress.herokuapp.com'
export const SERVER_SOCKET =
    process.env.SERVER_SOCKET || 'http://localhost:9000' || 'https://facebookserversocket.herokuapp.com'

interface IDB {
    name: string
    coll: {
        users: string
        chatRooms: string
        messages: string
        posts: string
        reacts: string
    }
}

export const FACEBOOK_DB: IDB = {
    name: 'Facebook',
    coll: {
        users: 'users',
        chatRooms: 'chatrooms',
        messages: 'messages',
        posts: 'posts',
        reacts: 'reacts',
    },
}
export const BATTLESHIP_DB = 'BattleShip'
