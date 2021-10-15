import { ID } from 'models/Common';
import { useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';
import { useAppDispatch } from 'states/hooks';

type ICollection = 'user' | 'room'

export const useWatchCollection = <T>(
    socket: Socket,
    collection: ICollection
) => {
    const dispatch = useAppDispatch()
    const [data, setData] = useState<T>()
    useEffect(() => {
        const listener = (newData: T) => {
            setData(newData)
        }
        socket.on(`server-sendData/${collection}`, listener)
        socket.emit('client-getData', collection)
        return () => {
            socket.off(`server-sendData/${collection}`, listener)
        }
    }, [])

    return data
}
export const useWatchTarget = <T>(
    socket: Socket,
    collection: ICollection,
    target: ID
) => {
    const [data, setData] = useState<T>()

    useEffect(() => {
        console.log('useWatch')
        if (!target) return
        const listener = (newData: T) => {
            console.log(target, newData)
            setData(newData)
        }
        socket.on(`server-sendData/room/${target}`, listener)
        socket.emit('client-getData', collection, target)
        return () => {
            socket.off(`server-sendData/room/${target}`, listener)
        }
    }, [target])

    return data
}
