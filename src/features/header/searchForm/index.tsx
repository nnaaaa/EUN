import React, { useCallback, useState, useRef, useEffect } from 'react'
import { useSelector } from 'react-redux'
import {
    Typography,
    Box,
    IconButton,
    Avatar,
    InputBase,
    CircularProgress,
    Button,
    Link,
} from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faSearch, faCheckCircle } from '@fortawesome/free-solid-svg-icons'
// import Popup from 'components/popup'
import { css } from './searchStyles'
// import { addDocument, getDocument, updateDocument } from 'firebase/api'
// import firebase, { db } from 'firebase/config'
import { filterSearch } from './filterSearch'

export default function SearchForm() {
    // const style = css()
    // const searchInput = useRef(null)
    // const timeout = useRef<()=>void | null>(null)
    // const [loading, setLoading] = useState(false)
    // const [popup, setPopup] = useState(false)

    // const [users, setUsers] = useState([])
    // const user = useSelector((state) => state.user)

    // useEffect(() => {
    //     getUser()
    // }, [user])

    // const getUser = useCallback(async () => {
    //     if (!searchInput?.current?.value) return
    //     setLoading(true)
    //     if (timeout.current) clearTimeout(timeout.current)
    //     timeout.current = setTimeout(async () => {
    //         const data = await getDocument('users', { value: 'all' })
    //         const filterData = filterSearch(data, user, searchInput.current.value)
    //         setUsers(filterData)
    //         setLoading(false)
    //     }, 300)
    // }, [user, searchInput])
    // const addFriend = async (friend) => {
    //     setLoading(true)
    //     await updateDocument('users', user.id, {
    //         listInviting: firebase.firestore.FieldValue.arrayUnion(friend.uid),
    //     })
    //     await updateDocument('users', friend.id, {
    //         listInvited: firebase.firestore.FieldValue.arrayUnion(user.uid),
    //     })
    //     setLoading(false)
    // }
    // const accept = async (friend) => {
    //     try {
    //         const friendDoc = db.collection('users').doc(friend.id)
    //         const userDoc = db.collection('users').doc(user.id)
    //         const batch = db.batch()
    //         batch.update(friendDoc, {
    //             listInviting: firebase.firestore.FieldValue.arrayRemove(user.uid),
    //             friends: firebase.firestore.FieldValue.arrayUnion(user.uid),
    //         })
    //         batch.update(userDoc, {
    //             listInvited: firebase.firestore.FieldValue.arrayRemove(friend.uid),
    //             friends: firebase.firestore.FieldValue.arrayUnion(friend.uid),
    //         })
    //         await batch.commit()
    //         await addDocument('rooms', {
    //             messages: [],
    //             composing: [],
    //             members: [user.uid, friend.uid],
    //         })
    //         setLoading(false)
    //     } catch {
    //         setLoading(false)
    //     }
    // }

    // const UserRole = (friend) => {
    //     if (friend.isFriend)
    //         return <FontAwesomeIcon icon={faCheckCircle} size="md" color="green" />

    //     if (friend.isInviting) return <Typography color="secondary">Inviting</Typography>

    //     if (friend.isInvited)
    //         return (
    //             <Button
    //                 variant="outlined"
    //                 onClick={() => accept(friend)}
    //                 color="primary"
    //                 size="small"
    //             >
    //                 accept
    //             </Button>
    //         )

    //     return (
    //         <IconButton size="small" onClick={() => addFriend(friend)}>
    //             <FontAwesomeIcon icon={faPlus} size="xs" />
    //         </IconButton>
    //     )
    // }
    return (
        <Box width="70%">
            {/* <Button className={style.inputBtn} onClick={() => setPopup(true)}>
                <Typography variant="subtitle2" color="textSecondary">
                    Tìm kiếm bạn bè
                </Typography>
            </Button>
            <Popup
                open={popup}
                onClose={() => {
                    setPopup(false)
                    setUsers([])
                    searchInput.current.value = ''
                }}
            >
                <Box width="400px" height="600px">
                    <InputBase
                        inputRef={searchInput}
                        onChange={getUser}
                        className={style.input}
                        placeholder="Tìm kiếm bạn bè"
                        endAdornment={
                            loading ? (
                                <IconButton>
                                    <CircularProgress size="18px" />
                                </IconButton>
                            ) : (
                                <IconButton>
                                    <FontAwesomeIcon icon={faSearch} size="xs" />
                                </IconButton>
                            )
                        }
                    />
                    <Box mt={2}>
                        {users?.map((user, index) => (
                            <Box
                                mb={index === users.length - 1 ? 0 : 1}
                                display="flex"
                                key={index}
                                alignItems="center"
                                width="100%"
                                justifyContent="space-between"
                            >
                                <Box display="flex">
                                    <Link
                                        href={`/friend/${user.account}`}
                                        color="inherit"
                                    >
                                        <Avatar src={user.avatar} />
                                    </Link>
                                    <Link
                                        href={`/friend/${user.account}`}
                                        color="inherit"
                                        className={style.name}
                                    >
                                        <Typography color="textPrimary">
                                            {user.name}
                                        </Typography>
                                    </Link>
                                </Box>
                                <UserRole {...user} />
                            </Box>
                        ))}
                    </Box>
                </Box>
            </Popup> */}
        </Box>
    )
}
