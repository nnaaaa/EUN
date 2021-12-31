import { faArrowDown, faCamera } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    Box,
    Divider,
    Typography,
    TextField,
    Avatar,
    AccordionSummary,
    AccordionDetails,
    Checkbox,
    FormControlLabel,
    IconButton,
    Button,
} from '@mui/material'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useStyle, Title, Hobbies } from './styles'

import { useRef } from 'react'
import { uid as generate } from 'uid'
import { useAppSelector } from 'states/hooks'

const options = [
    { value: 'code', label: '💻 Code' },
    { value: 'game', label: '🎮 Play game' },
    { value: 'coffee', label: '🥤 Drink Coffee' },
]

interface IEditProfileProps {
    setToggle: Dispatch<SetStateAction<boolean>>
}

export default function EditProfile({ setToggle }: IEditProfileProps) {
    const style = useStyle()
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const user = useAppSelector((state) => state.user.current)

    const [previewAvatar, setPreviewAvatar] = useState(null)
    const [avatarFile, setAvatarFile] = useState(null)
    const [hobbies, setHobbies] = useState([])
    const educationInput = useRef(null)
    const nameInput = useRef(null)

    // const addHobbies = (e) => {
    //   const newHobbies = [...hobbies, e.target.value]
    //   if (e.target.checked) setHobbies(newHobbies)
    //   else setHobbies(newHobbies.filter((hobby) => hobby !== e.target.value))
    // }
    // useEffect(() => {
    //   setHobbies(info?.hobbies ? info.hobbies : [])
    // }, [info])

    // const uploadAvatar = (e) => {
    //   setAvatarFile(e.target.files[0])
    //   setPreviewAvatar(URL.createObjectURL(e.target.files[0]))
    // }

    // const saveProfile = async () => {
    //   setLoading(true)
    //   if (avatarFile) {
    //     const ref = avatarStoreRef.child(uid)
    //     await ref.put(avatarFile)
    //     const url = await ref.getDownloadURL()
    //     await updateDocument('users', uid, {avatar: url})
    //     await upPost(url)
    //   }

    //   const info = {
    //     education: educationInput.current.value?.trim() || '',
    //     hobbies,
    //   }
    //   const updateData = {}
    //   updateData.info = info
    //   if (nameInput.current.value) updateData.name = nameInput.current.value

    //   await updateDocument('users', uid, updateData)
    //   setAvatarFile(null)
    //   setPreviewAvatar(null)
    //   setHobbies([])
    //   setToggle(false)
    //   setLoading(false)
    // }

    // const upPost = async (url) => {
    //   const postId = generate()
    //   const post = await addDocument(
    //     'posts',
    //     {
    //       avatar: url,
    //       composing: '',
    //       name,
    //       uid,
    //       content: 'Update avatar',
    //       reacts: {
    //         like: [],
    //         heart: [],
    //       },
    //       comments: [],
    //       images: [url],
    //       mode: 'public',
    //       createAt: firebase.firestore.Timestamp.now(),
    //     },
    //     postId
    //   )
    //   //update post in redux store
    //   dispatch(Actions.addMyNewPost(post))
    // }

    if (!user) {
        setToggle(false)
        return <></>
    }

    
    return (
        <Box width="800px" p={1}>
            <Typography style={{ fontSize: 20, padding: 10 }} align="center">
                Edit Profile
            </Typography>
            <Divider style={{ marginBottom: 10 }} />
            <Box mb={2}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Title>Avatar</Title>
                    <input
                        accept="image/*"
                        type="file"
                        alt="image"
                        style={{ display: 'none' }}
                        id="input-image2"
                        // onChange={uploadAvatar}
                    />
                    <label htmlFor="input-image2">
                        <IconButton component="span">
                            <FontAwesomeIcon icon={faCamera} />
                        </IconButton>
                    </label>
                </Box>
                {/* <Avatar src={user.avatar} className={style.avatarInside} a3={name} /> */}
            </Box>
            <Box display="flex" flexDirection="column" alignItems="flex-start" mb={2}>
                <Title>Name</Title>
                <TextField inputRef={nameInput} placeholder={user.username} />
            </Box>
            <Box display="flex" flexDirection="column" alignItems="flex-start" mb={2}>
                <Title>Education</Title>
                <TextField
                    inputRef={educationInput}
                    // placeholder={}
                />
            </Box>
            <Box mb={2}>
                <Title>Hobbies</Title>
                <Hobbies>
                    <AccordionSummary
                        expandIcon={<FontAwesomeIcon icon={faArrowDown} size="xs" />}
                    >
                        <Typography>Add more hobbies</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        {options.map((option, index) => (
                            <FormControlLabel
                                key={index}
                                control={
                                    <Checkbox
                                        color="primary"
                                        checked={
                                            hobbies?.find(
                                                (hobby) => hobby === option.value
                                            )
                                                ? true
                                                : false
                                        }
                                    />
                                }
                                label={option.label}
                                value={option.value}
                                // onChange={addHobbies}
                            />
                        ))}
                    </AccordionDetails>
                </Hobbies>
            </Box>
            <Button
                // onClick={saveProfile}
                color="primary"
                variant="contained"
                disabled={loading}
            >
                Save
            </Button>
        </Box>
    )
}