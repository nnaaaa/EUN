import { faArrowCircleLeft, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box, IconButton } from '@mui/material'
import Popup from 'components/popup'
// import { MapContext } from 'games/battleShip/states/mapProvider'
import { Component, ReactNode, useContext, useState } from 'react'
import Screen from './screen'
import Select from './screen/select'
import { RoomContext, RoomProvider } from './states/roomProvider'
// import SwipeableViews from 'react-swipeable-views'
// import HomeButton from './components/homeButton/homeButton'
// import ArrangeShip from './screen/arrangeShip/arrangeShip'
// import PlayerState from './screen/arrangeShip/playersState'
// import CountDown from './screen/countDown/countDown'
// import CreateRoom from './screen/createRoom/createRoom'
// import JoinRoom from './screen/joinRoom/joinRoom'
// import JoinWatch from './screen/joinWatch/joinWatch'
// import Play from './screen/play/play'
// import Spectator from './screen/play/spectator'
// import Waiting from './screen/waiting/waiting'
interface IBattleShipProps {
    stopPlaying: () => void
}

interface IBattleShipStates {
    Screen: typeof Screen
}

const BattleShipWrapper = ({ stopPlaying }: IBattleShipProps) => {
    return (
        <RoomProvider>
            <BattleShip stopPlaying={stopPlaying} />
        </RoomProvider>
    )
}
export default BattleShipWrapper

// const BattleShi = ({ stopPlaying }: IBattleShipProps) => {
//     const [State, setState] = useState<typeof Screen>(Select)
//     // const { outRoom, role, socket } = useContext(MapContext)
// }

class BattleShip extends Component<IBattleShipProps, IBattleShipStates> {
    static contextType = RoomContext
    constructor(props: IBattleShipProps) {
        super(props)
        this.state = {
            Screen: Select,
        }
    }

    onClose = () => {
        this.context.outRoom()
        // socket.disconnect()
        this.props.stopPlaying()
    }

    changeScreen = (NewScreen: typeof Screen) => {
        this.setState({ Screen: NewScreen })
    }

    render() {
        return (
            <Popup open onClose={this.onClose}>
                <Box width="96vw" height="96vh" borderRadius={4} overflow="hidden">
                    <IconButton
                        onClick={this.onClose}
                        style={{ position: 'absolute', top: 5, right: 5 }}
                    >
                        <FontAwesomeIcon icon={faTimesCircle} />
                    </IconButton>

                    <this.state.Screen
                        changeScreen={this.changeScreen}
                        RoomContext={this.context}
                    />

                    {/* {state !== 'select' && (
                    <IconButton
                        onClick={gotoSelect}
                        style={{ position: 'absolute', top: 5, left: 5 }}
                    >
                        <FontAwesomeIcon icon={faArrowCircleLeft} />
                    </IconButton>
                )} */}
                    {/* {state === 'select' && <HomeButton setIndex={setIndex} />}
                {state === 'select' && (
                    <SwipeableViews
                        axis={'x'}
                        index={index}
                        onChangeIndex={(newIdx: number) => setIndex(newIdx)}
                    >
                        <CreateRoom setState={setState} />
                        <JoinRoom setState={setState} />
                        <JoinWatch setState={setState} />
                    </SwipeableViews>
                )}
                {state === 'waiting' && <Waiting setState={setState} />}
                {state === 'ready' && role !== 'spectator' && (
                    <ArrangeShip setState={setState} />
                )}
                {state === 'ready' && role === 'spectator' && (
                    <PlayerState role="spectator" setState={setState} />
                )}
                {state === 'countDown' && <CountDown setState={setState} />}
                {state === 'play' && role !== 'spectator' && <Play setState={setState} />}
                {state === 'play' && role === 'spectator' && (
                    <Spectator setState={setState} />
                )} */}
                </Box>
            </Popup>
        )
    }
}
