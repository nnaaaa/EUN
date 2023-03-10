import { makeStyles } from '@mui/styles';

export const useStyle = makeStyles({
    input: {
        width: '100%', 
        height: '2.5rem', 
        fontSize: '1rem', 
        padding: '0.6rem 1rem', 
        paddingRight: '3rem', 
        borderRadius: '4rem'
    },
    form: {
        position: 'relative',
        margin: 0,
        marginBottom: 8,
        width: '100%',
    },
    tool: {
        position: 'absolute',
        top: '50%',
        transform: 'translate(0,-50%)',
        right: 16,
    },
})
