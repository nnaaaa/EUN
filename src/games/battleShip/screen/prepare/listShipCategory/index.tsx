import { Grid, Box, Typography} from '@mui/material'
import { IShip, IShipDirection } from 'games/battleShip/modals/ship'
import Constants from 'games/battleShip/services/constants'
import { ShipCategoryManager } from 'games/battleShip/services/shipCategories/ship'
import ShipFactory from 'games/battleShip/services/shipFactories/shipFactory'
// import {createPosWithSize, createSizeWithName} from 'games/battleShip/logics/select'
// import {DragShipContext} from 'games/battleShip/states/dragShipProvider'
import React, { useContext, useState } from 'react'
import Ship from './ship'
import {useStyle} from './styles'
// import Ship from 'games/battleShip/components/ship/ship'

interface IListShipCategoryProps{
    direction: IShipDirection
    shipCategoryManager: ShipCategoryManager[]
    ShipFactory: ShipFactory
}

function ListShipCategory(props:IListShipCategoryProps) {
    const style = useStyle()
    const { shipCategoryManager,direction,ShipFactory } = props
    
    return (
        <Grid container>
            {shipCategoryManager.map((manager,i) => {
                const ship = ShipFactory.createRepresentShip(manager.name,direction)
                
                if (!ship) return <></>

                return (
                    <Grid
                        item
                        key={'grid' + i}
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
                            style={{ flex: 1 }}
                        >
                            <Box
                                className={style.ship}
                                position="relative"
                                width={ship.size.height * Constants.boardSize}
                                height={ship.size.width * Constants.boardSize}
                            >
                                <Ship
                                    representShip={ship}
                                />
                            </Box>
                        </Grid>
                        <Grid item>
                            <Typography className={style.name}>
                                {ship.name} ({ship.size.width}x{ship.size.height})
                            </Typography>
                        </Grid>
                    </Grid>
                )
            })}
        </Grid>
    )
}

export default ListShipCategory
