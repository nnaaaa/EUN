import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { CircularProgress, IconButton, InputBase, Typography } from '@mui/material'
import { filterSearch } from 'algorithms/filterSearch'
import { friendAPI } from 'api/rest'
import { useUserSocket } from 'api/socket/user'
import { IPublicInfo } from 'models/user'
import { Dispatch, SetStateAction, useCallback, useRef, useState } from 'react'
import { useAppSelector } from 'states/hooks'
import { useStyle } from '../searchStyles'

interface IProps {
    setListResult: Dispatch<SetStateAction<any[]>>
    listResult: any[]
}

function SearchInput({ setListResult,listResult }: IProps) {
    const style = useStyle()
    const searchInput = useRef<null | HTMLInputElement>(null)
    const timeout = useRef<ReturnType<typeof setTimeout> | null>(null)
    const user = useAppSelector((state) => state.user.current)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string>()
    
    const updateRole = useCallback((newInfo:IPublicInfo) => {
        const filterData = filterSearch(listResult, newInfo)
        setListResult(filterData)
    }, [])
    useUserSocket(user._id,updateRole)

    const findUser = useCallback(async () => {
        if (!searchInput.current) return

        if (!searchInput.current?.value) return

        if (timeout.current) clearTimeout(timeout.current)
        timeout.current = setTimeout(async () => {
            try {
                setError('')
                setLoading(true)
                if (!searchInput.current?.value) return

                const searchTarget = searchInput.current?.value.trim() as string || ''
                const listUser = await friendAPI.findByName(searchTarget)
                const filterData = filterSearch(listUser.data, user)
                setListResult(filterData)
            }
            catch (e) {
                setError('Gặp lỗi trong quá trình tìm kiếm')
            }
            finally {
                setLoading(false)
            }
        }, 300)
    }, [searchInput])


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
            {error && <Typography color='error' textAlign='center'>{error}</Typography>}
        </>
    )
}

export default SearchInput
