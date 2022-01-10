// import { Box } from '@material-ui/core'
// import { CONSTANTS } from 'games/battleShip/logics/constants'
// import { initMap, isJostle } from 'games/battleShip/logics/init'
// import { DragShipContext } from 'games/battleShip/states/dragShipProvider'
// import { MapContext } from 'games/battleShip/states/roomProvider'
// import React, { useState } from 'react'
// import { useContext } from 'react'
// import Ship from '../ship/ship'
// import Water from './background/water'

// const DraggableMap = ({ size, setShips, ships, typical, setTypical }) => {
//     const _map = initMap(size)
//     const { selectedShip } = useContext(DragShipContext)
//     const { map } = useContext(MapContext)

//     const dragOver = (e) => {
//         e.preventDefault()
//     }
//     const dragDrop = (position) => {
//         if (map.limits === ships.length) return

//         const typicalShip = typical.find((type) => type.name === selectedShip.name)

//         const { x, y } = position
//         const currentX = selectedShip.id % selectedShip.size.width
//         const currentY = Math.floor(selectedShip.id / selectedShip.size.width)
//         const lastBodyX = selectedShip.size.width - 1 - currentX
//         const lastBodyY = selectedShip.size.height - 1 - currentY
//         const firstBodyX = -currentX
//         const firstBodyY = -currentY

//         if (
//             firstBodyX + x < 0 ||
//             firstBodyY + y < 0 ||
//             lastBodyX + x >= size ||
//             lastBodyY + y >= size
//         )
//             return

//         if (!typicalShip || typicalShip.current >= typicalShip.limits) return
//         else
//             setTypical((pre) =>
//                 pre.map((type) =>
//                     type.name === typicalShip.name
//                         ? { ...typicalShip, current: typicalShip.current + 1 }
//                         : type
//                 )
//             )

//         const bodies = []
//         for (let j = 0; j < selectedShip.size.height; ++j) {
//             for (let i = 0; i < selectedShip.size.width; ++i) {
//                 const body = {
//                     x: x - currentX + i,
//                     y: y - currentY + j,
//                     type: 'pure',
//                 }
//                 bodies.push(body)
//             }
//         }

//         if (isJostle(ships, bodies)) return

//         setShips((pre) => [
//             ...pre,
//             {
//                 bodies,
//                 image: selectedShip.image,
//                 size: selectedShip.size,
//                 direction: selectedShip.direction,
//                 id: ships.length,
//                 name: selectedShip.name,
//             },
//         ])
//     }
//     const removeShip = (id, name) => {
//         const newShips = ships.filter((ship) => ship.id !== id)
//         const typicalShip = typical.find((type) => type.name === name)
//         setTypical((pre) =>
//             pre.map((type) =>
//                 type.name === typicalShip.name
//                     ? { ...typicalShip, current: typicalShip.current - 1 }
//                     : type
//             )
//         )
//         setShips(newShips)
//     }
//     return (
//         <Water size={size}>
//             {_map.map((row, y) =>
//                 row.map((col, x) => (
//                     <Box
//                         key={'dragMap' + y + x}
//                         width={CONSTANTS.boardSize}
//                         height={CONSTANTS.boardSize}
//                         position="absolute"
//                         left={x * CONSTANTS.boardSize}
//                         top={y * CONSTANTS.boardSize}
//                         bgcolor="transparent"
//                         borderBottom="1px solid white"
//                         borderRight="1px solid white"
//                         onDragOver={dragOver}
//                         onDrop={() => dragDrop({ x, y })}
//                     />
//                 ))
//             )}
//             {ships.map((ship) => (
//                 <Ship
//                     ship={ship}
//                     onRemove={() => removeShip(ship.id, ship.name)}
//                     key={'shipsInMap' + ship.id}
//                 />
//             ))}
//         </Water>
//     )
// }

// export default DraggableMap
