import { makeStyles } from '@mui/styles'

export const useStyle = makeStyles({
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    link: {
        fontSize: 14,
    },
    photo: {
        width: '100%',
        marginBottom: 10,
        borderRadius: 8,
        objectFit: 'cover',
    },
    name: {
        fontSize: 14,
        fontWeight: 'bold',
    },
})
