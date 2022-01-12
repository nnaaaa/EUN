import { Button } from '@mui/material'
import { IShip } from 'games/battleShip/modals/ship'
import ShipFactory from 'games/battleShip/services/shipFactories/shipFactory'
import { Dispatch, SetStateAction } from 'react'

interface IClearButtonProps {
    setShips: Dispatch<SetStateAction<IShip[]>>
    ShipFactory: ShipFactory
}

function ClearButton({ setShips, ShipFactory }: IClearButtonProps) {
    return (
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
    )
}

export default ClearButton
