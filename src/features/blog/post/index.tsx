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
    Skeleton,
    Tooltip,
    Typography,
} from '@mui/material'
import { friendAPI } from 'api/rest'
import { useCommentSocket } from 'api/socket/comment'
import DisplayGridImages from 'components/images/output2'
import { IComment } from 'models/comment'
import { ID } from 'models/common'
import { IPost } from 'models/post'
import moment from 'moment'
import { useCallback, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from 'states/hooks'
import { postActions } from 'states/slices/postSlice'
import Comment from './comment'
import Options from './crudOption'
import InputComment from './inputComment'
import InteractTool from './interactTools'
import Mode from './mode'
import { useInteraction } from './interactHook'
import ReactCounter from './reactCounter'
import { CardContent, CardMargin } from './styles'



export default function Post(info: IPost) {
    const { owner, content, images, react, _id, mode, comments, createAt } = info
    const interactTool = useInteraction(info)
    const user = useAppSelector((state) => state.user.current)

    const optionRef = useRef(null)
    const [toggleOption, setToggleOption] = useState(false)

    const time = moment(createAt).fromNow(true)
    const detailTime = moment(createAt).format('dddd, h:mm:ss a, MMMM YYYY')
    const dispatch = useAppDispatch()

    const dispatcher = useCallback(
        (newComment: IComment) => {
            friendAPI.findById(newComment.owner as ID).then((owner) => {
                newComment.owner = owner.data
                dispatch(postActions.insertComment({ comment: newComment, postId: _id }))
            })
        },
        [dispatch]
    )
    useCommentSocket(_id, dispatcher)

    return (
        <CardMargin>
            <CardHeader
                avatar={<Avatar src={owner.avatar} />}
                title={
                    <Typography
                        variant="h6"
                        component={Link}
                        to={`/friend/${_id}`}
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
                <Options post={info} />
            </Popover>

            {content && <CardContent>{content}</CardContent>}

            <CardMedia>
                <DisplayGridImages images={images} title={owner.username} />
            </CardMedia>

            <Box p={2} pb={1}>
                <ReactCounter react={react}/>
                <InteractTool tool={interactTool}/>
            </Box>
            {interactTool.isJoin && (
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
