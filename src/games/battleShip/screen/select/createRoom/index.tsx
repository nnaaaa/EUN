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
//   import ShipMap from 'games/battleShip/components/map/shipMap'
//   import {initShips} from 'games/battleShip/logics/init'
//   import {MapContext} from 'games/battleShip/states/mapProvider'
import { Dispatch, SetStateAction, useContext, useMemo, useState } from 'react'
import Waiting from '../../waiting'
import Screen from '../../'
import { useStyle } from './styles'

interface ICreateRoomProps {
    changeScreen: (NewScreen: typeof Screen) => void
}

const CreateRoom = ({ changeScreen }: ICreateRoomProps) => {
    const style = useStyle()
    // const {id: userId, avatar, name} = useSelector((state) => state.user)
    // const {setMapId, socket} = useContext(MapContext)
    const [loading, setLoading] = useState(false)
    const [size, setSize] = useState('10')
    const [limits, setLimits] = useState('6')
    const [color, setColor] = useState('lightblue')
    const [shipsPos, setShipsPos] = useState('random')
    const [gameMode, setGameMode] = useState('human')

    // const randShips = useMemo(() => initShips(+limits, +size), [size, limits])

    const createRoom = async () => {
        setLoading(true)
        //   const roomId = uid()
        //   const gameInfo = {
        //     id: roomId,
        //     size: +size,
        //     limits: +limits,
        //     mode: gameMode,
        //     shipsPos,
        //     isStarting: false,
        //     player1: {
        //       id: userId,
        //       avatar,
        //       name,
        //     },
        //     player2: {},
        //     ships1: [],
        //     ships2: [],
        //     sensors1: [],
        //     sensors2: [],
        //     userReady: [],
        //     arranged: [],
        //     spectators: [],
        //     message: {},
        //   }
        //   setMapId(roomId)
        //   socket.emit('add-room', gameInfo)
        changeScreen(Waiting)
        setLoading(false)
    }

    return (
        <Grid container justifyContent="space-evenly">
            <Grid item xs={12}>
                <Typography className={style.title}>Select your rule</Typography>
            </Grid>
            <Grid item>
                <FormControl component="fieldset">
                    <FormLabel component="legend">Map Size</FormLabel>
                    <RadioGroup
                        aria-label="gender"
                        defaultValue="female"
                        name="radio-buttons-group"
                        // onChange={(e) => setSize(e.target.value)}
                        
                        // value={size}
                    >
                        <FormControlLabel
                            value="10x"
                            control={<Radio />}
                            label="10xx"
                        />
                        <FormControlLabel
                            value="15x"
                            control={<Radio />}
                            label="15xx"
                        />
                        {/* <FormControlLabel value='18' control={<Radio color='primary'/>} label="18" color='primary'/> */}
                    </RadioGroup>
                </FormControl>
                {/* <FormControl className={style.control} component="fieldset" >
                      <FormLabel className={style.label} component="legend">Map style</FormLabel>
                      <RadioGroup onChange={e => setColor(e.target.value)}
                          className={style.group} value={color}>
                          <FormControlLabel value='lightblue' control={<Radio color='primary'/>} label="ocean"/>
                          <FormControlLabel value='pink' control={<Radio color='primary'/>} label="pink"/>
                      </RadioGroup>
                  </FormControl> */}
                <FormControl className={style.control} component="fieldset">
                    <FormLabel className={style.label} component="legend">Limits</FormLabel>
                    <RadioGroup
                        onChange={(e) => setLimits(e.target.value)}
                        className={style.group}
                        value={limits}
                    >
                        <FormControlLabel
                            value="3"
                            control={<Radio color="primary" />}
                            label="3 ship"
                        />
                        <FormControlLabel
                            value="6"
                            control={<Radio color="primary" />}
                            label="6 ship"
                        />
                        {/* <FormControlLabel value='8' control={<Radio color='primary'/>} label="8 ship"/> */}
                    </RadioGroup>
                </FormControl>
                <FormControl className={style.control} component="fieldset">
                    <FormLabel className={style.label} component="legend">Ships</FormLabel>
                    <RadioGroup
                        onChange={(e) => setShipsPos(e.target.value)}
                        className={style.group}
                        value={shipsPos}
                    >
                        <FormControlLabel
                            value="random"
                            control={<Radio color="primary" />}
                            label="random"
                        />
                        <FormControlLabel
                            value="select"
                            control={<Radio color="primary" />}
                            label="select"
                        />
                    </RadioGroup>
                </FormControl>
                {/* <FormControl className={style.control} component="fieldset" >
                      <FormLabel className={style.label} component="legend">Mode</FormLabel>
                      <RadioGroup onChange={e => setGameMode(e.target.value)}
                          className={style.group} value={gameMode}>
                          <FormControlLabel value='human' control={<Radio color='primary'/>} label="Human"/>
                          <FormControlLabel value='comp' control={<Radio color='primary'/>} label="Comp"/>
                      </RadioGroup>
                  </FormControl> */}
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
            <Grid item>{/* <ShipMap ships={randShips} size={+size} /> */}</Grid>
        </Grid>
    )
}

export default CreateRoom
