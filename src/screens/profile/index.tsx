import { Box, Grid, Skeleton } from '@mui/material'
import ListPost from 'features/listPost'
import { IPublicInfo } from 'models/user'
import { Component } from 'react'
import SwipeableViews from 'react-swipeable-views'
import Loading from 'screens/loading'
import Friends from './browse/friends'
import Intro from './browse/intro'
import Photos from './browse/photos'
import ListFriend from './detail/listFriend'
import ListPhoto from './detail/listPhoto'

import className from './profileStyles.module.css'
import { BoxStyled, ProfileLazyloading } from './styles'

interface IProfileProps {
    user: IPublicInfo | undefined
}

interface IProfileStates {
    index: number
    user: IPublicInfo | undefined
    reload: boolean
}

export default abstract class Profile extends Component<IProfileProps, IProfileStates> {
    constructor(props: IProfileProps) {
        super(props)
        this.state = {
            reload: false,
            index: 0,
            user: props.user,
        }
    }

    protected abstract Header(): React.ReactElement

    protected setIndexTabView = (index: number) => {
        this.setState({ index })
    }

    render() {
        const { user } = this.props
        const { index } = this.state

        if (!user) return <ProfileLazyloading />

        return (
            <Box bgcolor="white" width="100%">
                <this.Header />

                <SwipeableViews
                    axis={'x'}
                    index={index}
                    onChangeIndex={(newIdx, lastedIndex) => this.setIndexTabView(newIdx)}
                >
                    <BoxStyled>
                        <Grid container spacing={2}>
                            <Grid
                                item
                                md={5}
                                sx={{
                                    display: {
                                        xs: 'none',
                                        md: 'initial',
                                    },
                                }}
                            >
                                <Intro user={user} />
                                <Photos setIndex={this.setIndexTabView} />
                                <Friends setIndex={this.setIndexTabView} user={user} />
                            </Grid>
                            <Grid item md={7} xs={12}>
                                <ListPost mode="private" user={user} />
                            </Grid>
                        </Grid>
                    </BoxStyled>
                    <BoxStyled>
                        <ListPhoto user={user} />
                    </BoxStyled>
                    <BoxStyled>
                        <ListFriend user={user} setIndex={this.setIndexTabView} />
                    </BoxStyled>
                </SwipeableViews>
            </Box>
        )
    }
}
