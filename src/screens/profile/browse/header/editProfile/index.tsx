import { faArrowDown, faCamera, faPen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    AccordionDetails,
    AccordionSummary,
    Avatar,
    Box,
    Button,
    Checkbox,
    Divider,
    FormControlLabel,
    TextField,
    Typography,
} from '@mui/material'
import { userAPI } from 'api/rest'
import InputSingleImage from 'components/images/singleInput'
import Popup from 'components/popup'
import { IPublicInfo } from 'models/user'
import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from 'states/hooks'
import { userActions } from 'states/slices/userSlice'
import { hobbieOptions, useEditProfile } from './editProfileHook'
import { Hobbies, Title, useStyle } from './styles'

export default function EditProfile() {
    const dispatch = useAppDispatch()
    const style = useStyle()
    const {
        getContent,
        previewImage,
        inputAvatar,
        nameValue,
        setName,
        hobbies,
        educationValue,
        setEducation,
        changeHobbies,
        setPreviewImage,
        clearAll,
    } = useEditProfile()
    const [isLoading, setIsLoading] = useState(false)

    const [isToggle, setIsToggle] = useState(false)
    const user = useAppSelector((state) => state.user.current)

    useEffect(() => {
        if (!user) return
        setName(user.username)
        setEducation(user.education)
        setPreviewImage(user.avatar)
    }, [user, isToggle])

    const saveProfile = async () => {
        try {
            setIsLoading(true)
            const content = getContent()
            const user = await userAPI.updateProfile(content)
            dispatch(userActions.updateStore(user.data as any))
        } catch (e) {
            console.error(e)
        } finally {
            setIsLoading(false)
            closePopup()
        }
    }
    const closePopup = () => {
        setIsToggle(false)
        clearAll()
    }

    if (!user) {
        closePopup()
        return <></>
    }

    return (
        <Box>
            <Button
                startIcon={<FontAwesomeIcon icon={faPen} size="xs" />}
                variant="contained"
                onClick={() => setIsToggle(true)}
            >
                <Typography className={style.item}>Edit Profile</Typography>
            </Button>
            <Popup open={isToggle} onClose={closePopup}>
                <Box p={2}>
                    <Typography style={{ fontSize: 20, padding: 10 }} align="center">
                        Edit Profile
                    </Typography>
                    <Divider style={{ marginBottom: 10 }} />
                    <Box mb={2}>
                        <Box
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            <Title>Avatar</Title>
                            <InputSingleImage onChange={inputAvatar}>
                                <FontAwesomeIcon icon={faCamera} size="lg" />
                            </InputSingleImage>
                        </Box>
                        <InputSingleImage onChange={inputAvatar}>
                            <Avatar src={previewImage} className={style.avatarInside} />
                        </InputSingleImage>
                    </Box>
                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="flex-start"
                        mb={2}
                    >
                        <Title>Name</Title>
                        <TextField
                            variant="standard"
                            value={nameValue}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Box>
                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="flex-start"
                        mb={2}
                    >
                        <Title>Education</Title>
                        <TextField
                            variant="standard"
                            value={educationValue}
                            onChange={(e) => setEducation(e.target.value)}
                        />
                    </Box>
                    <Box mb={2}>
                        <Title>Hobbies</Title>
                        <Hobbies>
                            <AccordionSummary
                                expandIcon={
                                    <FontAwesomeIcon icon={faArrowDown} size="xs" />
                                }
                            >
                                <Typography>Add more hobbies</Typography>
                            </AccordionSummary>
                            <AccordionDetails
                                sx={{ display: 'flex', justifyContent: 'flex-start' }}
                            >
                                {hobbieOptions.map((option, index) => (
                                    <FormControlLabel
                                        key={index}
                                        control={
                                            <Checkbox
                                                color="primary"
                                                checked={
                                                    hobbies.find(
                                                        (hobby) => hobby === option.value
                                                    )
                                                        ? true
                                                        : false
                                                }
                                            />
                                        }
                                        label={option.label}
                                        value={option.value}
                                        onChange={(e, checked) =>
                                            changeHobbies(option.value, checked)
                                        }
                                    />
                                ))}
                            </AccordionDetails>
                        </Hobbies>
                    </Box>
                    <Button
                        onClick={saveProfile}
                        color="primary"
                        variant="contained"
                        disabled={isLoading}
                    >
                        Save
                    </Button>
                </Box>
            </Popup>
        </Box>
    )
}

// useEffect(() => {
//   setHobbies(info?.hobbies ? info.hobbies : [])
// }, [info])

// const uploadAvatar = (e) => {
//   setAvatarFile(e.target.files[0])
//   setPreviewAvatar(URL.createObjectURL(e.target.files[0]))
// }

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
