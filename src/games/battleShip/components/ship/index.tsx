import { faTimesCircle } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box } from '@mui/material'
import { IShip, IShipDirection } from 'games/battleShip/modals/ship'
import Constants from 'games/battleShip/services/constants'
import { Component } from 'react'

interface IShipProps {
    ship: IShip
}

interface IShipStates {}

class Ship extends Component<IShipProps, IShipStates> {
    constructor(props: IShipProps) {
        super(props)
        this.state = {}
    }
    rotate = (direction: IShipDirection) => {
        switch (direction) {
            case 'top':
                return 'rotate(0)'
            case 'left':
                return 'rotate(-90deg)'
            case 'bottom':
                return 'rotate(180deg)'
            case 'right':
                return 'rotate(90deg)'
            default:
                return ''
        }
    }
    render() {
        const { ship } = this.props

        return (
            <Box
                position="absolute"
                // className={hovered ? style.hovered : style.unhover}
                zIndex={19998}
                width={ship.size.width * Constants.boardSize}
                height={ship.size.height * Constants.boardSize}
                top={ship.body[0].y * Constants.boardSize}
                left={ship.body[0].x * Constants.boardSize}
                // draggable={drag}
                // onMouseOver={
                //     drag === 'false'
                //         ? () => {
                //               if (hoverRef.current) clearTimeout(hoverRef.current)
                //               setHovered(true)
                //           }
                //         : () => {}
                // }
                // onMouseOut={
                //     drag === 'false'
                //         ? () => {
                //               hoverRef.current = setTimeout(() => {
                //                   setHovered(false)
                //               }, 50)
                //           }
                //         : () => {}
                // }
            >
                {ship.body.map((b, idx) => (
                    <Box
                        key={'dragShip' + b.x + b.y}
                        width={Constants.boardSize}
                        height={Constants.boardSize}
                        position="absolute"
                        zIndex={20000}
                        left={(b.x - ship.body[0].x) * Constants.boardSize}
                        top={(b.y - ship.body[0].y) * Constants.boardSize}
                        bgcolor="transparent"
                        // onMouseDown={
                        //     drag === 'true'
                        //         ? () => {
                        //               setSelectedShip({
                        //                   ...ship,
                        //                   id: idx,
                        //               })
                        //           }
                        //         : () => {}
                        // }
                    />
                ))}
                <div
                    style={{
                        position: 'absolute',
                        zIndex: 19999,
                        width: ship.size.width * Constants.boardSize,
                        height: ship.size.height * Constants.boardSize,
                        top: '50%',
                        left: '50%',
                        background: `url(${Constants.getShipImage(ship.name)}) center center / 
                    ${ship.size.width * Constants.boardSize}px 
                    ${ship.size.height * Constants.boardSize}px no-repeat`,
                        transform:
                            'translate(-50%,-50%) scale(0.9) ' +
                            this.rotate(ship.direction),
                        imageRendering: 'pixelated',
                    }}
                />
                {/* {drag === 'false' && hovered && (
                    <FontAwesomeIcon
                        icon={faTimesCircle}
                        className={style.remove}
                        key={'hover-remove' + ship.image}
                        onClick={onRemove ? onRemove : () => {}}
                    />
                )} */}
            </Box>
        )
    }
}

// export const Shipp = ({ ship, drag = 'false', onRemove }) => {
//     const style = useStyle()
//     // const {setSelectedShip} = useContext(DragShipContext)
//     const [hovered, setHovered] = useState(false)
//     const hoverRef = useRef()
//     //horizontal
//     let imageSize =
//         ship.direction === 'left' || ship.direction === 'right'
//             ? { width: ship.size.height, height: ship.size.width }
//             : ship.size

//     return (

//     )
// }

export default Ship
