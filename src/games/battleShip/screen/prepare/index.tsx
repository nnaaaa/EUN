import { Box, Button, Grid } from '@mui/material'
import url from 'games/battleShip/api'
import globalStyle from 'games/battleShip/battleShipStyles.module.css'
import Loading from 'games/battleShip/components/loading'
import DraggableAtlas from 'games/battleShip/components/map/draggableAtlas'
import useDraggable from 'games/battleShip/components/map/draggableAtlas/useDraggable'
import { IShip } from 'games/battleShip/modals/ship'
import BattleShipService from 'games/battleShip/services'
import { ShipCategoryManager as ShipCtgMng } from 'games/battleShip/services/shipCategories/ship'
import ShipFactory from 'games/battleShip/services/shipFactories/shipFactory'
import ThreeShipFactory from 'games/battleShip/services/shipFactories/threeShipFactory'
import { RoomContext } from 'games/battleShip/states/roomProvider'
import { useContext, useEffect, useState } from 'react'
import { SocketContext } from 'states/context/socket'
import { useAppSelector } from 'states/hooks'
import Screen from '..'
import CountDown from '../countDown'
import ClearButton from './clearButton'
import GenerateShip from './generateShip'
import GenerateShips from './generateShips'
import ListShipCategory from './listShipCategory'
import PlayersState from './playersState'
import ReadyButton from './readyButton'
import SelectDirection, { useInitDirection } from './selectDirection'
import { useStyle } from './styles'
import Waiting from '../waiting'

class Prepare extends Screen {
    render() {
        return (
            <>
                <this.BackToLobbyButton />
                <PrepareFunc state={this} />
            </>
        )
    }
}

export default Prepare

const PrepareFunc = ({ state }: { state: Screen }) => {
    const style = useStyle()
    const { room, role } = useContext(RoomContext)
    const { socket } = useContext(SocketContext)
    const user = useAppSelector((state) => state.user.current)
    const [ShipFactory, setShipFactory] = useState<ShipFactory>()
    const [shipCategoryManager, setShipCategoryManager] = useState<ShipCtgMng[]>([])
    const [ships, setShips] = useState<IShip[]>([])

    const [direction, setDirection] = useInitDirection()
    const dragTool = useDraggable(ShipFactory)

    //sắp xếp xong thì game bắt đầu
    useEffect(() => {
        if (!room || !socket || !user) return
        const player1 = room.player1
        const player2 = room.player2
        if (!player1 || !player2) return
        if (room.arranged.length !== 2) return

        if (user._id === player1._id) {
            socket.emit(`${url}/updateRoom`, {
                _id: room._id,
                isStarting: true,
                turn: user._id,
                ships1: ships,
                sensors1: BattleShipService.initSensorTiles(room.atlasSize),
            })
        } else if (user._id === player2._id) {
            socket.emit(`${url}/updateRoom`, {
                _id: room._id,
                ships2: ships,
                sensors2: BattleShipService.initSensorTiles(room.atlasSize),
            })
        }
        state.props.changeScreen(CountDown)
    }, [room, user, socket])

    //khởi tạo ShipFactory
    useEffect(() => {
        if (!room) return
        let shipFactory: ShipFactory
        if (room.limitShip === 3) {
            shipFactory = new ThreeShipFactory(room.atlasSize)
            setShipFactory(shipFactory)
            setShipCategoryManager(shipFactory.getManagerList())
        } else {
            shipFactory = new ThreeShipFactory(room.atlasSize)
            setShipFactory(shipFactory)
            setShipCategoryManager(shipFactory.getManagerList())
        }
    }, [room?.limitShip, room?.atlasSize])

    //nếu thiếu 1 trong 2 player sẽ direct về phòng chờ
    useEffect(() => {
        if (!room) return
        if (!room.player1 || !room.player2) state.props.changeScreen(Waiting)
    }, [room])

    if (!room || !role || !ShipFactory) return <Loading />

    if (role === 'spectator') return <PlayersState />
    return (
        <Box
            p={5}
            display="flex"
            justifyContent="center"
            width="100%"
            height="100%"
            alignItems="center"
            bgcolor="#F2F5F6"
        >
            <p className={globalStyle.smallHero}>Battle Ship</p>

            <Grid container justifyContent="space-evenly">
                <Grid item xs={5} className={style.toolLeft} container direction="column">
                    <Box>
                        <Button variant="outlined" color="primary" className={style.info}>
                            Size: {room.atlasSize}
                        </Button>
                        <Button
                            variant={
                                ships.length === room.limitShip ? 'contained' : 'outlined'
                            }
                            color="primary"
                            className={style.info}
                        >
                            Limits: {ships.length}/{room.limitShip}
                        </Button>
                    </Box>
                    <DraggableAtlas
                        dragTool={dragTool}
                        ships={ships}
                        setShips={setShips}
                        setShipCategoryManager={setShipCategoryManager}
                        room={room}
                        ShipFactory={ShipFactory}
                    />
                    <Box mt={2} display="flex">
                        <ClearButton setShips={setShips} ShipFactory={ShipFactory} />
                        <ReadyButton ships={ships} />
                    </Box>
                    <PlayersState />
                </Grid>
                <Grid item container xs={7} className={style.toolRight} spacing={1}>
                    <Grid item xs={8}>
                        <ListShipCategory
                            direction={direction.value}
                            shipCategoryManager={shipCategoryManager}
                            ShipFactory={ShipFactory}
                            dragTool={dragTool}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <SelectDirection
                            direction={direction}
                            setDirection={setDirection}
                        />
                        <GenerateShips ShipFactory={ShipFactory} setShips={setShips} />
                        <GenerateShip
                            ShipFactory={ShipFactory}
                            setShips={setShips}
                            shipCategoryManager={shipCategoryManager}
                        />
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    )
}
