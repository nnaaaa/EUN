import { Box, Grid, Typography } from '@mui/material'
import { SERVER_EXPRESS } from 'config/keys'
import { saveAs } from 'file-saver'
import BattleShip from 'games/battleShip'
import battleShipIcon from 'games/battleShip/assets/icon.webp'
import { SmallCard } from 'games/card'
import pokerIcon from 'games/poker/assets/icon.png'
import { useState } from 'react'

const ListGame = () => {
    const [playing, setPlaying] = useState<JSX.Element>(<></>)
    const stopPlaying = () => setPlaying(<></>)
    return (
        <Box mb={2} borderRadius={1} boxShadow={1} bgcolor="white">
            <Typography fontWeight="bold" fontSize={14} p={2}>
                🎮 Games
            </Typography>
            <Grid container>
                <Grid item xs={12}>
                    <SmallCard
                        title="Battle Ship"
                        image={battleShipIcon}
                        categoryList={['multiplayer', 'online']}
                        onClick={() =>
                            setPlaying(<BattleShip stopPlaying={stopPlaying} />)
                        }
                        playButtonTitle="Play"
                    />
                </Grid>
                <Grid item xs={12} mt={1}>
                    <SmallCard
                        title="Poker"
                        image={pokerIcon}
                        categoryList={['4-6 player', 'offline']}
                        onClick={() =>
                            saveAs(`${SERVER_EXPRESS}/download/poker`, 'poker.exe')
                        }
                        playButtonTitle="Download"
                    />
                </Grid>
                {playing}
            </Grid>
        </Box>
    )
}

export default ListGame
