import { IPublicInfo } from 'models/user'
import { SensorTiles } from './map'
import { IShip } from './ship'
import { IAtlatSize, ILimitShip } from './state'

export type IMode = 'random' | 'select'

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
    _id: string
    unique_id: string
    atlasSize: IAtlatSize
    limitShip: ILimitShip
    mode: IMode
    isStarting: false
    player1: IPublicInfo | undefined
    player2: IPublicInfo | undefined
    ships1: IShip[]
    ships2: IShip[]
    sensors1: SensorTiles
    sensors2: SensorTiles
    userReady: IPublicInfo[]
    arranged: IPublicInfo[]
    spectators: IPublicInfo[]
    message?: IMessage
}
