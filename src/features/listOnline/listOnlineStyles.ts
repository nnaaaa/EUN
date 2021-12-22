import { makeStyles } from '@mui/styles'

export const useStyle = makeStyles((theme) => ({
    accordion: {
        borderRadius: 5,
        overflow: 'hidden',
        boxShadow: '1px 2px 5px 0px rgb(0 0 0 / 10%)',
    },
    accorDetail: {
        padding: 0,
    },
    wrapper: {
        padding: 10,
        paddingLeft: 16,
        paddingRight: 16,
        width: '100%',
        justifyContent: 'space-between',
    },
    name: {
        margin: 0,
        marginRight: 10,
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
