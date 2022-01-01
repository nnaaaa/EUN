import { Box, Grid, Typography } from '@mui/material'
import { IPublicInfo } from 'models/user'
import { Component } from 'react'
import Loading from 'screens/loading'
import Background from './background'
import TabBar from './tabBar'


export interface IHeaderProps {
    index: number
    setIndex: (i: number) => void
    user: IPublicInfo | undefined
}

interface IHeaderStates {}


export default abstract class Header extends Component<IHeaderProps, IHeaderStates> {
    constructor(props: IHeaderProps) {
        super(props)
    }
    protected abstract UserTool(): React.ReactElement
    
    render() {
        const { user } = this.props
        if (!user)
            return <Loading/>

        return (
            <Box width="100%">
                <Background avatar={user.avatar}/>
                <Typography
                    variant="h4"
                    component="h1"
                    align="center"
                    sx={{ my: 4, fontWeight: 'bold' }}
                >
                    {user.username}
                </Typography>
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
                            item
                            container
                            md={6}
                            justifyContent="flex-end"
                            alignItems='center'
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








