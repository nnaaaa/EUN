import ReactStrategy from 'features/listReact/strategies'
import { postActions } from 'states/slices/postSlice'
import { useAppDispatch } from 'states/hooks'
import { FACEBOOK_DB } from 'config/keys'
import { ID } from 'models/common'
import { useContext, useEffect } from 'react'
import { SocketContext } from 'states/context/socket'
import { IReact } from 'models/react'

export const useReactSocket = (strategy: ReactStrategy) => {
    const { socket } = useContext(SocketContext)
    const dispatch = useAppDispatch()
    useEffect(() => {
        if (!socket) return
        const { _id } = strategy.possess
        const addOrUpdateListener = async (newData: IReact) => {
            dispatch(
                strategy
                    .getReduxActions()
                    .addOrUpdateReact({ react: newData, possessId: _id })
            )
        }
        const removeListener = (reactId: ID) => {
            dispatch(strategy.getReduxActions().deleteReact({ reactId, possessId: _id }))
        }

        socket.on(
            `${FACEBOOK_DB.name}/${FACEBOOK_DB.coll.reacts}/${_id}`,
            addOrUpdateListener
        )
        socket.on(
            `${FACEBOOK_DB.name}/${FACEBOOK_DB.coll.reacts}/deleteReact/${_id}`,
            removeListener
        )
        return () => {
            socket.off(
                `${FACEBOOK_DB.name}/${FACEBOOK_DB.coll.reacts}/${_id}`,
                addOrUpdateListener
            )
            socket.off(
                `${FACEBOOK_DB.name}/${FACEBOOK_DB.coll.reacts}/deleteReact/${_id}`,
                removeListener
            )
        }
    }, [socket, strategy])
}
