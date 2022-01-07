import { Box, Button, ButtonGroup, CircularProgress, Typography } from '@mui/material'
import className from 'games/battleShip/battleShipStyles.module.css'
import EmptySlot from 'games/battleShip/components/emptySlot'
import Loading from 'games/battleShip/components/loading'
import ShipAtlas from 'games/battleShip/components/map/shipAtlas'
import { IShip } from 'games/battleShip/modals/ship'
import BattleShipGameService from 'games/battleShip/services'
import { RoomContext } from 'games/battleShip/states/roomProvider'
import { useContext, useEffect, useMemo, useState } from 'react'
import { useAppSelector } from 'states/hooks'
import Screen from '../'
import CountDown from '../countDown'
import Prepare from '../prepare'
import Select from '../select'
import FilledSlot from './filledSlot'
import { useStyle } from './styles'

class Waiting extends Screen {
    render() {
        return <WaitingFunc state={this} />
    }
}

export default Waiting

const WaitingFunc = ({ state }: { state: Select }) => {
    const style = useStyle()
    const { room, role } = useContext(RoomContext)
    const user = useAppSelector((state) => state.user.current)
    const [ships, setShips] = useState([])

    const randShips = useMemo<IShip[]>(() => {
        if (!room) return []
        return BattleShipGameService.initShips(room.limitShip, room.atlasSize)
    }, [room])

    useEffect(() => {
        if (!room || !user) return
        if (room.userReady.length !== 2) return
        const setPlayGame = async () => {
            if (room.mode === 'random') {
                if (user._id === room.player1?._id) {
                    // socket.emit('update-room', map.id, {
                    //     isStarting: true,
                    //     turn: id,
                    //     ships1: initShips(map.limits, map.size),
                    //     sensors1: initSensors(map.size),
                    // })
                } else if (user._id === room.player2?._id) {
                    // socket.emit('update-room', map.id, {
                    //     ships2: initShips(map.limits, map.size),
                    //     sensors2: initSensors(map.size),
                    // })
                }
                state.props.changeScreen(CountDown)
            } else {
                state.props.changeScreen(Prepare)
            }
        }
        setPlayGame().then(() => {})
    }, [room, user])

    if (!room || !user) return <Loading />

    return room ? (
        <Box
            p={2}
            width="100%"
            height="100%"
            display="flex"
            bgcolor="#F2F5F6"
            justifyContent="space-evenly"
            alignItems="center"
        >
            <p className={className.smallHero}>Battle Ship</p>

            <Box width="15%">{/* <Spectators joinable /> */}</Box>

            {/* {room.player1 ? (
                <FilledSlot player={room.player1} userReady={room.userReady} />
            ) : (
                <EmptySlot player="player1" />
            )} */}

            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                maxWidth="40%"
            >
                <ButtonGroup className={style.listInfo}>
                    <Button variant="outlined" color="primary">
                        Size: {room.atlasSize}x{room.atlasSize}
                    </Button>
                    <Button variant="outlined" color="primary">
                        Limits: {room.limitShip}
                    </Button>
                    <Button variant="outlined" color="primary">
                        {room.mode}
                    </Button>
                </ButtonGroup>

                <ShipAtlas ships={randShips} size={room.atlasSize} />

                {role !== 'spectator' ? (
                    <Box className={style.ready}>
                        <Button
                            variant="contained"
                            color={
                                room.userReady.find((u) => u._id === user._id)
                                    ? 'primary'
                                    : 'secondary'
                            }
                            // onClick={readyToPlay}
                        >
                            {room.userReady.find((u) => u._id === user._id)
                                ? 'Cancel'
                                : 'Ready'}
                        </Button>
                    </Box>
                ) : (
                    <Box className={style.ready}>
                        <Button
                            variant="contained"
                            disabled
                            style={{ textTransform: 'none' }}
                        >
                            <Typography>Waiting for 2 player ready ..</Typography>
                        </Button>
                    </Box>
                )}
            </Box>

            {/* {room.player2 ? (
                <FilledSlot player={room.player2} userReady={room.userReady} />
            ) : (
                <EmptySlot player="player2" />
            )} */}
        </Box>
    ) : (
        <Box
            width="100%"
            height="100%"
            display="flex"
            bgcolor="#F2F5F6"
            justifyContent="center"
            alignItems="center"
        >
            <CircularProgress />
        </Box>
    )
}

//   export default Waiting
