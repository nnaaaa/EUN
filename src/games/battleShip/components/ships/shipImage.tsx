import { IShip } from 'games/battleShip/modals/ship'
import Constants from 'games/battleShip/services/constants'
import Tilty from 'react-parallax-tilt'

export const Image = ({ ship }: { ship: IShip }) => {
    const isVertical = ship.direction === 'top' || ship.direction === 'bottom'
    const verticalSize = { width: ship.size.height, height: ship.size.width }

    return (
        <div
            style={{
                position: 'absolute',
                width: verticalSize.width * Constants.boardSize,
                height: verticalSize.height * Constants.boardSize,

                transform: isVertical
                    ? 'initial'
                    : 'translate(-50%,-50%) scale(0.9) rotate(-90deg)',
                top: isVertical ? '0' : '50%',
                left: isVertical ? '0' : '50%',
            }}
        >
            <Tilty
                scale={1.2}
                style={{
                    position: 'absolute',
                    width: verticalSize.width * Constants.boardSize,
                    height: verticalSize.height * Constants.boardSize,
                    transformStyle: 'preserve-3d',
                }}
            >
                <div
                    style={{
                        transform: 'translateZ(30px)',
                        position: 'absolute',
                        width: verticalSize.width * Constants.boardSize,
                        height: verticalSize.height * Constants.boardSize,
                        background: `url(${Constants.getShipImage(ship.name)}) center center / 
                                ${verticalSize.width * Constants.boardSize}px 
                                ${verticalSize.height * Constants.boardSize}px no-repeat`,
                    }}
                />
            </Tilty>
        </div>
    )
}
