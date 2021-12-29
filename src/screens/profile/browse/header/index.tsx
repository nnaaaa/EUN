import { faFacebook } from '@fortawesome/free-brands-svg-icons'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    Button,
    Typography,
    AppBar,
    Tabs,
    Tab,
    Grid,
    Avatar,
    Box,
    IconButton,
} from '@mui/material'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import Popup from 'components/popup'
// import EditProfile from 'features/editProfile/editProfile'
import { useStyle } from './styles'
import { IPublicInfo } from 'models/user'

interface IHeaderProps {
    index: number
    setIndex: (i: number) => void
    user: IPublicInfo
}

export default function Header({ index, setIndex, user }: IHeaderProps) {
    const style = useStyle()
    const [toggle, setToggle] = useState(false)

    return (
        <Box width="100%">
            <Box className={style.coverPhoto}>
                <Box className={style.avatar}>
                    <Avatar src={user.avatar} className={style.avatarInside} />
                </Box>
                <IconButton className={style.logo} component={Link} to="/">
                    <FontAwesomeIcon icon={faFacebook} />
                </IconButton>
            </Box>
            <Typography
                variant="h4"
                component="h1"
                align="center"
                sx={{ my: 4, fontWeight: 'bold' }}
            >
                {user.username}
            </Typography>
            <Box sx={{ px: { xs: 10, lg: 30 } }} className={style.nav}>
                <Grid container direction="row-reverse">
                    <Grid
                        container
                        item
                        md={6}
                        justifyContent="flex-end"
                        alignItems="center"
                    >
                        <Button
                            startIcon={<FontAwesomeIcon icon={faPen} size="xs" />}
                            variant="contained"
                            onClick={() => setToggle(true)}
                        >
                            <Typography className={style.item}>Edit Profile</Typography>
                        </Button>
                        <Popup open={toggle} onClose={() => setToggle(false)}>
                            {/* <EditProfile setToggle={setToggle} /> */}
                        </Popup>
                    </Grid>
                    <Grid container item md={6}>
                        <AppBar
                            position="static"
                            color="default"
                            className={style.appbar}
                        >
                            <Tabs
                                value={index}
                                onChange={(event, newIdx) => setIndex(newIdx)}
                                indicatorColor="primary"
                                textColor="primary"
                                variant="fullWidth"
                            >
                                <Tab label="Posts" className={style.item} />
                                <Tab label="Photos" className={style.item} />
                                <Tab
                                    label={`Friends (${user.friends.accepted?.length})`}
                                    className={style.item}
                                />
                            </Tabs>
                        </AppBar>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}
