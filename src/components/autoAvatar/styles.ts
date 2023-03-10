import { makeStyles } from '@mui/styles'

export const useStyle = makeStyles({
    wrappedImage: {
        width: '100%',
        position: 'relative',
        paddingBottom: '100%',
    },
    insideWrappedImage: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },
    avatar: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    },
})
