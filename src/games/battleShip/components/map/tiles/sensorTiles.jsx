import DotComponent, { Dot, Inside } from 'games/battleShip/components/map/tiles/dot'
import { CONSTANTS } from 'games/battleShip/logics/constants'
import { MapContext } from 'games/battleShip/states/roomProvider'
import { useContext } from 'react'
import styled from 'styled-components'

const Tile = styled.div`
    width: ${(props) => CONSTANTS.boardSize};
    height: ${(props) => CONSTANTS.boardSize};
    position: absolute;
    left: ${(props) => props.x * CONSTANTS.boardSize}px;
    top: ${(props) => props.y * CONSTANTS.boardSize}px;
    z-index: 30000;
    opacity: ${(props) => (props.blur ? 0 : 1)};
    cursor: pointer;
    box-sizing: border-box;
    &:hover {
        opacity: 0.4;
    }
    ${Dot},${Inside} {
        display: block;
    }
`

const SensorTiles = ({ sensors }) => {
    const { hitOrMiss } = useContext(MapContext)

    return sensors?.map((tile, idx) => {
        const color = tile.type === 'hit' ? 'red' : 'white'
        const blur = tile.type === 'pure'
        const clicked = tile.type !== 'pure'
        return (
            <Tile
                x={tile.x}
                y={tile.y}
                blur={blur}
                key={'sensor' + idx}
                clicked={clicked}
                onClick={() => hitOrMiss(tile)}
            >
                <DotComponent color={color} />
            </Tile>
        )
    })
}

export default SensorTiles
