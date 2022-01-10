import { Box, Grid } from '@mui/material'
import url from 'games/battleShip/api'
import ListSpectator from 'games/battleShip/components/listSpectator'
import { RoomContext } from 'games/battleShip/states/roomProvider'
import React, { useContext, useEffect, useState } from 'react'
import Loading from 'screens/loading'
import { SocketContext } from 'states/context/socket'
import { useAppSelector } from 'states/hooks'
import Screen from '..'
import Waiting from '../waiting'
import OneAtlas from './atlas/oneAtlas'
import TwoAtlas from './atlas/twoAtlas'
import ChangeMode from './changeMode'
import Message from './message'

class Playing extends Screen {
    render() {
        return <PlayingFunc state={this} />
    }
}

export default Playing

const PlayingFunc = ({ state }: { state: Screen }) => {
    const [isSeeOneAtlas, setIsSeeOneAtlas] = useState(false)
    const { socket } = useContext(SocketContext)
    const { room } = useContext(RoomContext)
    const user = useAppSelector((state) => state.user.current)
    useEffect(() => {
        if (!room || !socket) return
        if (!room.isStarting) state.props.changeScreen(Waiting)
        if (room.message && room.message.content.search('winner') >= 0) {
            // console.log("have winner",room.message)
            // const setEndGame = async () => {
            //     setTimeout(async () => {
            //
            //     }, 3000)
            // }
            // setEndGame().then(() => {})
            socket.emit(`${url}/updateRoomAndDeleteMessage`, {
                _id: room._id,
                ships1: [],
                ships2: [],
                sensors1: [],
                sensors2: [],
                userReady: [],
                arranged: [],
                isStarting: false,
            })
        } else if (!room.player1) {
            console.log('player 1 out')

            const nameSplit = room.player2?.username.split(' ')
            const firstName = nameSplit?.[
                nameSplit?.length ? nameSplit?.length - 1 : 0
            ]?.slice(0, 7)
            socket.emit(`${url}/updateRoom`, {
                _id: room._id,
                message: {
                    content: 'is winner',
                    owner: {
                        ...room.player2,
                        username: firstName,
                    },
                },
            })
        } else if (!room.player2) {
            console.log('player 2 out')

            const nameSplit = room.player1?.username.split(' ')
            const firstName = nameSplit?.[
                nameSplit?.length ? nameSplit?.length - 1 : 0
            ]?.slice(0, 7)

            socket.emit(`${url}/updateRoom`, {
                _id: room._id,
                message: {
                    content: 'is winner',
                    owner: {
                        ...room.player1,
                        username: firstName,
                    },
                },
            })
        }
    }, [room])

    if (!room || !user) return <Loading />

    return (
        <Box width="100%" height="100%" p={5} bgcolor="#f2f5f6">
            <Message message={room.message} />
            <Grid
                container
                justifyContent="space-between"
                alignItems="center"
                sx={{ height: '100%', width: '100%' }}
            >
                <Grid
                    item
                    md={2}
                    container
                    alignItems="flex-start"
                    style={{ height: '100%' }}
                >
                    <ListSpectator />
                </Grid>

                {isSeeOneAtlas ? (
                    <OneAtlas room={room} user={user} />
                ) : (
                    <TwoAtlas room={room} user={user} />
                )}

                <Grid
                    item
                    md={2}
                    container
                    alignItems="flex-start"
                    style={{ height: '100%' }}
                >
                    <ChangeMode
                        setIsSeeOneAtlas={setIsSeeOneAtlas}
                        isSeeOneAtlas={isSeeOneAtlas}
                    />
                </Grid>
            </Grid>
        </Box>
    )
}
