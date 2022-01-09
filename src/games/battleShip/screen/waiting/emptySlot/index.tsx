import { Box, Button, Typography } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { makeStyles } from '@mui/styles'
import { IRole, IRoom } from 'games/battleShip/modals/room'
import { useAppSelector } from 'states/hooks'
import { useContext } from 'react'
import { RoomContext } from 'games/battleShip/states/roomProvider'
import { SocketContext } from 'states/context/socket'
import url from 'games/battleShip/api'

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
    const user = useAppSelector((state) => state.user.current)
    const { socket } = useContext(SocketContext)
    const { room, setRole } = useContext(RoomContext)

    const joinPlay = () => {
        if (!user || !room || !setRole || !socket) return
        if (player === 'player1') {
            setRole('player1')
            if (user._id === room.player2?._id) {
                const spectators = room.spectators.filter((u) => u._id !== user._id)
                const updateRoom: Partial<IRoom> = {
                    _id: room._id,
                    spectators,
                    player1: user,
                }
                socket.emit(`${url}/player2_switch_player1`, updateRoom)
            } else {
                const spectators = room.spectators.filter((u) => u._id !== user._id)
                const updateRoom: Partial<IRoom> = {
                    _id: room._id,
                    spectators,
                    player1: user,
                }
                socket.emit(`${url}/spectator_switch_player1`, updateRoom)
            }
        } else if (player === 'player2') {
            setRole('player2')
            if (user._id === room.player1?._id) {
                const spectators = room.spectators.filter((u) => u._id !== user._id)
                const updateRoom: Partial<IRoom> = {
                    _id: room._id,
                    spectators,
                    player2: user,
                }
                socket.emit(`${url}/player1_switch_player2`, updateRoom)
            } else {
                const spectators = room.spectators.filter((u) => u._id !== user._id)
                const updateRoom: Partial<IRoom> = {
                    _id: room._id,
                    spectators,
                    player2: user,
                }
                socket.emit(`${url}/spectator_switch_player2`, updateRoom)
            }
        }
    }

    return (
        <Box width="20%" display="flex" flexDirection="column" alignItems="center">
            <Box
                borderRadius={8}
                display="flex"
                justifyContent="center"
                alignItems="center"
                className={style.avatar}
                onClick={() => joinPlay()}
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
