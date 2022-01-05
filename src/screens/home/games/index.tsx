import { Box, Grid, Typography } from '@mui/material'
import { useState } from 'react'
// import {MapProvider} from 'games/battleShip/states/mapProvider'
// import {BattleShipCard} from 'games/battleShip/card'
// import BattleShip from 'games/battleShip/battleShip'

import game_background from 'assets/game_background.jpg'
import { BattleShipSmallCard } from 'games/battleShip/card'
import BattleShip from 'games/battleShip'

const Games = () => {
    const [playing, setPlaying] = useState<JSX.Element | undefined>()

    const stopePlaying = ()=>setPlaying(<></>)

    return (
        <>
            <Box boxShadow={1} borderRadius={1} bgcolor="white" overflow="hidden">
                <Box
                    width="100%"
                    height="100%"
                    p={4}
                    sx={{
                        background: `url(${game_background}) no-repeat center center `,
                    }}
                >
                    <Grid container spacing={2}>
                        <Grid item md={6} xs={12}>
                            <BattleShipSmallCard onClick={() => setPlaying(<BattleShip stopPlaying={stopePlaying}/>)} />
                        </Grid>
                    </Grid>
                </Box>
            </Box>

            {playing}
        </>
    )
}

export default Games
