import { Avatar, Box, Button, Typography } from '@mui/material'
import { useContext, useEffect } from 'react'
import { useStyle } from './styles'

interface IPlayersStateProps{}

const PlayerState = (props:IPlayersStateProps) => {
    const style = useStyle()

    // useEffect(() => {
    //     if (map.arranged?.length === 2) setState('countDown')
    // }, [map, setState])

    return (
        <Box
            width="100%"
            display="flex"
            justifyContent="center"
            alignContent="center"
            // bgcolor={role === 'player' ? 'transparent' : 'secondary.main'}
            // height={role === 'player' ? 'auto' : '100%'}
        >
            <Box
                // width={role === 'player' ? '100%' : '30%'}
                mt={4}
                display="flex"
                justifyContent="space-evenly"
            >
                {/* <Box
                    width={150}
                    overflow="hidden"
                    justifyContent="center"
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                >
                    <Box
                        borderRadius={8}
                        display="flex"
                        justifyContent="center"
                        width="min-content"
                    >
                        <Avatar
                            variant="square"
                            src={map.player1?.avatar}
                            className={style.avatar}
                        />
                    </Box>
                    <Typography className={style.name} gutterBottom noWrap>
                        {map.player1?.name}
                    </Typography>
                    <Button
                        className={style.state}
                        variant="contained"
                        disableElevation
                        // color={
                        //     map.arranged?.includes(map.player1?.id)
                        //         ? 'primary'
                        //         : 'default'
                        // }
                    >
                        {map.arranged?.includes(map.player1?.id) ? 'Done' : 'Arranging'}
                    </Button>
                </Box>
                <Box
                    width={150}
                    overflow="hidden"
                    justifyContent="center"
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                >
                    <Box
                        borderRadius={8}
                        display="flex"
                        justifyContent="center"
                        width="min-content"
                    >
                        <Avatar
                            variant="square"
                            src={map.player2?.avatar}
                            className={style.avatar}
                        />
                    </Box>
                    <Typography className={style.name} gutterBottom noWrap>
                        {map.player2?.name}
                    </Typography>
                    <Button
                        className={style.state}
                        variant="contained"
                        disableElevation
                        // color={
                        //     map.arranged?.includes(map.player2?.id)
                        //         ? 'primary'
                        //         : 'default'
                        // }
                    >
                        {map.arranged?.includes(map.player2?.id) ? 'Done' : 'Arranging'}
                    </Button> 
                </Box>*/}
            </Box>
        </Box>
    )
}

export default PlayerState
