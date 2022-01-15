import { Avatar, Box, Grid } from '@mui/material'
import game_background from 'assets/game_background.jpg'
import { SERVER_EXPRESS } from 'config/keys'
import BattleShip from 'games/battleShip'
import battleShipIcon from 'games/battleShip/assets/icon.webp'
import { DetailCard } from 'games/card'
import pokerIcon from 'games/poker/assets/background.jpg'
import { useState } from 'react'
import { saveAs } from 'file-saver'
import { faPython } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import typescriptIcon from 'games/battleShip/assets/typescript.png'
import cppIcon from 'games/poker/assets/cplusplus.png'

const Games = () => {
    const [playing, setPlaying] = useState<JSX.Element | undefined>()

    const stopePlaying = () => setPlaying(<></>)

    return (
        <>
            <Box
                boxShadow={1}
                borderRadius={1}
                bgcolor="white"
                overflow="hidden"
                width="100%"
                height="100%"
                p={2}
                sx={{
                    background: `url(${game_background}) no-repeat center center `,
                }}
            >
                <Grid container spacing={2}>
                    <Grid item md={6} xs={12}>
                        <DetailCard
                            title="Battle Ship"
                            LanguageIcon={<Avatar src={typescriptIcon} variant='square' sx={{height:24,width:24}}/>}
                            image={battleShipIcon}
                            categoryList={['multiplayer', 'online']}
                            onClick={() =>
                                setPlaying(<BattleShip stopPlaying={stopePlaying} />)
                            }
                            playButtonTitle="Play"
                        />
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <DetailCard
                            title="Poker"
                            LanguageIcon={<Avatar src={cppIcon} variant='square' sx={{height:24,width:24}}/>}
                            image={pokerIcon}
                            categoryList={['4-6 player', 'offline']}
                            onClick={() =>
                                saveAs(`${SERVER_EXPRESS}/download/poker`, 'poker.exe')
                            }
                            playButtonTitle="Download"
                        />
                    </Grid>
                </Grid>
            </Box>

            {playing}
        </>
    )
}

export default Games
