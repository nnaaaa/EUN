import { makeStyles } from '@mui/styles'

export const useStyle = makeStyles((theme) => ({
    accordion: {
        borderRadius: 5,
        overflow: 'hidden',
    },
    accorDetail: {
        padding: 0,
    },
    wrapper: {
        padding: 16,
        width: '100%',
        justifyContent: 'flex-start',
    },
    name: {
        margin: 0,
        fontWeight: 'bold',
        fontSize: 14,
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
    },
    account: {
        fontSize: 12,
        color: '#aeb0b2',
        textAlign: 'start',
    },
}))
