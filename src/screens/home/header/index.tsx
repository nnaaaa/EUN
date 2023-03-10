import {
    faBars, faGamepad,
    faHome,
    faSortDown,
    faTv,
    faUsers
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
    Toolbar
} from '@mui/material'
import Logo from 'components/logo'
import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Gutter from 'screens/home/gutter'
import { useStyle } from 'screens/home/header/headerStyles'
import SearchForm from '../../../features/searchForm'
import ConversationButton from './conversation/representButton'
import NotificationButton from './notificationList/representButton'
import Options from './options'
import { ThemeModeSwitch } from './themeModeButton'

export default function Header() {
    const style = useStyle()

    const [toggleMore, setToggleMore] = useState(false)
    const moreRef = useRef(null)

    const [toggleDrawer, setToggleDrawer] = useState(false)

    const openOptions = () => {
        setToggleMore(true)
    }
    const closeMore = () => {
        setToggleMore(false)
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
                            <Logo />
                            <SearchForm />
                        </Grid>
                    </Hidden>
                    <Grid item container md={6} xs={10}>
                        <Button className={style.button} component={Link} to="/">
                            <FontAwesomeIcon icon={faHome} />
                        </Button>
                        <Button className={style.button} disabled>
                            <FontAwesomeIcon icon={faTv} />
                        </Button>
                        <Button className={style.button} disabled>
                            <FontAwesomeIcon icon={faUsers} />
                        </Button>
                        <Button className={style.button} component={Link} to={`/games`}>
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
                            {/* <IconButton className={style.icon} disabled>
                                <FontAwesomeIcon icon={faBorderNone} />
                            </IconButton> */}
                            <ThemeModeSwitch/>

                            <ConversationButton />
                            <NotificationButton />

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
                                <Box p={1} width={300} height="100%">
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
