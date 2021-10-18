import {
    faFacebook,
    faFacebookMessenger,
} from '@fortawesome/free-brands-svg-icons'
import {
    faBars,
    faBell,
    faBorderNone,
    faGamepad,
    faHome,
    faSortDown,
    faTv,
    faUsers,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    AppBar,
    Box,
    Button,
    Grid,
    Hidden,
    IconButton,
    Popover,
    SwipeableDrawer,
    Toolbar,
} from '@mui/material'
import Gutter from 'features/gutter'
import { css } from 'features/header/headerStyles'
import { useRef, useState } from 'react'
import { Link, useRouteMatch } from 'react-router-dom'
import Notifications from './notifications'
import Options from './options'
import SearchForm from '../searchForm'

export default function Header() {
    const style = css()
    const { url } = useRouteMatch()

    const [toggleMore, setToggleMore] = useState(false)
    const moreRef = useRef(null)

    const [toggleNotice, setToggleNotice] = useState(false)
    const noticeRef = useRef(null)

    const [toggleDrawer, setToggleDrawer] = useState(false)

    const openOptions = () => {
        setToggleMore(true)
        setToggleNotice(false)
    }
    const closeMore = () => {
        setToggleMore(false)
    }

    const openNotice = () => {
        setToggleNotice(true)
        setToggleMore(false)
    }
    const closeNotice = () => {
        setToggleNotice(false)
    }
    return (
        <AppBar position="fixed" color="inherit" className={style.appBar}>
            <Toolbar className={style.toolBar}>
                <Grid container justifyContent="center" alignItems="stretch">
                    <Hidden mdDown>
                        <Grid
                            item
                            container
                            md={3}
                            alignItems="center"
                            justifyContent="space-around"
                        >
                            <FontAwesomeIcon
                                icon={faFacebook}
                                className={style.logo}
                            />
                            <SearchForm />
                        </Grid>
                    </Hidden>
                    <Grid item container md={6} xs={10}>
                        <Button
                            className={style.button}
                            component={Link}
                            to={url}
                        >
                            <FontAwesomeIcon icon={faHome} />
                        </Button>
                        <Button className={style.button} disabled>
                            <FontAwesomeIcon icon={faTv} />
                        </Button>
                        <Button className={style.button} disabled>
                            <FontAwesomeIcon icon={faUsers} />
                        </Button>
                        <Button
                            className={style.button}
                            component={Link}
                            to={`/games`}
                        >
                            <FontAwesomeIcon icon={faGamepad} />
                        </Button>
                    </Grid>
                    <Grid
                        item
                        container
                        md={3}
                        xs={2}
                        alignItems="center"
                        justifyContent="space-evenly"
                    >
                        <Hidden mdDown>
                            <IconButton className={style.icon} disabled>
                                <FontAwesomeIcon icon={faBorderNone} />
                            </IconButton>

                            <IconButton className={style.icon}>
                                <FontAwesomeIcon icon={faFacebookMessenger} />
                            </IconButton>

                            <IconButton
                                className={style.icon}
                                onClick={openNotice}
                                ref={noticeRef}
                            >
                                <FontAwesomeIcon icon={faBell} />
                            </IconButton>
                            <Popover
                                open={toggleNotice}
                                anchorEl={noticeRef.current}
                                onClose={closeNotice}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                            >
                                <Notifications />
                            </Popover>

                            <IconButton
                                className={style.icon}
                                onClick={openOptions}
                                ref={moreRef}
                            >
                                <FontAwesomeIcon icon={faSortDown} />
                            </IconButton>
                            <Popover
                                open={toggleMore}
                                anchorEl={moreRef.current}
                                onClose={closeMore}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                            >
                                <Options />
                            </Popover>
                        </Hidden>

                        <Hidden mdUp>
                            <IconButton
                                className={style.icon}
                                onClick={() => setToggleDrawer(true)}
                            >
                                <FontAwesomeIcon icon={faBars} />
                            </IconButton>
                            <SwipeableDrawer
                                anchor="right"
                                open={toggleDrawer}
                                onOpen={() => {}}
                                onClose={() => setToggleDrawer(false)}
                            >
                                <Box p={1} width={300}>
                                    <Gutter />
                                </Box>
                            </SwipeableDrawer>
                        </Hidden>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    )
}
