import {
    Box,
    Button,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid,
    Radio,
    RadioGroup,
    Typography,
} from '@mui/material'
import ShipAtlas from 'games/battleShip/components/map/shipAtlas'
import { IMode, IRoom } from 'games/battleShip/modals/room'
import { IAtlatSize, ILimitShip } from 'games/battleShip/modals/state'
import BattleShipGameService from 'games/battleShip/services'
import { RoomContext } from 'games/battleShip/states/roomProvider'
import { useContext, useMemo, useState } from 'react'
import { useAppSelector } from 'states/hooks'
import Screen from '../../'
import Waiting from '../../waiting'
import { useStyle } from './styles'

interface ICreateRoomProps {
    changeScreen: (NewScreen: typeof Screen) => void
}

const CreateRoom = ({ changeScreen }: ICreateRoomProps) => {
    const style = useStyle()
    const user = useAppSelector(state=>state.user.current)
    const { socket } = useContext(RoomContext)
    
    const [loading, setLoading] = useState(false)
    const [size, setSize] = useState<IAtlatSize>(15)
    const [limits, setLimits] = useState<ILimitShip>(3)
    const [mode, setMode] = useState<IMode>('random')

    const randShips = useMemo(
        () => BattleShipGameService.initShips(limits, size),
        [size, limits]
    )

    const createRoom = async () => {
        if (!user)
            return
        setLoading(true)
        const room: Partial<IRoom> = {
            limitShip: limits,
            atlasSize: size,
            mode,
            ships1: randShips,
            player1: user
        }
        socket.emit('add-room',room)
        setLoading(false)
        changeScreen(Waiting)
    }

    return (
        <Grid container justifyContent="center">
            <Grid item xs={12}>
                <Typography className={style.title}>Select your rule</Typography>
            </Grid>
            <Grid item xs={3} container direction="column">
                <FormControl component="fieldset">
                    <FormLabel component="legend">Map Size</FormLabel>
                    <RadioGroup
                        onChange={(e) => setSize(+e.target.value as IAtlatSize)}
                        defaultValue="15"
                    >
                        <FormControlLabel value="15" control={<Radio />} label="15" />
                    </RadioGroup>
                </FormControl>
                <FormControl component="fieldset">
                    <FormLabel component="legend">Limits</FormLabel>
                    <RadioGroup
                        onChange={(e) => setLimits(+e.target.value as ILimitShip)}
                        defaultValue="3"
                    >
                        <FormControlLabel
                            value="3"
                            control={<Radio color="primary" />}
                            label="3 ship"
                        />
                    </RadioGroup>
                </FormControl>
                <FormControl component="fieldset">
                    <FormLabel component="legend">Arrange</FormLabel>
                    <RadioGroup
                        onChange={(e) => setMode(e.target.value as IMode)}
                        defaultValue="random"
                    >
                        <FormControlLabel
                            value="random"
                            control={<Radio color="primary" />}
                            label="random"
                        />
                        {/* <FormControlLabel
                            value="select"
                            control={<Radio color="primary" />}
                            label="select"
                        /> */}
                    </RadioGroup>
                </FormControl>
                <Box width="100%" display="flex" justifyContent="flex-end">
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={createRoom}
                        disabled={loading}
                        size="small"
                        style={{ textTransform: 'none', margin: 20 }}
                    >
                        Create
                    </Button>
                </Box>
            </Grid>
            <Grid item xs={3}>
                <ShipAtlas ships={randShips} size={size} />
            </Grid>
        </Grid>
    )
}

export default CreateRoom