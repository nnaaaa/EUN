import { Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";



export const useStyles = makeStyles((theme: Theme) => ({
    contentWrapper: {
        lineHeight: 2,
    },
    entityWord: {
        borderRadius: 8,
        padding: '0.6rem 0.5rem',
        marginRight: 5
    },
    entityName: {
        borderRadius: 5,
        padding: 5,
        marginLeft: 5,
    },
    idEntityWord: {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.getContrastText(theme.palette.primary.light)        
    },
    idEntityName: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.getContrastText(theme.palette.primary.main)
    }
}))
