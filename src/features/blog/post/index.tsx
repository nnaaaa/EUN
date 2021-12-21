import {faEllipsisH} from '@fortawesome/free-solid-svg-icons'
import {
  Typography,
  Box,
  IconButton,
  CardHeader,
  Divider,
  Popover,
  Tooltip,
  CardMedia,
  Avatar,
  ButtonBase,
} from '@mui/material'
import {StatusInput,CardMargin, CardContent} from './styles'
import { Link } from 'react-router-dom'

// import CommentBtn from './commentBtn/index'
// import LikeCount from './likeCount/index'
// import Comment from 'features/listBlog/blog/comment/comment'
import Reacts from './reacts'
import InputComment from './inputComment'
// import OnlineBadge from 'components/onlineBage'

import moment from 'moment'

import {useMemo, useRef, useState} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

// import Options from './options'
import {Skeleton} from '@mui/material'
import { IPost } from 'models/post'
import { useAppDispatch, useAppSelector } from 'states/hooks'

import Mode from './mode'
import DisplayGridImages from 'components/images/output2'


export default function Post(info: IPost) {
  const { owner, content,images, react, _id, mode, comments, createAt } = info
  const { avatar, username, _id: myId } = useAppSelector(state => state.user.current)
  const inputComment = useRef(null)
  const optionRef = useRef(null)
  const [toggleOption, setToggleOption] = useState(false)
  const [err, setErr] = useState(false)
  const [isLoading, setLoading] = useState(false)
 
  const [isJoin, setIsJoin] = useState(false)
  const [listReact, setListReact] = useState([])
  //   const [owner, setOwner] = useState({})
  const [countComment, setCountComment] = useState(0)

  const time = moment(createAt).fromNow(true)
  const detailTime = moment(createAt).format('dddd, h:mm:ss a, MMMM YYYY')
  const dispatch = useAppDispatch()

  
  //   useWatchDoc('posts', id, dispatch, Actions.updatePostComment)

  //   const sendComment = async (e) => {
  //     e.preventDefault()
  //     const content = inputComment.current.value
  //     inputComment.current.value = ''
  //     await updateDocument('posts', id, {
  //       comments: firebase.firestore.FieldValue.arrayUnion({
  //         content,
  //         uid: myUid,
  //         avatar: myAvatar,
  //         name: myName,
  //         createAt: firebase.firestore.Timestamp.now(),
  //       }),
  //     })
  //   }
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

  if (err) return <></>

  if (isLoading)
    return (
      <CardMargin>
        <CardHeader
          avatar={<Skeleton variant="circular" height={40} width={40} />}
          title={<Skeleton variant="text" width={90} />}
          subheader={<Skeleton variant="text" width={70} />}
        />
        <Box p={2} pt={0}>
          <Skeleton variant="text" width="100%" />
          <Skeleton variant="text" width="100%" />
          <Skeleton variant="text" width="100%" />
          <Skeleton variant="text" width="100%" />
        </Box>
        <Box p={2} pt={0}>
          <Skeleton variant="rectangular" height={300} />
        </Box>
      </CardMargin>
    )

  return (
    <CardMargin>
      <CardHeader
        avatar={
          <Avatar src={owner.avatar} />
        }
        title={
          <Typography variant="h6" component={Link} to={`/friend/${_id}`} color='black'>
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
          <IconButton
            color="primary"
            size='small'
            ref={optionRef}
            onClick={() => setToggleOption(true)}
          >
            <FontAwesomeIcon icon={faEllipsisH} />
          </IconButton>
        }
      />

      {/* <Popover
        open={toggleOption && myUid === uid}
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
        <Options {...info} />
      </Popover> */}

      {content && <CardContent>{content}</CardContent>}

      <CardMedia>
        <DisplayGridImages images={images} title={owner.username} />
      </CardMedia>

      <Box p={2} pb={1}>
        <Reacts
          like={react ? react.likes : []}
          heart={react ? react.hearts : []}
        />
        <InputComment/>
      </Box>
      {/* {isJoin && (
        <Box p={2} pt={0} pb={1}>
          <Divider />
          <Box mb={2} mt={1} display="flex" alignItems="center">
            <OnlineBadge>
              <Avatar src={myAvatar} />
            </OnlineBadge>
            <form onSubmit={sendComment} style={{flex: 1, margin: 0, marginLeft: 8}}>
              <StatusInput placeholder="Nhập bình luận" ref={inputComment} />
            </form>
          </Box>
          {comments.slice(0, countComment).map((comment, index) => (
            <Comment key={index} {...comment} />
          ))}
          <ButtonBase onClick={() => setCountComment((pre) => pre + 5)}>
            View more comments
          </ButtonBase>
        </Box>
      )} */}
    </CardMargin>
  )
}
