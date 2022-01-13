import { IRoom } from 'games/battleShip/modals/room'
import { IShip } from 'games/battleShip/modals/ship'
import BattleShipService from 'games/battleShip/services'
import { ShipCategoryManager } from 'games/battleShip/services/shipCategories/ship'
import ShipFactory from 'games/battleShip/services/shipFactories/shipFactory'
import { Dispatch, SetStateAction, useMemo } from 'react'
import Water from '../background/water'
import DroppableTile from './droppableTile'
import RemovableShip from './removableShip'
import useDraggable from './useDraggable'

interface IDraggableAtlas {
    dragTool: ReturnType<typeof useDraggable>
    ships: IShip[]
    room: IRoom
    setShipCategoryManager: Dispatch<SetStateAction<ShipCategoryManager[]>>
    setShips: Dispatch<SetStateAction<IShip[]>>
    ShipFactory: ShipFactory
}
const DraggableAtlas = (props: IDraggableAtlas) => {
    const { dragTool, ships, room, setShipCategoryManager, setShips, ShipFactory } = props
    const _borderTiles = useMemo(
        () => BattleShipService.initBorderTiles(room.atlasSize),
        [room.atlasSize]
    )

    // const removeShip = (id, name) => {
    //     // const newShips = ships.filter((ship) => ship.id !== id)
    //     // const typicalShip = typical.find((type) => type.name === name)
    //     // setTypical((pre) =>
    //     //     pre.map((type) =>
    //     //         type.name === typicalShip.name
    //     //             ? { ...typicalShip, current: typicalShip.current - 1 }
    //     //             : type
    //     //     )
    //     // )
    //     // setShips(newShips)
    // }
    return (
        <Water size={room.atlasSize}>
            {_borderTiles.map((id, idx) => {
                const x = id % room.atlasSize
                const y = Math.floor(id / room.atlasSize)
                return (
                    <DroppableTile
                        x={x}
                        y={y}
                        key={'droppabletile' + idx}
                        onDrop={() => {
                            dragTool.dragDrop({ x, y })
                            setShips(ShipFactory.getShips())
                            setShipCategoryManager(ShipFactory.getManagerList())
                        }}
                    />
                )
            })}
            {ships.map((ship, i) => (
                <RemovableShip
                    ship={ship}
                    onRemove={() => {
                        ShipFactory.deleteShip(i)
                        setShips(ShipFactory.getShips())
                    }}
                    key={'shipDropped' + i}
                />
            ))}
        </Water>
    )
}

export default DraggableAtlas
