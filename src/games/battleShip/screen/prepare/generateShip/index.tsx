import { Box, Button } from '@mui/material'
import ShipFactory from 'games/battleShip/services/shipFactories/shipFactory'
import className from '../prepareStyle.module.css'
import { ShipCategoryManager } from 'games/battleShip/services/shipCategories/ship'
import { IShip } from 'games/battleShip/modals/ship'
import { Dispatch, SetStateAction } from 'react'

interface IGenerateShip {
    shipCategoryManager: ShipCategoryManager[]
    setShips: Dispatch<SetStateAction<IShip[]>>
    ShipFactory: ShipFactory
}

function GenerateShip(props: IGenerateShip) {
    const { shipCategoryManager, setShips, ShipFactory } = props
    return (
        <Box display="flex" justifyContent="center" flexDirection="column" mt={1}>
            <p className={className.title}>Random type</p>
            {shipCategoryManager.map((manager, key) => (
                <Button
                    key={'manager' + key}
                    variant={manager.current === manager.limit ? 'contained' : 'outlined'}
                    color="primary"
                    sx={{
                        textTransform: 'none',
                        mb: 1,
                    }}
                    onClick={() => {
                        ShipFactory.createShipByRand(manager.name)
                        setShips(ShipFactory.getShips())
                    }}
                >
                    {manager.name}: {manager.current}/{manager.limit}
                </Button>
            ))}
        </Box>
    )
}

export default GenerateShip
