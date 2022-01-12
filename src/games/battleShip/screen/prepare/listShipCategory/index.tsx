import { Grid, Typography } from '@mui/material'
import Water from 'games/battleShip/components/map/background/water'
import useDraggable from 'games/battleShip/components/map/draggableAtlas/useDraggable'
import { IShipDirection } from 'games/battleShip/modals/ship'
import { ShipCategoryManager } from 'games/battleShip/services/shipCategories/ship'
import ShipFactory from 'games/battleShip/services/shipFactories/shipFactory'
import DraggableShip from './draggableShip'
import { useStyle } from './styles'
import className from '../prepareStyle.module.css'
import Constants from 'games/battleShip/services/constants'

interface IListShipCategoryProps {
    direction: IShipDirection
    shipCategoryManager: ShipCategoryManager[]
    ShipFactory: ShipFactory
    dragTool: ReturnType<typeof useDraggable>
}

function ListShipCategory(props: IListShipCategoryProps) {
    const style = useStyle()
    const { shipCategoryManager, direction, ShipFactory, dragTool } = props

    return (
        <>
            <p className={className.title}>Categories</p>
            <Grid container>
                {shipCategoryManager.map((manager, i) => {
                    const ship = ShipFactory.createRepresentShip(manager.name, direction)
                    if (!ship) return <></>
                    const { height, width } = ship.size
                    return (
                        <Grid
                            item
                            key={'listShipCatgory' + i}
                            xs={6}
                            container
                            justifyContent="center"
                            alignItems="center"
                            direction="column"
                        >
                            <Grid
                                item
                                container
                                justifyContent="center"
                                alignItems="center"
                                sx={{ flex: 1 }}
                            >
                                <Water size={Constants.maxShipSize}>
                                    <DraggableShip
                                        representShip={ship}
                                        dragTool={dragTool}
                                    />
                                </Water>
                            </Grid>
                            <Grid item>
                                <Typography className={style.name}>
                                    {ship.name} ({width}x{height})
                                </Typography>
                            </Grid>
                        </Grid>
                    )
                })}
            </Grid>
        </>
    )
}

export default ListShipCategory
