import React, {ReactNode, useState} from 'react'
import {
  faFileImage,
  faMinusCircle,
  faPaperPlane,
  faPhone,
  faPlusCircle,
  faTimes,
  faVideo,
} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {Box, Tooltip, Avatar, CircularProgress, IconButton} from '@mui/material'
import {
  FriendComposing,
  FriendMessage,
  MessageInput,
  MyMessage,
  NameOfFriend,
  WrapperMessage,
} from 'features/message/chat/chatStyles'
import {useEffect, useRef} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import moment from 'moment'
import {useStyle} from './chatStyles'

const time = 5000
const checkerTime = 10000
const numberOfMessage = 30

interface IIconBox{
  children: ReactNode
  [key]:any
}

const IconBox = ({children, ...attr}:IIconBox) => (
  <IconButton color="primary" {...attr} size="small">
    {children}
  </IconButton>
)


interface IChat{

}

function Chat({ messages, name, avatar, id, uid, composing }) {
  
  const style = useStyle()
  const inputMessage = useRef(null)
  const heightOfChatWrapper = useRef(null)
  const protectSpamTimeout = useRef(null)
  const [timeToAllowChat, setTimeToAllowChat] = useState(0)
  const [isAllowChat, setAllowChat] = useState(true)
  let countSpam = useRef(0)
  const {uid: myUid} = useSelector((state) => state.user)
  const dispatch = useDispatch()

  useWatchDoc('rooms', id, dispatch, Actions.updateMessages)

  useEffect(() => {
    setInterval(() => {
      if (countSpam.current < numberOfMessage) countSpam.current = 0
      else {
        if (!isAllowChat) return
        setAllowChat(false)
        let percentTimeout = setInterval(() => {
          setTimeToAllowChat((pre) => pre + 1)
        }, time / 100)
        setTimeout(() => {
          clearTimeout(percentTimeout)
          setAllowChat(true)
          setTimeToAllowChat(0)
          countSpam.current = 0
        }, time)
      }
    }, checkerTime)
  }, [])

  const sendMessage = async (e) => {
    e.preventDefault()

    if (!isAllowChat) return

    countSpam.current++

    const content = inputMessage.current.value.trim()
    if (!content) return
    //gửi lời nhắn
    await updateDocument('rooms', id, {
      messages: firebase.firestore.FieldValue.arrayUnion({
        uid,
        content,
        createAt: firebase.firestore.Timestamp.now(),
      }),
      composing: firebase.firestore.FieldValue.arrayRemove(myUid),
    })

    //set input về giá trị trống và trỏ vào
    inputMessage.current.value = ''
    inputMessage.current.focus()
  }

  const focus = async () => {
    await updateDocument('rooms', id, {
      composing: firebase.firestore.FieldValue.arrayUnion(myUid),
    })
  }
  const blur = async () => {
    await updateDocument('rooms', id, {
      composing: firebase.firestore.FieldValue.arrayRemove(myUid),
    })
  }
  const closeChat = () => {
    dispatch(Actions.closeChat(uid))
  }

  //scroll xuống khi vừa mở khung chat hoặc có tin nhắn mới
  useEffect(() => {
    const chatRef = heightOfChatWrapper.current
    const scrolling = (e) => {
      e.currentTarget.scroll({
        top: e.currentTarget.scrollHeight,
        behavior: 'smooth',
      })
    }
    //vừa mở khung chat -> scroll
    chatRef.scroll({
      top: chatRef.scrollHeight,
      behavior: 'smooth',
    })

    //bắt sự kiện thêm 1 tin nhắn mới sẽ scroll
    chatRef.addEventListener('DOMNodeInserted', scrolling)

    return () => {
      chatRef.removeEventListener('DOMNodeInserted', scrolling)
    }
  }, [])

  return (
    <Box bgcolor="white" boxShadow={2} mr={1} borderRadius={10} width="20rem">
      <Box p={1} display="flex" justifyContent="space-between" height="60px">
        <Box display="flex" alignItems="center" maxWidth="50%">
          <Avatar src={avatar} />
          <NameOfFriend>{name}</NameOfFriend>
        </Box>
        <Box display="flex" alignItems="center">
          <IconBox>
            <FontAwesomeIcon icon={faVideo} />
          </IconBox>
          <IconBox>
            <FontAwesomeIcon icon={faPhone} />
          </IconBox>
          <IconBox>
            <FontAwesomeIcon icon={faMinusCircle} />
          </IconBox>
          <IconBox onClick={closeChat}>
            <FontAwesomeIcon icon={faTimes} />
          </IconBox>
        </Box>
      </Box>
      <WrapperMessage ref={heightOfChatWrapper}>
        {messages.map((msg, index) => {
          let time = moment(msg.createAt.seconds).calendar()
          if (msg.uid !== myUid) {
            return (
              <Tooltip title={time} placement="left" key={index}>
                <MyMessage>{msg.content}</MyMessage>
              </Tooltip>
            )
          }
          return (
            <Tooltip title={time} placement="right" key={index}>
              <FriendMessage>{msg.content}</FriendMessage>
            </Tooltip>
          )
        })}
        {composing.includes(uid) && <FriendComposing />}
      </WrapperMessage>
      <Box p={1} display="flex" justifyContent="space-between" alignItems="center">
        <IconBox>
          <FontAwesomeIcon icon={faPlusCircle} />
        </IconBox>
        <IconBox>
          <FontAwesomeIcon icon={faFileImage} />
        </IconBox>
        <form onSubmit={sendMessage}>
          <MessageInput ref={inputMessage} type="text" onFocus={focus} onBlur={blur} />
        </form>

        <IconBox onClick={sendMessage} className={style.btnSend}>
          {!isAllowChat && (
            <div className={style.progress}>
              <CircularProgress value={timeToAllowChat} variant="determinate" />
            </div>
          )}
          <FontAwesomeIcon icon={faPaperPlane} />
        </IconBox>
      </Box>
    </Box>
  )
}

export default React.memo(Chat)
