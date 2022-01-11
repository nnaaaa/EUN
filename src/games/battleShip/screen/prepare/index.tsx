import Screen from '..'
import { Box, Button, Grid } from '@mui/material'
import globalStyle from 'games/battleShip/battleShipStyles.module.css'
import { useContext, useEffect, useState } from 'react'
import className from './prepareStyle.module.css'
import { useStyle } from './styles'
import { RoomContext } from 'games/battleShip/states/roomProvider'
import Loading from 'games/battleShip/components/loading'
import SelectDirection, { useInitDirection } from './selectDirection'
import GenerateShips from './generateShips'
import PlayersState from './playersState'
import ShipFactory from 'games/battleShip/services/shipFactories/shipFactory'
import ThreeShipFactory from 'games/battleShip/services/shipFactories/threeShipFactory'
import SixShipFactory from 'games/battleShip/services/shipFactories/sixShipFactory'
import { IShip } from 'games/battleShip/modals/ship'
import { ShipCategoryManager } from 'games/battleShip/services/shipCategories/ship'
import ShipAtlas from 'games/battleShip/components/map/shipAtlas'
import GenerateShip from './generateShip'
import ListShipCategory from './listShipCategory'

class Prepare extends Screen {
    render() {
        return <PrepareFunc state={this} />
    }
}

export default Prepare

const PrepareFunc = ({ state }: { state: Screen }) => {
    const style = useStyle()
    const { room, role } = useContext(RoomContext)
    const [ShipFactory, setShipFactory] = useState<ShipFactory>()
    const [shipCategoryManager, setShipCategoryManager] = useState<ShipCategoryManager[]>(
        []
    )
    const [ships, setShips] = useState<IShip[]>([])
    const [direction, setDirection] = useInitDirection()
    //sắp xếp xong thì game bắt đầu
    // useEffect(() => {
    //     if (map.arranged?.length !== 2) return

    //     const setPlayGame = async () => {
    //         if (id === map.player1?.id) {
    //             socket.emit('update-room', map.id, {
    //                 isStarting: true,
    //                 turn: id,
    //                 ships1: ships,
    //                 sensors1: initSensors(map.size),
    //             })
    //         } else if (id === map.player2?.id) {
    //             socket.emit('update-room', map.id, {
    //                 ships2: ships,
    //                 sensors2: initSensors(map.size),
    //             })
    //         }
    //         setState('countDown')
    //     }
    //     setPlayGame().then(() => {})
    // }, [map, setState, role, id, ships])

    useEffect(() => {
        if (!room) return
        let shipFactory: ShipFactory
        if (room.limitShip === 3) {
            shipFactory = new ThreeShipFactory(room.atlasSize)
            setShipFactory(shipFactory)
            setShipCategoryManager(shipFactory._shipCategoryManagerList)
        } else {
            shipFactory = new ThreeShipFactory(room.atlasSize)
            setShipFactory(shipFactory)
            setShipCategoryManager(shipFactory._shipCategoryManagerList)
        }
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
                <Grid
                    item
                    xs={5}
                    className={style.toolLeft}
                    container
                    alignItems="center"
                    direction="column"
                >
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
                    {/* <DraggableMap
                                size={map.size}
                                setShips={setShips}
                                ships={ships}
                                typical={typical}
                                setTypical={setTypical}
                            /> */}
                    <ShipAtlas ships={ships} size={room.atlasSize} />
                    <Box mt={2} display="flex">
                        <Button
                            variant="contained"
                            size="small"
                            onClick={() => {
                                setShips([])
                                ShipFactory.clearShips()
                            }}
                        >
                            Clear
                        </Button>
                        {/* <Button
                                    variant="contained"
                                    style={{ marginLeft: 10 }}
                                    size="small"
                                    color={
                                        map.arranged?.includes(id) ? 'default' : 'primary'
                                    }
                                    onClick={() => arranged(ships)}
                                >
                                    {map.arranged?.includes(id) ? 'Cancel' : 'Done'}
                                </Button> */}
                    </Box>
                    <PlayersState />
                </Grid>
                <Grid item container xs={7} className={style.toolRight} spacing={1}>
                    <Grid item xs={9}>
                        <p className={className.title}>Categories</p>
                        <ListShipCategory
                            direction={direction.value} 
                            shipCategoryManager={shipCategoryManager}
                            ShipFactory={ShipFactory}
                        />
                    </Grid>
                    <Grid item xs={3}>
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
