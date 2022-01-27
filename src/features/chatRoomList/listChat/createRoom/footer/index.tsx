import { Button, Stack } from '@mui/material'

interface IProps {
    // room: IChatRoom
    // onFocus: () => void
    // onBlur: () => void
}

function Footer({  }: IProps) {
    
    return (
        <Stack
            p={1}
            justifyContent="center"
            alignItems="center"
            direction="row"
            position="relative"
        >
            <Button sx={{textTransform:'initial',color:'white'}} color='primary' variant='contained' size='small'>
                Create
            </Button>
        </Stack>
    )
}

export default Footer
