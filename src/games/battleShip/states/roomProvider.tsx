import {
    createContext,
    Dispatch,
    ReactChild,
    SetStateAction,
    useContext,
    useEffect,
    useState,
} from 'react'
import { SocketContext } from 'states/context/socket'
import { useAppSelector } from 'states/hooks'
import url from '../api'
import { useCreateAndUpdateRoom } from '../api/useCreateAndUpdateRoom'
import { useListRoom } from '../api/useListRoom'
import { ISensor, ISensorTiles } from '../modals/map'
import { IMessage, IRoom } from '../modals/room'
import { IBody, IShip } from '../modals/ship'
import BattleShipService from 'games/battleShip/services'

export type PlayerRole = 'spectator' | 'player1' | 'player2' | undefined

interface IRoomContextValue {
    roomId: string | undefined
    setRoomId?: Dispatch<SetStateAction<string | undefined>>
    room: IRoom | undefined
    setRoom?: Dispatch<SetStateAction<IRoom | undefined>>
    role: PlayerRole
    setRole?: Dispatch<SetStateAction<PlayerRole>>
    listPlayingRoom: IRoom[]
    setListPlayingRoom?: Dispatch<SetStateAction<IRoom[]>>
    listPrepareRoom: IRoom[]
    setListPrepareRoom?: Dispatch<SetStateAction<IRoom[]>>
    outRoom?: () => void
    attack?: (tile: ISensor) => void
}
const initContextValue = {
    roomId: undefined,
    room: undefined,
    role: undefined,
    listPlayingRoom: [],
    listPrepareRoom: [],
}
export const RoomContext = createContext<IRoomContextValue>(initContextValue)

export const RoomProvider = ({ children }: { children: ReactChild }) => {
    const user = useAppSelector((state) => state.user.current)
    const { socket } = useContext(SocketContext)
    const [roomId, setRoomId] = useState<string>()
    const [room, setRoom] = useState<IRoom>()
    const [listPlayingRoom, setListPlayingRoom] = useState<IRoom[]>([])
    const [listPrepareRoom, setListPrepareRoom] = useState<IRoom[]>([])
    const [role, setRole] = useState<PlayerRole>()

    useCreateAndUpdateRoom(roomId, setRoom, setRoomId)
    useListRoom(setListPlayingRoom, setListPrepareRoom)

    const outRoom = () => {
        if (!user || !room || !socket) return
        if (user._id === room.player1?._id) {
            if (!room.player2 && room.spectators.length === 0)
                socket.emit(`${url}/deleteRoom`, room._id)
            else {
                const userReady = room.userReady.filter((u) => u._id !== user._id)
                const updateRoom: Partial<IRoom> = {
                    _id: room._id,
                    userReady,
                }
                socket.emit(`${url}/player1_out`, updateRoom)
            }
        } else if (user._id === room.player2?._id) {
            if (!room.player1 && room.spectators.length === 0)
                socket.emit(`${url}/deleteRoom`, room._id)
            else {
                const userReady = room.userReady.filter((u) => u._id !== user._id)
                const updateRoom: Partial<IRoom> = {
                    _id: room._id,
                    userReady,
                }
                socket.emit(`${url}/player2_out`, updateRoom)
            }
        } else {
            if (!room.player1 && !room.player2 && room.spectators.length === 1)
                socket.emit(`${url}/deleteRoom`, room._id)
            else {
                const spectators = room.spectators.filter((u) => u._id !== user._id)
                const updateRoom: Partial<IRoom> = {
                    _id: room._id,
                    spectators,
                }
                socket.emit(`${url}/updateRoom`, updateRoom)
            }
        }
    }

    const attack = (tile: ISensor) => {
        if (!user || !room || !socket) return
        if (!room.player1 || !room.player2) return
        if (user._id !== room.turn) return

        if (tile.type !== 'pure') return

        let arrayName = user.username.split(' ')
        const firstName = arrayName[arrayName.length - 1].slice(0, 10) + ' '
        let message: IMessage = {
            owner: { ...user, username: firstName },
            content: '',
        }
        const considerAttack = (shipOrder: 'ships1' | 'ships2', sensorOrder: 'sensors1' | 'sensors2',playerOrder:'player1' | 'player2') => {
            if (!room[playerOrder]) return
            let isHit = false

            for (let ship of room[shipOrder]) {
                for (let body of ship.body) {
                    if (body.x === tile.x && body.y === tile.y) {
                        isHit = true
                        let foundShip: IShip
                        const newShips: IShip[] = room[shipOrder].map((s) =>
                            s.body === ship.body
                                ? (() => {
                                    foundShip = {
                                        ...s,
                                        body: s.body.map((b) =>
                                            b.x === tile.x && b.y === tile.y
                                                ? { ...b, type: 'hit' }
                                                : b
                                        ),
                                    }
                                    return foundShip
                                })()
                                : s
                        )
                        const newSensors:ISensorTiles = room[sensorOrder].map((sensor) =>
                            sensor.x === tile.x && sensor.y === tile.y ? { ...tile, type: 'hit' } : sensor
                        )

                        if (
                            BattleShipService.isDestroyFullShip(
                                newShips.find(s => s === foundShip) as IShip
                            )
                        )
                            message.content = 'was completely sunk ' + ship.name
                        else message.content = 'hit'

                        if (BattleShipService.isEndGame(newShips)) message.content = 'is winner'

                        socket.emit(`${url}/updateRoom`, {
                            _id:room._id,
                            [sensorOrder]: newSensors,
                            [shipOrder]: newShips,
                            turn: room[playerOrder]?._id,
                            message,
                        })
                        break
                    }
                }
            }
            if (!isHit) {
                message.content = 'missed, no ship was shot'
                const newSensors = room[sensorOrder].map((sensor) =>
                    sensor.x === tile.x && sensor.y === tile.y ? { ...tile, type: 'miss' } : sensor
                )
                socket.emit(`${url}/updateRoom`, {
                    _id:room._id,
                    [sensorOrder]: newSensors,
                    turn: room[playerOrder]?._id,
                    message,
                })
            }
        }

        if (user._id === room.player1._id) 
            considerAttack('ships2','sensors2','player2')
        else if (user._id === room.player2._id)
            considerAttack('ships1','sensors1','player1')

    }

    useEffect(() => {
        if (!room) return
        setRoomId(room._id)
    }, [room])

    return (
        <RoomContext.Provider
            value={{
                roomId,
                setRoomId,
                room,
                setRoom,
                role,
                setRole,
                listPlayingRoom,
                listPrepareRoom,
                setListPlayingRoom,
                setListPrepareRoom,
                outRoom,
                attack,
            }}
        >
            {children}
        </RoomContext.Provider>
    )

    //   const joinRoom = async (room) => {
    //     const player = {id, name, avatar}
    //     setMapId(room.id)
    //     if (!room.player1.id) {
    //       setRole('player1')
    //       socket.emit('update-room', room.id, {player1: player})
    //     } else if (!room.player2.id) {
    //       setRole('player2')
    //       socket.emit('update-room', room.id, {player2: player})
    //     } else {
    //       setRole('spectator')
    //       const newSpectator = [...room.spectators, player]
    //       socket.emit('update-room', room.id, {spectators: newSpectator})
    //     }
    //   }
    //   const outRoom = useCallback(async () => {
    //     if (id === map.player1?.id) {
    //       if (!map.player2?.id && map.spectators?.length === 0)
    //         socket.emit(`${url}/deleteRoom`, map.id)
    //       else {
    //         const userReady = map.userReady.filter((user) => user.id !== id)
    //         socket.emit('update-room', map.id, {
    //           userReady,
    //           player1: {},
    //         })
    //       }
    //     } else if (id === map.player2?.id) {
    //       if (!map.player1?.id && map.spectators?.length === 0)
    //         socket.emit(`${url}/deleteRoom`, map.id)
    //       else {
    //         const userReady = map.userReady.filter((user) => user.id !== id)
    //         socket.emit('update-room', map.id, {
    //           userReady,
    //           player2: {},
    //         })
    //       }
    //     } else {
    //       if (!map.player1?.id && !map.player2?.id && map.spectators?.length === 1)
    //         socket.emit(`${url}/deleteRoom`, map.id)
    //       else {
    //         const spectators = map.spectators.filter((user) => user.id !== id)
    //         socket.emit('update-room', map.id, {
    //           spectators,
    //         })
    //       }
    //     }
    //     setRole()
    //   }, [map, id, mapId])

    //   const joinPlay = async (playerSt) => {
    //     const player = {id, name, avatar}
    //     if (playerSt === 1) {
    //       if (id === map.player2?.id) {
    //         setRole('player1')
    //         const spectators = map.spectators.filter((user) => user.id !== id)
    //         socket.emit('update-room', map.id, {
    //           spectators,
    //           player1: player,
    //           player2: {},
    //         })
    //       } else {
    //         setRole('player1')
    //         const spectators = map.spectators.filter((user) => user.id !== id)
    //         socket.emit('update-room', map.id, {
    //           spectators,
    //           player1: player,
    //         })
    //       }
    //     } else if (playerSt === 2) {
    //       if (id === map.player1?.id) {
    //         setRole('player2')
    //         const spectators = map.spectators.filter((user) => user.id !== id)
    //         socket.emit('update-room', map.id, {
    //           spectators,
    //           player2: player,
    //           player1: {},
    //         })
    //       } else {
    //         setRole('player2')
    //         const spectators = map.spectators.filter((user) => user.id !== id)
    //         socket.emit('update-room', map.id, {
    //           spectators,
    //           player2: player,
    //         })
    //       }
    //     }
    //   }
    //   const readyToPlay = async () => {
    //     if (map.userReady?.includes(id)) {
    //       const userReady = map.userReady.filter((userId) => userId !== id)
    //       socket.emit('update-room', map.id, {
    //         userReady,
    //       })
    //     } else {
    //       const userReady = [...map.userReady, id]
    //       socket.emit('update-room', map.id, {
    //         userReady,
    //       })
    //     }
    //   }
    //   const arranged = async (ships) => {
    //     if (ships.length !== map.limits) return
    //     let arranged
    //     if (map.arranged?.includes(id))
    //       arranged = map.arranged.filter((userId) => userId !== id)
    //     else arranged = [...map.arranged, id]
    //     socket.emit('update-room', map.id, {
    //       arranged,
    //     })
    //   }

    //   const hitOrMiss = async (tile) => {
    //     if (id !== map.turn) return
    //     if (tile.type !== 'pure') return

    //     let isHit = false

    //     let arrayName = name.split(' ')
    //     const firstName = arrayName[arrayName.length - 1]?.slice(0, 10) + ' '
    //     let message = {
    //       avatar,
    //       name: firstName,
    //       message: '',
    //     }

    //     if (id === map.player1?.id) {
    //       for (let oneship of map.ships2) {
    //         for (let body of oneship.bodies) {
    //           if (body.x === tile.x && body.y === tile.y) {
    //             isHit = true
    //             const newShips = map.ships2?.map((ship) =>
    //               ship.id === oneship.id
    //                 ? {
    //                     ...ship,
    //                     bodies: ship.bodies.map((b) =>
    //                       b.x === tile.x && b.y === tile.y ? {...b, type: 'hit'} : b
    //                     ),
    //                   }
    //                 : ship
    //             )
    //             const newSensors = map.sensors2?.map((sensor) =>
    //               sensor.id === tile.id ? {...tile, type: 'hit'} : sensor
    //             )

    //             if (destroyFullShip(newShips.find((ship) => ship.id === oneship.id)))
    //               message.message = 'was completely sunk ' + oneship.name
    //             else message.message = 'hit'

    //             if (endGame(newShips)) message.message = 'is winner'

    //             socket.emit('update-room', map.id, {
    //               sensors2: newSensors,
    //               ships2: newShips,
    //               turn: map.player2?.id,
    //               message,
    //             })
    //             break
    //           }
    //         }
    //       }
    //       if (!isHit) {
    //         message.message = 'missed, no ship was shot'
    //         const newSensors = map.sensors2?.map((sensor) =>
    //           sensor.id === tile.id ? {...tile, type: 'miss'} : sensor
    //         )
    //         socket.emit('update-room', map.id, {
    //           sensors2: newSensors,
    //           turn: map.player2?.id,
    //           message,
    //         })
    //       }
    //     } else if (id === map.player2?.id) {
    //       for (let oneship of map.ships1) {
    //         for (let body of oneship.bodies) {
    //           if (body.x === tile.x && body.y === tile.y) {
    //             isHit = true
    //             const newShips = map.ships1?.map((ship) =>
    //               ship.id === oneship.id
    //                 ? {
    //                     ...ship,
    //                     bodies: ship.bodies.map((b) =>
    //                       b.x === tile.x && b.y === tile.y ? {...b, type: 'hit'} : b
    //                     ),
    //                   }
    //                 : ship
    //             )

    //             const newSensors = map.sensors1?.map((sensor) =>
    //               sensor.id === tile.id ? {...tile, type: 'hit'} : sensor
    //             )

    //             if (destroyFullShip(newShips.find((ship) => ship.id === oneship.id)))
    //               message.message = 'was completely sunk ' + oneship.name
    //             else message.message = 'hit'

    //             if (endGame(newShips)) message.message = 'is winner'

    //             socket.emit('update-room', map.id, {
    //               sensors1: newSensors,
    //               turn: map.player1?.id,
    //               ships1: newShips,
    //               message,
    //             })
    //             break
    //           }
    //         }
    //       }
    //       if (!isHit) {
    //         message.message = 'missed, no ship was shot'
    //         const newSensors = map.sensors1?.map((sensor) =>
    //           sensor.id === tile.id ? {...tile, type: 'miss'} : sensor
    //         )
    //         socket.emit('update-room', map.id, {
    //           sensors1: newSensors,
    //           turn: map.player1?.id,
    //           message,
    //         })
    //       }
    //     }
    //   }

    //   useEffect(() => {
    //     window.addEventListener('beforeunload', outRoom)
    //     return () => {
    //       window.removeEventListener('beforeunload', outRoom)
    //     }
    //   }, [outRoom])

    // return (
    //     // <MapContext.Provider
    //     //   value={{
    //     //     socket,
    //     //     mapId,
    //     //     setMapId,
    //     //     role,
    //     //     setRole,
    //     //     map,
    //     //     joinRoom,
    //     //     outRoom,
    //     //     joinSpectate,
    //     //     joinPlay,
    //     //     readyToPlay,
    //     //     arranged,
    //     //     hitOrMiss,
    //     //   }}
    //     // >
    //     <MapContext.Provider>
    //         { children }
    //     </MapContext.Provider>
    //     // </MapContext.Provider>
    // )
}
