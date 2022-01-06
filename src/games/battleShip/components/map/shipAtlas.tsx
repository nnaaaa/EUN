import NormalTiles from './tiles/normalTiles'
import Water from './background/water'
import { IAtlatSize } from 'games/battleShip/modals/state'
import { IShip } from 'games/battleShip/modals/ship'
import Ships from '../ships'
import { useMemo } from 'react'
import BattleShip from 'games/battleShip/services'

interface IShipAtlasProps {
    size: IAtlatSize
    ships: IShip[]
}

const ShipAtlas = ({ size, ships }: IShipAtlasProps) => {
    const borderTiles = useMemo(() => BattleShip.initBorderTiles(size), [])
    const _ships = useMemo(() => (ships ? ships : BattleShip.initShips(3, size)), [])
    return (
        <Water size={size}>
            <NormalTiles map={borderTiles} />
            <Ships ships={_ships} />
        </Water>
    )
}

export default ShipAtlas
