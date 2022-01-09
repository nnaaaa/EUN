import { useAppSelector } from './../../../states/hooks'
import { postActions } from 'states/slices/postSlice'
import { useAppDispatch } from 'states/hooks'
import { postAPI } from 'api/rest'
import { FACEBOOK_DB } from 'config/keys'
import { ID } from 'models/common'
import { Dispatch, SetStateAction, useContext, useEffect } from 'react'
import { SocketContext } from 'states/context/socket'
import { IReact } from 'models/react'
import { IRoom } from '../modals/room'
import url from '.'

export const useListener = (
    roomId: ID | undefined,
    setRoom: Dispatch<SetStateAction<IRoom | undefined>>,
    setRoomId: Dispatch<SetStateAction<string | undefined>>
) => {
    const user = useAppSelector((state) => state.user.current)
    const { socket } = useContext(SocketContext)
    useEffect(() => {
        if (!socket || !user) return
        const listener = async (room: IRoom) => {
            console.log(room)
            setRoom((pre) => {
                if (!pre) return room
                return { ...pre, ...room }
            })
        }

        const firstTimeListener = (room: IRoom) => {
            console.log(room)
            setRoom(room)
            setRoomId(room._id)
        }
        socket.on(`${url}/host/${user._id}`, firstTimeListener)

        if (!roomId) return
        console.log(`${url}/updateRoom/${roomId}`)
        socket.on(`${url}/updateRoom/${roomId}`, listener)
        return () => {
            socket.off(`${url}/updateRoom/${roomId}`, listener)
            socket.off(`${url}/host/${user._id}`, firstTimeListener)
        }
    }, [socket, roomId, setRoom])
}
