import { makeStyles } from '@mui/styles'

export const useStyle = makeStyles({
    form: {
        minWidth: 400,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 24,
        borderRadius: 8,
        background: '#fff',
        boxShadow:
            'rgba(0, 0, 0, 0.2) 0px 3px 3px -2px,rgba(0, 0, 0, 0.14) 0px 3px 4px 0px, rgba(0, 0, 0, 0.12) 0px 1px 8px 0px',
    },
    signBtn: {
        justifyContent: 'flex-start',
        marginBottom: 10,
        width: '100%',
    },
    lastSignBtn: {
        justifyContent: 'flex-start',
        width: '100%',
    },
})
