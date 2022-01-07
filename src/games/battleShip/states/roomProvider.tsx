import {
    createContext,
    Dispatch,
    ReactChild,
    SetStateAction,
    useEffect,
    useMemo,
    useState,
} from 'react'
import io, { Socket } from 'socket.io-client'
import { IRoom } from '../modals/room'

const socket = io('http://localhost:9000')

type PlayerRole = 'spectator' | 'player1' | 'player2' | undefined

interface IRoomContextValue {
    socket: Socket
    room: IRoom | undefined
    setRoom?: Dispatch<SetStateAction<IRoom | undefined>>
    role: PlayerRole
    setRole?: Dispatch<SetStateAction<PlayerRole>>
    listPlayingRoom: any[]
    setListPlayingRoom?: Dispatch<SetStateAction<any[]>>
    listPrepareRoom: any[]
    setListPrepareRoom?: Dispatch<SetStateAction<any[]>>
}
const initContextValue = {
    room: undefined,
    role: undefined,
    listPlayingRoom: [],
    listPrepareRoom: [],
    socket: io('http://localhost:9000'),
}
export const RoomContext = createContext<IRoomContextValue>(initContextValue)

export const RoomProvider = ({ children }: { children: ReactChild }) => {
    const socket = useMemo(() => io('http://localhost:9000'), [])
    const [room, setRoom] = useState<IRoom>()
    const [listPlayingRoom, setListPlayingRoom] = useState<any[]>([])
    const [listPrepareRoom, setListPrepareRoom] = useState<any[]>([])
    const [role, setRole] = useState<PlayerRole>()
    // const { id, name, avatar } = useSelector((state) => state.user)
    // const map = useWatchMap(socket, 'room', mapId)

    socket.connect()
    useEffect(() => {
        return () => {
            socket.disconnect()
        }
    }, [])

    
    return (
        <RoomContext.Provider
            value={{
                socket,
                room,
                setRoom,
                role,
                setRole,
                listPlayingRoom,
                listPrepareRoom,
                setListPlayingRoom,
                setListPrepareRoom,
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
    //         socket.emit('delete-room', map.id)
    //       else {
    //         const userReady = map.userReady.filter((user) => user.id !== id)
    //         socket.emit('update-room', map.id, {
    //           userReady,
    //           player1: {},
    //         })
    //       }
    //     } else if (id === map.player2?.id) {
    //       if (!map.player1?.id && map.spectators?.length === 0)
    //         socket.emit('delete-room', map.id)
    //       else {
    //         const userReady = map.userReady.filter((user) => user.id !== id)
    //         socket.emit('update-room', map.id, {
    //           userReady,
    //           player2: {},
    //         })
    //       }
    //     } else {
    //       if (!map.player1?.id && !map.player2?.id && map.spectators?.length === 1)
    //         socket.emit('delete-room', map.id)
    //       else {
    //         const spectators = map.spectators.filter((user) => user.id !== id)
    //         socket.emit('update-room', map.id, {
    //           spectators,
    //         })
    //       }
    //     }
    //     setRole()
    //   }, [map, id, mapId])

    //   const joinSpectate = async () => {
    //     if (map.player1?.id === id) {
    //       setRole('spectator')
    //       const spectators = [...map.spectators, map.player1]
    //       const userReady = map.userReady.filter((userId) => userId !== id)
    //       socket.emit('update-room', map.id, {
    //         spectators,
    //         player1: {},
    //         userReady,
    //       })
    //     } else if (map.player2?.id === id) {
    //       setRole('spectator')
    //       const spectators = [...map.spectators, map.player2]
    //       const userReady = map.userReady.filter((userId) => userId !== id)
    //       socket.emit('update-room', map.id, {
    //         spectators,
    //         player2: {},
    //         userReady,
    //       })
    //     }
    //   }
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
