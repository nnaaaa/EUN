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
import { useStyle } from './searchStyles'
// import { addDocument, getDocument, updateDocument } from 'firebase/api'
// import firebase, { db } from 'firebase/config'
import { filterSearch } from '../../../algorithms/filterSearch'
import { useAppDispatch, useAppSelector } from 'states/hooks'
import Popup from 'components/popup'
import ListResult from './listSearch'
import { findByName } from 'states/slices/friendSlice'

export default function SearchForm() {
    const style = useStyle()
    const searchInput = useRef < null | HTMLInputElement>(null)
    const timeout = useRef<ReturnType<typeof setTimeout> | null>(null)
    const [popup, setPopup] = useState(false)

    const [users, setUsers] = useState([])
    const user = useAppSelector(state => state.user.current)
    const { current:friendList,loading } = useAppSelector(state => state.friend)
    const dispatch = useAppDispatch()
    // useEffect(() => {
    //     getUser()
    // }, [user])

    const getUser = useCallback(async () => {
        if (!searchInput.current || !searchInput.current?.value) return
        
        if (timeout.current) clearTimeout(timeout.current)
        timeout.current = setTimeout(async () => {
            dispatch(findByName(searchInput.current?.value || ''))
            // const filterData = filterSearch(data, user, searchInput.current.value)
            // setUsers(filterData)
        }, 300)
    }, [user, searchInput])
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

    
    return (
        <Box width="70%">
            <Button className={style.inputBtn} onClick={() => setPopup(true)}>
                Tìm kiếm bạn bè
            </Button>
            <Popup
                open={popup}
                onClose={() => {
                    setPopup(false)
                    setUsers([])
                    // searchInput?.current.value = ''
                }}
            >
                <Box width="400px" height="600px">
                    <InputBase
                        inputRef={searchInput}
                        onChange={getUser}
                        className={style.input}
                        placeholder="Tìm kiếm bạn bè"
                        endAdornment={loading ? (
                                <IconButton>
                                    <CircularProgress size="18px" />
                                </IconButton>
                            ) : (
                                <IconButton>
                                    <FontAwesomeIcon icon={faSearch} size="xs" />
                                </IconButton>
                            )}
                    />
                    <Box mt={2}>
                        <ListResult list={friendList}/>
                    </Box>
                </Box>
            </Popup>
        </Box>
    )
}
