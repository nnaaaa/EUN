import React, {Dispatch, SetStateAction, useRef, useState} from 'react'
import {IconButton, Box, Button, Typography, Divider, Avatar} from '@mui/material'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faImages} from '@fortawesome/free-solid-svg-icons'
import {StatusInput,useStyle} from './styles'
import { IPublicInfo } from 'models/user'
import Select, { IPostModeSelect } from '../selectMode/index'
import Popup from 'components/popup'
import { useAppDispatch } from 'states/hooks'
import { useContent } from 'hooks/useContent'
import InputImages from 'components/images/input'
import { IPost } from 'models/post'
import PreviewImage from 'components/images/output'
import { postAPI } from 'api/rest/index'


interface IModelProps{
  isPopup:boolean
  setPopup:Dispatch<SetStateAction<boolean>>
  user:Partial<IPublicInfo>
}

export default function Model(props: IModelProps) {
  const style = useStyle()
  const dispatch = useAppDispatch()
  const inputContentRef = useRef<null | HTMLInputElement>(null)
  const {user, isPopup, setPopup} = props
  const {
    previewImages,
    content,
    getContentAndImages,
    setContent,
    inputImages,
    clearImages
  } = useContent<IPost>(inputContentRef)
  const [isSending,setIsSending] = useState<boolean>(false)
  const [mode, setMode] = useState<IPostModeSelect>({value: 'public', label: '🌏 public'})
  const upPost = async () => {
    try {

      setIsSending(true)
      const contentAndImages = await getContentAndImages()
      if (contentAndImages) {
        const post: Partial<IPost> = {
          ...contentAndImages,
          mode:mode.value
        }
        await postAPI.create(post)
      }
      setIsSending(false)
      closePopup()
    }
    catch (e) {
      console.log(e)
    }
  }
  const closePopup = () => {
    setPopup(false)
    clearImages()
    setContent('')
  }

  return (
    <Popup open={isPopup} onClose={closePopup}>
      <Box className={style.wrapper}>
        <Box p={1} height="25%">
          <Typography className={style.title}>
            Create Post
          </Typography>
          <Divider sx={{marginBottom: 1}} />
          <Box display="flex" alignItems="center" mb={2}>
            <Avatar src={user.avatar} />
            <Box width="50%" mx={1}>
              <Typography className={style.name} noWrap>{user.username}</Typography>
              <Select mode={mode} setMode={setMode} />
            </Box>
          </Box>
        </Box>
        <Box className={style.inputPosition}>
          <StatusInput
            placeholder="What's on your mind"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <PreviewImage
            images={previewImages}
            slidesToShow={1}
            slidesToScroll={1}
            adaptiveHeight
            infinite
            dots
          />
        </Box>
        <Box p={1} height="20%">
          <Box className={style.toolBar}>
            <Typography>Add to your post</Typography>
            <Box>
              <InputImages onChange={inputImages} id="post-images" />
              <label htmlFor="post-images">
                <IconButton component="span">
                  <FontAwesomeIcon icon={faImages} color="#41B35D" />
                </IconButton>
              </label>
            </Box>
          </Box>
          <Button
            fullWidth
            color="primary"
            variant="contained"
            onClick={upPost}
            disabled={isSending}
          >
            <Typography variant="h6" fontSize={16}>Post</Typography>
          </Button>
        </Box>
      </Box>
    </Popup>
  )
}
