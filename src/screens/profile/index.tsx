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

    Lazyload = () => (
        <Box width="100%">
            <Skeleton height={400} variant="rectangular" />
            <Skeleton height={50} variant="rectangular" style={{ marginTop: 100 }} />
            <Box
                py={2}
                sx={{
                    px: {
                        xs: 10,
                        lg: 30,
                    },
                }}
            >
                <Grid container spacing={2}>
                    <Grid item md={5}>
                        <Skeleton height={120} variant="rectangular" />
                        <Skeleton height={120} variant="rectangular" />
                        <Skeleton height={120} variant="rectangular" />
                    </Grid>
                    <Grid item md={7}>
                        <Skeleton height={135} variant="rectangular" />
                        <Skeleton height={300} variant="rectangular" />
                        <Skeleton height={300} variant="rectangular" />
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
    protected abstract Header(): React.ReactElement

    private BoxStyled = ({ children }: { children: React.ReactElement }) => (
        <Box
            className={className.wrapper}
            py={2}
            sx={{
                px: {
                    xs: 10,
                    lg: 30,
                },
            }}
            bgcolor="#f2f5f6"
        >
            {children}
        </Box>
    )

    protected setIndexTabView = (index: number) => {
        this.setState({ index })
    }

    render() {
        const { user } = this.props
        const { index } = this.state

        if (!user) return <Loading />

        return (
            <Box bgcolor="white" width="100%">
                <this.Header />

                <SwipeableViews
                    axis={'x'}
                    index={index}
                    onChangeIndex={(newIdx, lastedIndex) => this.setIndexTabView(newIdx)}
                >
                    <this.BoxStyled>
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
                                <ListPost posts={user.posts} />
                            </Grid>
                        </Grid>
                    </this.BoxStyled>
                    <this.BoxStyled>
                        <ListPhoto user={user} />
                    </this.BoxStyled>
                    <this.BoxStyled>
                        <ListFriend user={user} setIndex={this.setIndexTabView} />
                    </this.BoxStyled>
                </SwipeableViews>
            </Box>
        )
    }
}
