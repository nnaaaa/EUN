import { makeStyles } from '@mui/styles'

export const useStyle = makeStyles((theme) => ({
    accordion: {
        // background: 'rgba(255,255,255,0.8)',
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
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    name: {
        margin: 0,
        marginRight: 10,
        fontWeight: 'bold',
        fontSize: 14,
        userSelect: 'none',
    },
    account: {
        fontSize: 12,
        color: '#aeb0b2',
        textAlign: 'start',
    },
}))
