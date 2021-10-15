import { makeStyles } from '@mui/styles'

export const useStyle = makeStyles((theme) => ({
    button: {
        padding: 10,
        justifyContent: `flex-start`,
        width: '100%',
    },
    text: {
        fontWeight: 'bold',
        fontSize: 14,
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        color: '#000',
    },
}))
