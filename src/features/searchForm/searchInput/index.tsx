import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    CircularProgress,
    IconButton,
    InputBase,
    Typography
} from '@mui/material'
import { useUserSocket } from 'api/socket/user'
import { IPublicInfo } from 'models/user'
import { useCallback, useEffect, useRef } from 'react'
import { useAppDispatch, useAppSelector } from 'states/hooks'
import { searchActions } from '../searchSlice'
import { useStyle } from '../searchStyles'

interface IProps {
}

function SearchInput(props: IProps) {
    const style = useStyle()
    const searchInput = useRef<null | HTMLInputElement>(null)
    const timeout = useRef<ReturnType<typeof setTimeout> | null>(null)
    const user = useAppSelector((state) => state.user.current)
    const { loading, error } = useAppSelector(state => state.search)
    const dispatch = useAppDispatch()
    

    const updateRole = useCallback(
        (newInfo: IPublicInfo) => {
            dispatch(searchActions.updateDependOnUser(newInfo))
        },
        [dispatch]
    )
    useUserSocket(user._id, updateRole)

    const findUser = useCallback(async () => {
        if (!searchInput.current) return

        if (!searchInput.current?.value) return

        if (timeout.current) clearTimeout(timeout.current)
        timeout.current = setTimeout(async () => {
            if (!searchInput.current?.value) return
            const searchTarget =
                (searchInput.current?.value.trim() as string) || ''
            await dispatch(searchActions.getResult(searchTarget))
        }, 300)
    }, [searchInput, user])

    //focus vào ô input 
    useEffect(() => {
        searchInput.current?.focus()
    }, [])

    return (
        <>
            <InputBase
                inputRef={searchInput}
                onChange={findUser}
                className={style.input}
                placeholder="Tìm kiếm bạn bè"
                endAdornment={
                    loading ? (
                        <IconButton>
                            <CircularProgress size="18px" />
                        </IconButton>
                    ) : (
                        <IconButton>
                            <FontAwesomeIcon icon={faSearch} size="xs" />
                        </IconButton>
                    )
                }
            />
            {error && (
                <Typography color="error" textAlign="center">
                    {error}
                </Typography>
            )}
        </>
    )
}

export default SearchInput
