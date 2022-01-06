import MarkedTiles from './tiles/markedTiles'

import NormalTiles from './tiles/normalTiles'
import Ships from 'games/battleShip/components/ships'
import Water from './background/water'
import { initMap } from 'games/battleShip/logics/init'

const SensorMap = ({ size, sensors, ships }) => {
    const map = initMap(size)
    return (
        <Water size={size}>
            <NormalTiles map={map} />
            <Ships ships={ships} />
            <MarkedTiles sensors={sensors} />
        </Water>
    )
}

export default SensorMap
