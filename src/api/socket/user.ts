import { ID } from 'models/Common';
import { useContext, useEffect, useState } from 'react';
import { SocketContext } from 'states/context/socket';

import { FACEBOOK_DB } from 'config/keys';

export const useUserSocket = <T>(targetId:ID) => {
    const { socket } = useContext(SocketContext)

    const [data, setData] = useState<T>()
    useEffect(() => {
        const listener = (newData: T) => {
            console.log(newData)
            setData(newData)
        }
        console.log(`${FACEBOOK_DB.name}/${FACEBOOK_DB.coll.users}/update/${targetId}`)
        socket.on(`${FACEBOOK_DB.name}/${FACEBOOK_DB.coll.users}/update/6169621d4fef8d82ed5e5436`, listener)
        socket.emit('`${db}/${coll}/${type}/${updateId}`')
        return () => {
            console.log('remove socket')
            socket.off(`${FACEBOOK_DB.name}/${FACEBOOK_DB.coll.users}/update/6169621d4fef8d82ed5e5436`, listener)
        }
    }, [])
}
