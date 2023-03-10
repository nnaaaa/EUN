import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { CircularProgress, IconButton, InputBase, Typography } from '@mui/material'
import { useFindUserDebounce } from 'hooks/useSearchDebounce'
import { useEffect, useRef } from 'react'
import { useAppSelector } from 'states/hooks'
import { useStyle } from '../searchStyles'

interface IProps {}

function SearchInput(props: IProps) {
    const style = useStyle()
    const searchInput = useRef<null | HTMLInputElement>(null)
    const { loading, error } = useAppSelector((state) => state.search)

    //tìm kiếm debounce
    const { getTheFirstTime } = useFindUserDebounce(searchInput, 'all')

    //focus vào ô input
    useEffect(() => {
        searchInput.current?.focus()
    }, [])

    return (
        <>
            <InputBase
                inputRef={searchInput}
                onChange={getTheFirstTime}
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
        </>
    )
}

export default SearchInput
