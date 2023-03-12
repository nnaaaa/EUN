import { authActions } from 'screens/authenticate/authSlice'
import { useAppDispatch } from 'states/hooks'
import { useEffect, useMemo } from 'react'
import { userAPI } from 'api/rest/list/user'

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
        }
        executeFunc().finally(() => {})
    }, [])
}
