import React, {useRef, useState} from 'react'
import {IconButton, Box, Button, Typography, Divider, Avatar} from '@material-ui/core'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faImages} from '@fortawesome/free-solid-svg-icons'
import {StatusInput} from './styles'

import PreviewImages from '../previewImages/index'
import Select from '../selectMode/index'
import Popup from 'components/popup'
import {postStoreRef} from 'firebase/config'
import {addDocument, updateDocument} from 'firebase/api'
import firebase from 'firebase/config'
import Actions from 'states/rootAction'
import {useDispatch, useSelector} from 'react-redux'
import {uid as generateId} from 'uid'

import {options} from '../selectMode/index'

export default function Model(props) {
  console.log(props)
  const {id, images, content, mode, isPopup, setPopup, setToggleEdit} = props
  const {avatar, name} = useSelector((state) => state.user)
  const [previewImages, setPreviewImages] = useState([])
  const [imagesFile, setImagesFile] = useState([])
  const [uploading, setUploading] = useState(false)
  const [newMode, setMode] = useState(options.find((option) => option.value === mode))
  const inputRef = useRef()
  const upPost = async () => {
    setUploading(true)
    if (!imagesFile.length && !inputRef.current.value) return

    //upload post images to storage
    const urls = []
    for (const imageFile of imagesFile) {
      const ref = postStoreRef.child(`${id}/${imageFile.name}`)
      await ref.put(imageFile)
      const url = await ref.getDownloadURL()
      urls.push(url)
    }

    //upload post information to firestore
    await updateDocument('posts', id, {
      content: inputRef.current.value.trim(),
      images: urls,
      mode: newMode.value,
    })
    //update post in redux store
    setUploading(false)
    closePopup()
  }
  const closePopup = () => {
    clear()
    setToggleEdit(false)
    setPopup(false)
  }
  const uploadImages = (e) => {
    let images = []
    for (let i = 0; i < e.target.files.length; i++)
      images.push(URL.createObjectURL(e.target.files[i]))
    setImagesFile((pre) => [...pre, ...e.target.files])
    setPreviewImages((pre) => [...pre, ...images])
  }
  const clear = () => {
    setImagesFile([])
    setPreviewImages([])
  }
  return (
    <Popup open={isPopup} onClose={closePopup}>
      <Box
        width="400px"
        height="600px"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
      >
        <Box>
          <Typography style={{fontSize: 20, padding: 10}} align="center">
            Edit Post
          </Typography>
          <Divider style={{marginBottom: 10}} />
          <Box display="flex" alignItems="center" mb={2}>
            <Avatar src={avatar} />
            <Box>
              <Typography style={{marginLeft: 10, fontWeight: 'bold'}}>{name}</Typography>
              <Select mode={newMode} setMode={setMode} />
            </Box>
          </Box>
          <Box height="330px" overflow="auto">
            <StatusInput
              placeholder="What's on your mind"
              ref={inputRef}
              defaultValue={content}
            />
            <PreviewImages images={[...previewImages, ...images]} />
          </Box>
        </Box>
        <Box>
          <div
            style={{
              border: '1px solid #dad6d6',
              borderRadius: 10,
              marginBottom: 10,
              padding: '10px 15px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography>Add to your post</Typography>
            <Box>
              <input
                accept="image/*"
                multiple
                type="file"
                alt="image"
                style={{display: 'none'}}
                id="input-image3"
                onChange={uploadImages}
              />
              <label htmlFor="input-image3">
                <IconButton component="span">
                  <FontAwesomeIcon icon={faImages} color="#41B35D" />
                </IconButton>
              </label>
            </Box>
          </div>
          <Button
            fullWidth
            color="primary"
            variant="contained"
            onClick={upPost}
            disabled={uploading}
          >
            <Typography style={{fontWeight: 'bold'}}>Save</Typography>
          </Button>
        </Box>
      </Box>
    </Popup>
  )
}
