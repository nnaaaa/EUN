import { Box } from '@mui/material'
import { Dispatch, SetStateAction } from 'react'
import Content from './content'
import Header from './header'

interface ICreateRoomProps {
    isOpen: boolean
    setIsOpen: Dispatch<SetStateAction<boolean>>
}

function CreateRoom({ isOpen, setIsOpen }: ICreateRoomProps) {
    if (!isOpen) return <></>

    return (
        <Box
            bgcolor="white"
            boxShadow={2}
            mr={1}
            borderRadius={2}
            width="20rem"
            position="relative"
        >
            <Header setIsOpen={setIsOpen} />
            <Content setIsOpen={setIsOpen} />
        </Box>
    )
}

export default CreateRoom
