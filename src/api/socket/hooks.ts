import { authActions } from 'states/slices/authSlice'
import { useAppDispatch } from './../../states/hooks'
import { useEffect } from 'react'
import { userAPI } from './../rest/list/user'

export const useOfflineUser = () => {
    useEffect(() => {
        const eventFunc = async (e: BeforeUnloadEvent) => {
            e.preventDefault()
            await userAPI.updateProfile({ isOnline: false })
            delete e['returnValue']
        }
        window.addEventListener('beforeunload', eventFunc)
        return () => {
            window.removeEventListener('beforeunload', eventFunc)
        }
    }, [])
}

export const useOnlineUser = () => {
    const dispatch = useAppDispatch()
    useEffect(() => {
        const executeFunc = async () => {
            dispatch(authActions.loginWithToken())
            await userAPI.updateProfile({ isOnline: true })
        }
        executeFunc().finally(() => {})
    }, [])
}
