import { makeStyles } from '@mui/styles'

export const useStyle = makeStyles({
    wrapper: {
        '&:hover': {
            perspective: 1000,
            transform: 'translate3d(0,0,30px)',
        },
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    link: {
        fontSize: 14,
    },
    wrappedImage: {
        width: '100%',
        position: 'relative',
        paddingBottom: '100%'
    },
    insideWrappedImage: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    },
    avatar: {
        width: '100%',
        height:'100%',
        objectFit: 'cover',
    },
    name: {
        fontSize: 14,
        fontWeight: 'bold',
    },
})
