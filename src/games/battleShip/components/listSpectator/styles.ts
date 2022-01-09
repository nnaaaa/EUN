import { makeStyles } from '@mui/styles'

export const useStyle = makeStyles({
    spectators: {
        maxHeight: '100%',
        width: '100%',
        overflowY: 'auto',
        borderRadius: 4,
    },
    spectator: {
        cursor: 'pointer',
    },
    title: {
        textAlign: 'start',
        fontSize: 15,
        color: 'white',
    },
    name: {
        userSelect: 'none',
        fontSize: 13,
        textAlign: 'center',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        color: 'white',
        transition: '0.3s',
        '&:hover': {
            color: 'gray',
        },
    },
    btn: {
        marginTop: 10,
    },
})
