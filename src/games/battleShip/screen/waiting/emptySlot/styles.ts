import { makeStyles } from '@mui/styles'

export const useStyle = makeStyles((theme: any) => ({
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 8,
        border: '4px dashed #d7dbdf',
        color: '#d7dbdf',
        transition: '0.3s',
        cursor: 'pointer',
        '&:hover': {
            borderColor: 'gray',
            color: 'gray',
        },
    },
    name: {
        userSelect: 'none',
        fontSize: 14,
        fontWeight: 'bold',
        marginTop: 10,
        textAlign: 'center',
        color: 'black',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
    },
    state: {
        margin: 5,
        textTransform: 'none',
    },
}))
