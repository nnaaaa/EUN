import { makeStyles } from '@mui/styles'

export const useStyle = makeStyles((theme: any) => ({
    logo: {
        fontSize: 50,
        position: 'absolute',
        top: 20,
        left: 20,
        cursor: 'pointer',
        padding: 0,
        marginRight: 5,
        color: theme.palette.primary.main,
        backgroundColor: 'white',
        borderRadius: '50%',
    },
    coverPhoto: {
        // backgroundImage: `url(https://localhost)`,
        backgroundColor: 'gray',
        backgroundPosition: 'center center',
        position: 'relative',
        height: 400,
    },
    avatar: {
        position: 'absolute',
        bottom: -20,
        left: '50%',
        transform: 'translateX(-50%)',
        padding: 5,
        borderRadius: '50%',
        backgroundColor: '#fff',
    },
    avatarInside: {
        width: 150,
        height: 150,
        objectFit: 'cover',
    },
}))