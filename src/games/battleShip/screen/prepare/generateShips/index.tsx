import { Box, Button } from '@mui/material'
import className from '../prepareStyle.module.css'
import ShipFactory from 'games/battleShip/services/shipFactories/shipFactory'
import { Dispatch, SetStateAction } from 'react'
import { IShip } from 'games/battleShip/modals/ship'

interface IGenerateShips{
    ShipFactory: ShipFactory 
    setShips: Dispatch<SetStateAction<IShip[]>>
}

function GenerateShips({ ShipFactory,setShips }: IGenerateShips) {

    return (
        <Box display="flex" justifyContent="center" flexDirection="column">
            <p className={className.title}>Random</p>
            <Button
                color="primary"
                variant="contained"
                size="small"
                onClick={() => setShips(ShipFactory.manufacture())}
            >
                generate
            </Button>
        </Box>
    )
}

export default GenerateShips
