import React from 'react'
import {Typography, Box, Button, CircularProgress, Avatar} from '@material-ui/core'
import {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import {addDocument, getDocument} from 'firebase/api'
import firebase, {db} from 'firebase/config'
import {css} from './styles'

const Notifications = () => {
  const style = css()
  const [loading, setLoading] = useState(true)
  const {listInvited: listInvitedID, id, uid} = useSelector((state) => state.user)
  const [listInvited, setListInvited] = useState([])

  //lắng nghe danh sách mời thay đổi
  useEffect(() => {
    getDocument('users', {
      field: 'uid',
      operator: 'in',
      value: listInvitedID,
    }).then((data) => {
      setListInvited(data)
      setLoading(false)
    })
  }, [listInvitedID])

  const accept = async (friend) => {
    try {
      const friendDoc = db.collection('users').doc(friend.id)
      const userDoc = db.collection('users').doc(id)
      const batch = db.batch()
      batch.update(friendDoc, {
        listInviting: firebase.firestore.FieldValue.arrayRemove(uid),
        friends: firebase.firestore.FieldValue.arrayUnion(uid),
      })
      batch.update(userDoc, {
        listInvited: firebase.firestore.FieldValue.arrayRemove(friend.uid),
        friends: firebase.firestore.FieldValue.arrayUnion(friend.uid),
      })
      await batch.commit()
      const room = await getDocument('rooms', {
        field: 'members',
        operator: 'array-contains-any',
        value: [uid, friend.uid],
      })
      if (!room.length) {
        await addDocument('rooms', {
          messages: [],
          composing: [],
          members: [uid, friend.uid],
        })
      }
      setLoading(false)
    } catch {
      setLoading(false)
    }
  }

  return (
    <Box
      p={2}
      width="max-content"
      borderRadius={6}
      boxShadow={2}
      bgcolor="white"
      maxHeight="300px"
      overflow="auto"
    >
      {loading ? (
        <CircularProgress />
      ) : listInvited.length ? (
        listInvited?.map((user, i) => (
          <Box mb={1} display="flex" alignItems="center" width="280px" key={i}>
            <Box>
              <Avatar src={user.avatar} />
            </Box>
            <Box mx={1} overflow="hidden" width="70%">
              <Typography color="textPrimary" className={style.name}>
                {user.name}
              </Typography>
              <Typography color="textSecondary" noWrap={true}>
                send you an invition
              </Typography>
            </Box>
            <Button
              onClick={() => accept(user)}
              variant="outlined"
              color="primary"
              size="small"
            >
              accept
            </Button>
          </Box>
        ))
      ) : (
        <Box>
          <Typography>😓 Không có thông báo nào</Typography>
        </Box>
      )}
    </Box>
  )
}

export default Notifications
