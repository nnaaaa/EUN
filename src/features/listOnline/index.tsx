import { Stack } from '@mui/material'
import FriendOnline from './friend'
import StrangerOnline from './stranger'

export default function ListOnline() {
    return (
        <Stack mb={2}>
            <FriendOnline />
            <StrangerOnline />
        </Stack>
    )
}
