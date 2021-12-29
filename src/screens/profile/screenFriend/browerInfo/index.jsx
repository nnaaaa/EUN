import { faFacebook } from '@fortawesome/free-brands-svg-icons'
import { faPlus, faTimes, faUserFriends } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Typography, AppBar, Tabs, Tab, Grid, Avatar } from '@material-ui/core'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { css, Box } from './styles'
import { useSelector } from 'react-redux'
import { addDocument, deleteDocument, getDocument, updateDocument } from 'firebase/api'
import firebase, { db } from 'firebase/config'
export default function BrowserInfo({ index, setIndex, type, user }) {
    const style = css()
    const [toggle, setToggle] = useState()
    const {
        friends: myListFriend,
        listInviting,
        listInvited,
        uid: myUid,
    } = useSelector((state) => state.user)
    const { avatar, name, uid, friends } = user
    const [isLoading, setLoading] = useState(false)

    const addFriend = async () => {
        setLoading(true)
        await updateDocument('users', myUid, {
            listInviting: firebase.firestore.FieldValue.arrayUnion(user.uid),
        })
        await updateDocument('users', user.uid, {
            listInvited: firebase.firestore.FieldValue.arrayUnion(myUid),
        })
        setLoading(false)
    }
    const refuseInvite = async () => {
        setLoading(true)
        await updateDocument('users', myUid, {
            listInvited: firebase.firestore.FieldValue.arrayRemove(user.uid),
        })
        await updateDocument('users', user.uid, {
            listInviting: firebase.firestore.FieldValue.arrayRemove(myUid),
        })
        setLoading(false)
    }
    const cancleInvite = async () => {
        setLoading(true)
        await updateDocument('users', myUid, {
            listInviting: firebase.firestore.FieldValue.arrayRemove(user.uid),
        })
        await updateDocument('users', user.uid, {
            listInvited: firebase.firestore.FieldValue.arrayRemove(myUid),
        })
        setLoading(false)
    }
    const unFriend = async () => {
        try {
            setLoading(true)
            await updateDocument('users', myUid, {
                friends: firebase.firestore.FieldValue.arrayRemove(user.uid),
            })
            await updateDocument('users', user.uid, {
                friends: firebase.firestore.FieldValue.arrayRemove(myUid),
            })
        } catch {
            console.log('fail to unfriend')
        } finally {
            setLoading(false)
        }
    }
    const accept = async () => {
        try {
            const friendDoc = db.collection('users').doc(uid)
            const userDoc = db.collection('users').doc(myUid)
            const batch = db.batch()
            batch.update(friendDoc, {
                listInviting: firebase.firestore.FieldValue.arrayRemove(myUid),
                friends: firebase.firestore.FieldValue.arrayUnion(myUid),
            })
            batch.update(userDoc, {
                listInvited: firebase.firestore.FieldValue.arrayRemove(uid),
                friends: firebase.firestore.FieldValue.arrayUnion(uid),
            })
            await batch.commit()
            const room = await getDocument('rooms', {
                field: 'members',
                operator: 'array-contains-any',
                value: [uid, myUid],
            })
            if (!room.length) {
                await addDocument('rooms', {
                    messages: [],
                    composing: [],
                    members: [uid, myUid],
                })
            }
            setLoading(false)
        } catch {
            setLoading(false)
        }
    }

    const Role = () => {
        if (myListFriend.includes(uid)) {
            return (
                <Button
                    startIcon={<FontAwesomeIcon icon={faUserFriends} size="xs" />}
                    variant="contained"
                    onClick={unFriend}
                    disabled={isLoading}
                >
                    <Typography className={style.item}>Unfriend</Typography>
                </Button>
            )
        }
        if (listInviting.includes(uid)) {
            return (
                <Button
                    startIcon={<FontAwesomeIcon icon={faTimes} size="xs" />}
                    variant="contained"
                    onClick={cancleInvite}
                    disabled={isLoading}
                >
                    <Typography className={style.item}>Cancle invite</Typography>
                </Button>
            )
        }
        if (listInvited.includes(uid)) {
            return (
                <>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={accept}
                        disabled={isLoading}
                    >
                        <Typography className={style.item}>+ Accept</Typography>
                    </Button>
                    <Button
                        startIcon={<FontAwesomeIcon icon={faTimes} size="xs" />}
                        variant="contained"
                        onClick={refuseInvite}
                        style={{ marginLeft: 10 }}
                        disabled={isLoading}
                    >
                        <Typography className={style.item}>Refuse</Typography>
                    </Button>
                </>
            )
        }
        return (
            <Button
                variant="contained"
                onClick={addFriend}
                color="primary"
                disabled={isLoading}
            >
                <Typography className={style.item}>+ Add friend</Typography>
            </Button>
        )
    }
    return (
        <Box width="100%">
            <div className={style.coverPhoto}>
                <div className={style.avatar}>
                    <Avatar src={avatar} className={style.avatarInside} />
                </div>
                <Link to="/">
                    <FontAwesomeIcon icon={faFacebook} className={style.logo} />
                </Link>
            </div>
            <Typography
                variant="h4"
                component="h1"
                align="center"
                style={{ margin: '30px 0', fontWeight: 'bold' }}
            >
                {name}
            </Typography>
            <Box px={10} lg={{ px: 30 }} className={style.nav}>
                <Grid container direction="row-reverse">
                    <Grid container item md={6} justify="flex-end" alignItems="center">
                        <Role />
                    </Grid>
                    <Grid container item md={6}>
                        <AppBar
                            position="static"
                            color="default"
                            className={style.appbar}
                        >
                            <Tabs
                                value={index}
                                onChange={(event, newIdx) => setIndex(newIdx)}
                                indicatorColor="primary"
                                textColor="primary"
                                variant="fullWidth"
                                aria-label="full width tabs example"
                            >
                                <Tab label="Posts" className={style.item} />
                                <Tab label="Photos" className={style.item} />
                                <Tab
                                    label={`Friends (${friends?.length})`}
                                    className={style.item}
                                />
                            </Tabs>
                        </AppBar>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}
