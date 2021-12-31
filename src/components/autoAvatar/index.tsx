import { useStyle } from './styles'
import { Box,Avatar } from '@mui/material'

interface IAutoAvatar{
    src:string | undefined
}

function AutoAvatar({src}:IAutoAvatar) {
    const style = useStyle()

    return (
        <Box className={style.wrappedImage}>
            <Box className={style.insideWrappedImage}>
                <Avatar
                    src={src}
                    className={style.avatar}
                    variant="rounded"
                    alt={src}
                />
            </Box>
        </Box>
    )
}

export default AutoAvatar
