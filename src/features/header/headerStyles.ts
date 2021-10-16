import { makeStyles } from '@mui/styles'

export const css = makeStyles((theme: any) => ({
    toolBar: {
        padding: `0.5rem 0`,
        color: 'white',
        boxShadow: '1px 3px 5px 0px rgba(0,0,0,0.1)',
        alignItems: 'stretch',
        height: 50,
    },
    appBar: {
        boxShadow: 'none',
    },
    logo: {
        fontSize: 50,
        cursor: 'pointer',
        color: theme.palette.primary.main,
    },
    button: {
        fontSize: 20,
        color: theme.palette.primary.main,
        flex: 1,
    },
    icon: {
        width: 40,
        height: 40,
        color: theme.palette.primary.main,
        display: 'flex',
        alignItems: 'center',
    },
    toggle: {
        position: 'absolute',
        zIndex: 100,
    },
}))
