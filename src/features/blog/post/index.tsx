import { faEllipsisH } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    Avatar,
    Box,
    Button,
    CardHeader,
    CardMedia,
    Divider,
    IconButton,
    Popover,
    Tooltip,
    Typography,
} from '@mui/material'
import { useCommentSocket } from 'api/socket/comment'
import { useReactSocket } from 'api/socket/react'
import DisplayGridImages from 'components/images/output2'
import { IPost } from 'models/post'
import moment from 'moment'
import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Loading from 'screens/loading'
import { useAppSelector } from 'states/hooks'
import Comment from './comment'
import Options from './crudOption'
import InputComment from './inputComment'
import InteractTool from './interactTools'
import { useInteraction } from './interactTools/interactHook'
import Mode from './mode'
import ReactCounter from './reactCounter'
import { CardContent, CardMargin } from './styles'

export default function Post(info: IPost) {
    const { owner, content, images, react, _id, mode, comments, createAt } = info
    const interactTool = useInteraction(info)
    const user = useAppSelector((state) => state.user.current)

    const optionRef = useRef(null)
    const [toggleOption, setToggleOption] = useState(false)

    const time = moment(createAt).fromNow(true)
    const detailTime = moment(createAt).format('h:mm:ss a, DD MMMM YYYY')

    useCommentSocket(_id)
    useReactSocket(info._id, info.react._id)

    if (!user) return <Loading />

    return (
        <CardMargin
            onFocus={() => console.log('focus')}
            onBlur={() => console.log('blur')}
        >
            <CardHeader
                avatar={
                    <Avatar
                        src={owner.avatar}
                        component={Link}
                        to={`/user/${owner._id}`}
                    />
                }
                title={
                    <Typography
                        variant="h6"
                        component={Link}
                        to={`/user/${owner._id}`}
                        color="black"
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
                    </Box>
                }
                action={
                    user._id == owner._id ? (
                        <IconButton
                            color="primary"
                            size="small"
                            ref={optionRef}
                            onClick={() => setToggleOption(true)}
                        >
                            <FontAwesomeIcon icon={faEllipsisH} />
                        </IconButton>
                    ) : (
                        <></>
                    )
                }
            />

            <Popover
                open={toggleOption}
                anchorEl={optionRef.current}
                onClose={() => setToggleOption(false)}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <Options post={info} setOpenOption={setToggleOption} />
            </Popover>

            {content && <CardContent>{content}</CardContent>}

            <CardMedia>
                <DisplayGridImages images={images} title={owner.username} />
            </CardMedia>

            <Box p={2} pb={1}>
                <ReactCounter react={react} />
                <InteractTool tool={interactTool} />
            </Box>
            {interactTool.isJoinComment && (
                <Box px={2} pt={0} pb={1}>
                    <Divider />
                    <InputComment post={info} />
                    {comments ? (
                        comments.map((comment, index) => (
                            <Comment key={index} {...comment} />
                        ))
                    ) : (
                        <></>
                    )}
                    <Button sx={{ textTransform: 'capitalize' }} size="small">
                        View more comments
                    </Button>
                </Box>
            )}
        </CardMargin>
    )
}

//   useWatchDoc('posts', id, dispatch, Actions.updatePostComment)

//
//   const getListReact = async () => {
//     const user = await getDocument('users', {
//       field: 'uid',
//       operator: 'in',
//       value: [...reacts.like, ...reacts.heart],
//     })
//     setListReact(user)
//   }
//   //update on my react
//   const setReact = async (type) => {
//     if (reacts[type].includes(myUid)) {
//       await updateDocument('posts', id, {
//         reacts: {
//           like: reacts.like.filter((uid) => uid !== myUid),
//           heart: reacts.heart,
//         },
//       })
//     } else {
//       await updateDocument('posts', id, {
//         reacts: {
//           like: [...reacts.like, myUid],
//           heart: reacts.heart,
//         },
//       })
//     }
//   }
