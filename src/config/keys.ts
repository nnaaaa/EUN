export const SERVER_EXPRESS =
    process.env.SERVER_EXPRESS || 'http://localhost:5000'
export const SERVER_SOCKET =
    process.env.SERVER_SOCKET || 'http://localhost:9000'

interface IDB {
    name: string
    coll: {
        [key: string]: string
    }
}

export const FACEBOOK_DB: IDB = {
    name: 'Facebook',
    coll: {
        users: 'users',
        chatRooms: 'chatrooms',
        messages:'messages'
    },
}
export const BATTLESHIP_DB = 'BattleShip'
