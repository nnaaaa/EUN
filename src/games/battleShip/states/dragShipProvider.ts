
import { createContext, ReactChild, useState } from 'react'

export const DragShipContext = createContext(null)

export const DragShipProvider = ({ children }: { children: ReactChild }) => {
    const [selectedShip, setSelectedShip] = useState()

    return (
    // <DragShipContext
    //   value={{
    //     selectedShip,
    //     setSelectedShip,
    //   }}
    // >

        {children}
    // </DragShipContext>
    )
}
