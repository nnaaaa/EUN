import { faPython } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Avatar, Box, CardHeader, CircularProgress, IconButton, Tooltip, Typography } from '@mui/material'
import { postAPI } from 'api/restful-user'
import Switcher from 'components/switcher'
import Helper from 'helpers/comment'
import { IPost } from 'models/post'
import moment from 'moment'
import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import Loading from 'screens/loading'
import { useAppDispatch, useAppSelector } from 'states/hooks'
import { postActions } from 'states/slices/postSlice'
import { Color } from 'styles/global'
import { PostContext } from '../postContext'
import Mode from './mode'
import Options from './options'


export default function PostHeader({ post }: { post: IPost }) {
    const { owner, mode, createAt } = post
    const [isFetching, setIsFetching] = useState(false)
    const { setIsDisplayNERContent } = useContext(PostContext)
    const dispatch = useAppDispatch()

    const user = useAppSelector((state) => state.user.current)
    const time = moment(createAt).fromNow(true)
    const detailTime = moment(createAt).format('h:mm:ss a, DD MMMM YYYY')

    const onLoadEntities = async () => {
        setIsFetching(true)
        const fetchedPost = await postAPI.get(post._id)
        dispatch(postActions.updatePost(fetchedPost.data))
        setIsFetching(false)
    }

    const toggleNERContent = () => {
        if (setIsDisplayNERContent) {
            setIsDisplayNERContent((prev) => !prev)
        }
    }

    if (!user) return <Loading />

    return (
        <CardHeader
            avatar={
                <Avatar src={owner.avatar} component={Link} to={`/user/${owner._id}`} />
            }
            title={
                <Typography
                    variant="h6"
                    component={Link}
                    to={`/user/${owner._id}`}
                    color={Color.TEXT_PRIMARY_COLOR}
                >
                    {owner.username}
                </Typography>
            }
            subheader={
                <Box display="flex" alignItems="center">
                    <Tooltip title={detailTime} placement="bottom">
                        <Typography
                            variant="subtitle2"
                            color="textSecondary"
                            sx={{ marginRight: 1 }}
                        >
                            {time}
                        </Typography>
                    </Tooltip>
                    <Tooltip title={mode} placement="bottom">
                        <Typography
                            variant="subtitle2"
                            color="textSecondary"
                            sx={{ marginRight: 1 }}
                        >
                            <Mode mode={mode} />
                        </Typography>
                    </Tooltip>
                    <Tooltip title="Load your content with named words by AI Mode. It is accomplished by Natural Language Processing technique" placement="top">
                        <IconButton size="small" onClick={onLoadEntities} disabled={isFetching}>
                            {isFetching ? <CircularProgress size="15px" /> : <FontAwesomeIcon icon={faPython} size="sm" />}

                        </IconButton>
                    </Tooltip>
                </Box>
            }
            action={
                <Box display="flex">
                    <Tooltip title={Helper.ner} placement="top">
                        <Box mr={4}>
                            <Switcher label='NER' defaultChecked onClick={toggleNERContent} />
                        </Box>
                    </Tooltip>
                    {user._id === owner._id ? <Options post={post} /> : <></>}
                </Box>
            }
        />
    )
}
