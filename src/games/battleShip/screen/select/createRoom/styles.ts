import { makeStyles } from '@mui/styles'

export const useStyle = makeStyles({
    title: {
        textAlign: 'center',
        marginBottom: 15,
        fontSize: 20,
        fontWeight: 'bold',
    },
    group: {
        display: 'flex',
        flexDirection: 'row',
    },
    control: {
        display: 'flex',
        flexDirection: 'row',
    },
    label: {
        display: 'flex',
        alignItems: 'center',
        marginRight: 30,
    },
})
