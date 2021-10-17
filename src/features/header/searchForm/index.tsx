import { Box, Button, Typography } from '@mui/material'
import Popup from 'components/popup'
import { useState } from 'react'
import { IFriendPublicInfo } from 'states/slices/friendSlice'
import ListResult from './searchResult'
import SearchInput from './searchInput'
import { useStyle } from './searchStyles'

export default function SearchForm() {
    const style = useStyle()
    const [popup, setPopup] = useState(false)
    const [listResult, setListResult] = useState<IFriendPublicInfo[]>([])

    return (
        <Box width="70%">
            <Button className={style.inputBtn} onClick={() => setPopup(true)}>
                Tìm kiếm bạn bè
            </Button>
            <Popup open={popup} onClose={() => setPopup(false)}>
                <Box width="400px" height="600px">
                    <Typography
                        color="primary"
                        variant="h5"
                        textAlign="center"
                        sx={{ my: 2 }}
                    >
                        Facebook
                    </Typography>

                    <SearchInput setListResult={setListResult} listResult={listResult}/>

                    <Box mt={2}>
                        <ListResult list={listResult} />
                    </Box>
                </Box>
            </Popup>
        </Box>
    )
}
