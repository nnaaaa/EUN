import { faEye, faGamepad } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    Avatar,
    Box,
    Button,
    Chip,
    Grid,
    Hidden,
    Typography,
    Pagination,
} from '@mui/material'
import { RoomContext } from 'games/battleShip/states/roomProvider'
// import DoneIcon from '@material-ui/icons/Done'
import { ChangeEvent, useContext, useState } from 'react'
import Screen from '../..'
import Waiting from '../../waiting'
import { useStyle, Empty } from './styles'

const roomPerPage = 8
interface IJoinPlayingProps {
    changeScreen: (NewScreen: typeof Screen) => void
}
const JoinPlaying = ({ changeScreen }: IJoinPlayingProps) => {
    const style = useStyle()
    const { listPrepareRoom } = useContext(RoomContext)
    const [curPage, setCurPage] = useState(0)
    // const listPrepareRoom = useWatchCollection(socket, 'listPrepareRoom-not-start')

    const changePage = (e: ChangeEvent<unknown>, page: number) => setCurPage(page - 1)

    const join = () => {
        // joinRoom(room)
        changeScreen(Waiting)
    }

    return (
        <Grid container className={style.wrapper}>
            <Grid item xs={12}>
                <Typography className={style.title}>Chose your room</Typography>
            </Grid>
            {listPrepareRoom.length ? (
                <>
                    {listPrepareRoom
                        .slice(curPage * roomPerPage, (curPage + 1) * roomPerPage)
                        .map((room) => {
                            const isFull = room.player1.id && room.player2.id
                            return (
                                <Grid
                                    key={room.id}
                                    item
                                    md={3}
                                    xs={6}
                                    container
                                    justifyContent="flex-start"
                                    className={style.roomWrapper}
                                >
                                    <Button
                                        color="secondary"
                                        variant="outlined"
                                        className={style.room}
                                        onClick={join}
                                    >
                                        <Box
                                            p={2}
                                            display="flex"
                                            alignItems="center"
                                            width="100%"
                                            justifyContent="space-between"
                                        >
                                            {room.player1.id ? (
                                                <Box width="20%">
                                                    <Box borderRadius={8}>
                                                        <Avatar
                                                            variant="square"
                                                            src={room.player1.avatar}
                                                            className={style.avatar}
                                                        />
                                                    </Box>
                                                    <Typography className={style.name}>
                                                        {room.player1.name}
                                                    </Typography>
                                                </Box>
                                            ) : (
                                                <Empty />
                                            )}

                                            <Hidden smDown>
                                                <Box
                                                    display="flex"
                                                    flexDirection="column"
                                                    width="60%"
                                                    alignItems="center"
                                                    justifyContent="center"
                                                >
                                                    <Box className={style.listInfo}>
                                                        <Chip
                                                            label={`Size: ${room.size}x${room.size}`}
                                                            clickable
                                                            size="small"
                                                            color="secondary"
                                                            variant="outlined"
                                                            // deleteIcon={<DoneIcon />}
                                                            onDelete={() => {}}
                                                        />
                                                        <Chip
                                                            label={`Limits: ${room.limits}`}
                                                            clickable
                                                            size="small"
                                                            // deleteIcon={<DoneIcon />}
                                                            onDelete={() => {}}
                                                            color="secondary"
                                                            variant="outlined"
                                                        />
                                                        <Chip
                                                            label={room.shipsPos}
                                                            clickable
                                                            size="small"
                                                            // deleteIcon={<DoneIcon />}
                                                            onDelete={() => {}}
                                                            color="secondary"
                                                            variant="outlined"
                                                        />
                                                    </Box>
                                                </Box>
                                            </Hidden>

                                            {room.player2.id ? (
                                                <Box overflow="hidden" width="20%">
                                                    <Box borderRadius={8}>
                                                        <Avatar
                                                            variant="square"
                                                            src={room.player2.avatar}
                                                            className={style.avatar}
                                                        />
                                                    </Box>
                                                    <Typography className={style.name}>
                                                        {room.player2.name}
                                                    </Typography>
                                                </Box>
                                            ) : (
                                                <Empty />
                                            )}
                                        </Box>
                                    </Button>
                                    <Button
                                        startIcon={
                                            <FontAwesomeIcon
                                                icon={isFull ? faEye : faGamepad}
                                            />
                                        }
                                        color={isFull ? 'inherit' : 'secondary'}
                                        className={style.stateBtn}
                                        size="small"
                                        variant="contained"
                                        onClick={join}
                                    >
                                        {isFull ? 'Spectate' : 'Join to play'}
                                    </Button>
                                </Grid>
                            )
                        })}
                    <Pagination
                        // count={Math.ceil(listPrepareRoom.length / roomPerPage)}
                        className={style.pagination}
                        onChange={changePage}
                        color="secondary"
                    />
                </>
            ) : (
                <Box
                    width="100%"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Button color="secondary" variant="contained">
                        😥 Empty
                    </Button>
                </Box>
            )}
        </Grid>
    )
}

export default JoinPlaying
