import { Box, Button, Typography } from '@mui/material'
import Popup from 'components/popup'
import { useState } from 'react'
import { useAppDispatch } from 'states/hooks'
import SearchInput from './searchInput'
import ListResult from './searchResult'
import { searchActions } from '../../states/slices/searchSlice'
import { useStyle } from './searchStyles'

export default function SearchForm() {
    const style = useStyle()
    const [popup, setPopup] = useState(false)
    const dispatch = useAppDispatch()
    return (
        <Box width="70%">
            <Button className={style.inputBtn} onClick={() => setPopup(true)}>
                Tìm kiếm bạn bè
            </Button>
            <Popup
                open={popup}
                onClose={() => {
                    dispatch(searchActions.clear())
                    setPopup(false)
                }}
            >
                <Box width="400px" height="600px">
                    <Typography
                        color="primary"
                        variant="h5"
                        textAlign="center"
                        sx={{ my: 2 }}
                    >
                        Facebook
                    </Typography>

                    <SearchInput />

                    <Box mt={2}>
                        <ListResult />
                    </Box>
                </Box>
            </Popup>
        </Box>
    )
}
