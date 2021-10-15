import { makeStyles } from '@mui/styles'

export const useStyle = makeStyles({
    inputBtn: {
        width: '100%',
        borderRadius: 20,
        backgroundColor: '#F0F2F5',
        padding: '8px 13px',
        display: 'flex',
        justifyContent: 'flex-start',
        color: '#ccc',
        textTransform: 'none',
    },
    input: {
        width: '100%',
        padding: 5,
        paddingLeft: 15,
        backgroundColor: '#F0F2F5',
    },
    name: {
        display: 'flex',
        alignItems: 'center',
        margin: '0 10px',
    },
})
