import { useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';


export const useNoticeSocket = (socket: Socket) => {
    const [data, setData] = useState()
    useEffect(() => {
        const listener = (newData: any) => {
            setData(newData)
        }
        socket.on(`social/notices`, listener)
        socket.emit('get/social/notices')
        return () => {
            socket.off('get/social/notices', listener)
        }
    }, [])

    return data
}
