import { makeStyles } from '@mui/styles'

export const useStyle = makeStyles({
    name: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'black',
    },
    content: {
        // width: `min-content`,
        fontSize: 14,
        overflow: `hidden`,
        wordBreak: `break-word`,
    },
    button: {
        fontSize: 12,
        marginLeft: 3,
        color: '#77797C',
    },
    hover: {
        transition: `0.5s`,
        '&:hover': {
            cursor: 'pointer',
            textDecoration: `underline`,
        },
    },
})
