import { makeStyles } from '@mui/styles'

export const useStyle = makeStyles((theme) => ({
    wrapper: {
        padding: 10,
        paddingLeft: 16,
        paddingRight: 16,
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    name: {
        margin: 0,
        fontWeight: 'bold',
        fontSize: 14,
        color: 'black',
        userSelect: 'none',
    },
}))

