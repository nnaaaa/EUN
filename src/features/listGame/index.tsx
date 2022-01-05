import { Box, Typography, Button, Avatar } from '@mui/material'
import { useStyle } from './listGameStyle'

import { useState } from 'react'
import game_background from 'assets/game_background.jpg'

import { BattleShipSmallCard } from 'games/battleShip/card'
// import {MapProvider} from 'games/battleShip/states/mapProvider'
import BattleShip from 'games/battleShip'

const ListGame = () => {
    const style = useStyle()
    const [playing, setPlaying] = useState<JSX.Element>(<></>)
    const stopPlaying = () => setPlaying(<></>)
    return (
        <Box mb={2} borderRadius={1} boxShadow={1} bgcolor="white">
            <Typography fontWeight='bold' fontSize={14} p={2}>
                🎮 Games
            </Typography>
            <BattleShipSmallCard
                onClick={() => setPlaying(<BattleShip stopPlaying={stopPlaying} />)}
            />

            {playing}
        </Box>
    )
}

export default ListGame
