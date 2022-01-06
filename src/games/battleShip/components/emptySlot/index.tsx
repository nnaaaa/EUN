import { Box, Button, Typography } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { makeStyles } from '@mui/styles'
import { IRole } from 'games/battleShip/modals/room'

export const css = makeStyles((theme: any) => ({
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

const EmptySlot = ({ player }: { player: IRole }) => {
    const style = css()
    //   const {joinPlay} = useContext(MapContext)

    return (
        <Box width="20%" display="flex" flexDirection="column" alignItems="center">
            <Box
                borderRadius={8}
                display="flex"
                justifyContent="center"
                alignItems="center"
                className={style.avatar}
                // onClick={() => joinPlay(st)}
            >
                <FontAwesomeIcon icon={faPlus} color="inherit" />
            </Box>
            <Typography className={style.name}>???</Typography>
            <Button
                className={style.state}
                variant="contained"
                disableElevation
                color="inherit"
            >
                Waiting
            </Button>
        </Box>
    )
}

export default EmptySlot
