import { CONSTANTS } from 'games/battleShip/logics/constants'
import DotComponent, { Dot, Inside } from 'games/battleShip/components/map/tiles/dot'
import styled from 'styled-components'
import { initSensors, initShips } from 'games/battleShip/logics/init'
import { useContext, useState } from 'react'
import { MapContext } from 'games/battleShip/states/roomProvider'

const TileHover = styled.div`
    width: ${(props) => CONSTANTS.boardSize};
    height: ${(props) => CONSTANTS.boardSize};
    position: absolute;
    left: ${(props) => props.x * CONSTANTS.boardSize}px;
    top: ${(props) => props.y * CONSTANTS.boardSize}px;
    z-index: 30000;
    opacity: ${(props) => (props.blur ? 0.5 : 1)};
    cursor: pointer;
    box-sizing: border-box;
    &:hover {
        /* border:3px dashed gray; */
        ${Dot},${Inside} {
            display: block;
        }
    }
`

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
    ${Dot},${Inside} {
        display: block;
    }
`

const MarkedTiles = ({ sensors }) => {
    return sensors?.map((tile, idx) => {
        const color = tile.type === 'hit' ? 'red' : 'white'
        const blur = tile.type === 'pure'
        return (
            <Tile x={tile.x} y={tile.y} blur={blur} key={'sensor' + idx}>
                <DotComponent color={color} />
            </Tile>
        )
    })
}

export default MarkedTiles
