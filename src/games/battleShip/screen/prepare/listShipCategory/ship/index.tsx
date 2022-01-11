import { faTimesCircle } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box } from '@mui/material'
import { IShip, IShipDirection } from 'games/battleShip/modals/ship'
import Constants from 'games/battleShip/services/constants'
import { Component } from 'react'
import { useStyle } from './styles'

interface IShipProps {
    representShip: IShip
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
        const { representShip } = this.props
        console.log(representShip)
        return (
            <Box
                position="absolute"
                // className={hovered ? style.hovered : style.unhover}
                zIndex={19998}
                width={representShip.size.height * Constants.boardSize}
                height={representShip.size.width * Constants.boardSize}
                top={0}
                left={0}
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
                {representShip.body.map((b, idx) => (
                    <Box
                        key={'dragShip' + b.x + b.y}
                        width={Constants.boardSize}
                        height={Constants.boardSize}
                        position="absolute"
                        zIndex={20000}
                        left={(b.x - representShip.body[0].x) * Constants.boardSize}
                        top={(b.y - representShip.body[0].y) * Constants.boardSize}
                        bgcolor="transparent"
                        // onMouseDown={
                        //     drag === 'true'
                        //         ? () => {
                        //               setSelectedShip({
                        //                   ...representShip,
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
                        width: representShip.size.height * Constants.boardSize,
                        height: representShip.size.width * Constants.boardSize,
                        top: '50%',
                        left: '50%',
                        background: `url(${Constants.getShipImage(
                            representShip.name
                        )}) center center / 
                    ${representShip.size.height * Constants.boardSize}px 
                    ${representShip.size.width * Constants.boardSize}px no-repeat`,
                        transform:
                            'translate(-50%,-50%) scale(0.9) ' +
                            this.rotate(representShip.direction),
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
