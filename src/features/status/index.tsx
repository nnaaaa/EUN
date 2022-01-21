import { faSmile } from '@fortawesome/free-regular-svg-icons'
import { faImages, faVideo } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Avatar, Box, Button, Divider, Grid, Typography } from '@mui/material'
import { CRUDType } from 'features/blog/crudPost/crudTool'
import CreateType from 'features/blog/crudPost/crudTool/create'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Loading from 'screens/loading'
import { useAppSelector } from 'states/hooks'
import CreatePost from '../blog/crudPost/index'
import { css } from './statusStyles'
import className from './statusStyles.module.css'

export default function Status() {
    const style = css()

    const user = useAppSelector((state) => state.user.current)
    const [isPopup, setPopup] = useState<boolean>(false)
    const createType = useMemo<CRUDType>(() => new CreateType(), [])

    if (!user) return <Loading />

    return (
        <Box mb={2} p={2} borderRadius={2} boxShadow={1} className={className.wrapper}>
            <CreatePost isPopup={isPopup} setPopup={setPopup} type={createType} />

            <Grid container>
                <Grid item container wrap="nowrap" xs={12} style={{ paddingBottom: 10 }}>
                    <Avatar src={user.avatar} component={Link} to="/profile" />
                    <Button className={style.inputBtn} onClick={() => setPopup(true)}>
                        <Typography variant="subtitle2" color="textSecondary">
                            What's on your mind
                        </Typography>
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <Divider />
                </Grid>
                <Grid item container xs={12} style={{ paddingTop: 10 }}>
                    <Button className={style.button}>
                        <FontAwesomeIcon icon={faVideo} color="#E42A49" />
                        <Typography className={style.textBtn} noWrap>
                            Live Video
                        </Typography>
                    </Button>
                    <Divider orientation="vertical" style={{ margin: '0 10px' }} />
                    <Button className={style.button}>
                        <FontAwesomeIcon icon={faImages} color="#41B35D" />
                        <Typography className={style.textBtn} noWrap>
                            Photo/Video
                        </Typography>
                    </Button>
                    <Divider orientation="vertical" style={{ margin: '0 10px' }} />
                    <Button className={style.button}>
                        <FontAwesomeIcon icon={faSmile} color="#EAB026" />
                        <Typography className={style.textBtn} noWrap>
                            Feeling/Activity
                        </Typography>
                    </Button>
                </Grid>
            </Grid>
        </Box>
    )
}
