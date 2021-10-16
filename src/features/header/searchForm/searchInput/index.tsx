import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { CircularProgress, IconButton, InputBase } from '@mui/material'
import { useCallback, useRef } from 'react'
import { useAppDispatch, useAppSelector } from 'states/hooks'
import { findByName } from 'states/slices/friendSlice'
import { useStyle } from '../searchStyles'

function SeaerchInput() {
    const style = useStyle()
    const searchInput = useRef<null | HTMLInputElement>(null)
    const timeout = useRef<ReturnType<typeof setTimeout> | null>(null)
    const { loading } = useAppSelector((state) => state.friend)
    const dispatch = useAppDispatch()

    const findUser = useCallback(async () => {
        if (!searchInput.current || !searchInput.current?.value) return

        if (timeout.current) clearTimeout(timeout.current)
        timeout.current = setTimeout(async () => {
            dispatch(findByName(searchInput.current?.value || ''))
        }, 300)
    }, [searchInput])

    return (
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
    )
}

export default SeaerchInput
