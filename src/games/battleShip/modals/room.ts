import { SensorTiles } from './map'
import { IShip } from './ship'
import { IAtlatSize, ILimitShip } from './state'

type IMode = 'random' | 'select'

export type IRole = 'player1' | 'player2' | 'spectator'

export interface IPlayer {
    id: string
    avatar: string
    name: string
}

interface IMessage {
    owner: IPlayer
    content: string
}

export interface IRoom {
    id: string
    atlasSize: IAtlatSize
    limitShip: ILimitShip
    mode: IMode
    isStarting: false
    player1?: IPlayer
    player2?: IPlayer
    ships1: IShip[]
    ships2: IShip[]
    sensors1: SensorTiles
    sensors2: SensorTiles
    userReady: IPlayer[]
    arranged: IPlayer[]
    spectators: IPlayer[]
    message: IMessage
}
