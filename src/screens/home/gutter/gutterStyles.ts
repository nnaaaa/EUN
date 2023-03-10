import { makeStyles } from '@mui/styles'

export const useStyle = makeStyles((theme) => ({
    button: {
        padding: 10,
        justifyContent: `flex-start`,
        width: '100%',
        // marginBottom: 10,
    },
    text: {
        fontWeight: 'bold',
        fontSize: 14,
    },
}))
