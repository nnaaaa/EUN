import { IShip } from 'games/battleShip/modals/ship'
import Constants from 'games/battleShip/services/constants'
import { Image } from './shipImage'

const Ships = ({ ships }: { ships: IShip[] }) => {
    return (
        <>
            {ships?.map((ship, i) => (
                <div
                    key={'ship' + i}
                    style={{
                        width: ship.size.width * Constants.boardSize,
                        height: ship.size.height * Constants.boardSize,
                        // backgroundColor: ship.color,
                        position: 'absolute',
                        top: ship.body[0].y * Constants.boardSize,
                        left: ship.body[0].x * Constants.boardSize,
                        borderRadius: Constants.boardSize,
                    }}
                >
                    <Image ship={ship} />
                </div>
            ))}
        </>
    )
}

export default Ships
