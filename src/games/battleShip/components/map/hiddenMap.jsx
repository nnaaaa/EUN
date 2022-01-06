import NormalTiles from './tiles/normalTiles'
import Water from './background/water'
import SensorTiles from './tiles/sensorTiles'
import { initMap } from 'games/battleShip/logics/init'

const HiddenMap = ({ size, sensors, ships }) => {
    const map = initMap(size)

    return (
        <Water size={size}>
            <NormalTiles map={map} />
            {/* <Ships ships={ships}/> */}
            <SensorTiles sensors={sensors} />
        </Water>
    )
}

export default HiddenMap
