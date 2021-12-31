import { faFacebook } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    AppBar, Avatar,
    Box, Grid, IconButton, Tab, Tabs, Typography
} from '@mui/material'
import { IPublicInfo } from 'models/user'
import { Component } from 'react'
import { Link } from 'react-router-dom'
import { useStyle } from './styles'


interface IHeaderProps {
    index: number
    setIndex: (i: number) => void
    user: IPublicInfo
}

interface IHeaderStates {}


export default abstract class Header extends Component<IHeaderProps, IHeaderStates> {
    constructor(props: IHeaderProps) {
        super(props)
    }
    protected abstract UserTool():React.ReactElement

    protected setToggle(isToggle: boolean) { this.setState({ isToggle }) }

    render() {
        const { user } = this.props
        
        return (
            <Box width="100%">
                <Background avatar={user.avatar}/>
                <UserName username={user.username}/>
                <Box 
                    sx={{
                        px: { xs: 10, lg: 30 },
                        borderBottom: '1px solid #dad6d6',
                        textAlign: 'center',
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}
                >
                    <Grid container direction="row-reverse">
                        <Grid
                            container
                            item
                            md={6}
                            justifyContent="flex-end"
                            alignItems="center"
                        >
                            <this.UserTool/>
                        </Grid>
                        <Grid container item md={6}>
                            <TabBar {...this.props}/>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        )
    }
}

const Background = ({ avatar }: { avatar: string | undefined }) => {
    const style = useStyle()
    return (
        <Box className={style.coverPhoto}>
            <Box className={style.avatar}>
                <Avatar src={avatar} className={style.avatarInside} />
            </Box>
            <IconButton className={style.logo} component={Link} to="/">
                <FontAwesomeIcon icon={faFacebook} />
            </IconButton>
        </Box>
    )
}

const UserName = ({ username }: { username: string }) => {
    
    return (
        <Typography
            variant="h4"
            component="h1"
            align="center"
            sx={{ my: 4, fontWeight: 'bold' }}
        >
            {username}
        </Typography>
    )
}

const TabBar = ({ setIndex, index, user }: IHeaderProps) => {
    const style = useStyle()
    return (
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
                    label={`Friends (${user.friends.accepted.length})`}
                    className={style.item}
                />
            </Tabs>
        </AppBar>
    )
}





