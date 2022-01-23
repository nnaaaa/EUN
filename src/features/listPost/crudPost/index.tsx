import { faImages } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Avatar, Box, Button, Divider, Stack, Typography } from '@mui/material'
import InputImages from 'components/images/input'
import PreviewImage from 'components/images/output'
import Popup from 'components/popup'
import { useContent } from 'hooks/useContent'
import { IPost } from 'models/post'
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from 'states/hooks'
import Select, { useInitMode } from './selectMode/index'
import { StatusInput, useStyle } from './styles'
import { CRUDType } from './crudTool'

interface IModelProps {
    isPopup: boolean
    setPopup: Dispatch<SetStateAction<boolean>>
    type: CRUDType
}

export default function CRUDModel(props: IModelProps) {
    const style = useStyle()
    const dispatch = useAppDispatch()
    const inputContentRef = useRef<null | HTMLInputElement>(null)
    const { isPopup, setPopup, type } = props
    const user = useAppSelector((state) => state.user.current)
    const tool = useContent(inputContentRef)
    const { previewImages, content, setContent, inputImages, clearImages, clearAll } =
        tool
    const [isSending, setIsSending] = useState<boolean>(false)
    const [mode, setMode] = useInitMode()

    //khi giá trị useContent thay đổi thì type instance cũng thay đổi
    useEffect(() => {
        type.setTool(tool)
        type.setModeTool([mode, setMode])
        type.setRedux(dispatch)
    }, [type, tool, dispatch])

    //khởi tạo lại post cũ
    useEffect(() => {
        type.init()
    }, [type, isPopup])

    const upPost = async () => {
        try {
            setIsSending(true)
            await type.complete()
            setIsSending(false)
            closePopup()
        } catch (e) {
            console.log(e)
        }
    }
    const closePopup = () => {
        setPopup(false)
        clearAll()
    }

    if (!user) {
        closePopup()
        return <></>
    }

    return (
        <Popup open={isPopup} onClose={closePopup}>
            <Box className={style.wrapper}>
                <Box p={1} height="25%">
                    <Typography className={style.title}>{type.getTitle()}</Typography>
                    <Divider sx={{ marginBottom: 1 }} />
                    <Box display="flex" alignItems="center" mb={2}>
                        <Avatar src={user.avatar} />
                        <Box width="50%" mx={1}>
                            <Typography className={style.name} noWrap>
                                {user.username}
                            </Typography>
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
                <Stack p={1} height="20%" justifyContent="space-between">
                    <Box className={style.toolBar}>
                        <Typography>Add to your post</Typography>
                        <Box>
                            <InputImages onChange={inputImages}>
                                <FontAwesomeIcon icon={faImages} color="#41B35D" />
                            </InputImages>
                        </Box>
                    </Box>
                    <Button
                        fullWidth
                        color="primary"
                        variant="contained"
                        onClick={upPost}
                        disabled={isSending}
                    >
                        <Typography variant="h6" fontSize={16}>
                            {type.getCompletedTitle()}
                        </Typography>
                    </Button>
                </Stack>
            </Box>
        </Popup>
    )
}
