import { makeStyles } from '@mui/styles'

export const useStyle = makeStyles({
    name: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'black',
    },
    content: {
        fontSize: 14,
        overflow: `hidden`,
        wordBreak: `break-word`,
    },
})
