import {
    faFileImage,
    faPaperPlane,
    faPlusCircle,
    faTimes
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { CircularProgress, InputLabel, Stack } from '@mui/material'
import InputImage from 'features/images/input'
import { IChatRoom } from 'models/chatRoom'
import { FormEvent, useRef } from 'react'
import { IconBox } from '../chatStyles'
import { useBlockingSpam, useSendMessage } from './footerHook'
import { MessageInput } from './footerStyles'
import PreviewImage from './previewImage'

interface IProps {
    room: IChatRoom
}

function Footer({ room }: IProps) {
    const inputMessageRef = useRef<null | HTMLInputElement>(null)
    const {
        previewImages,
        content,
        isSending,
        sendMessage,
        setContent,
        inputImages,
        clearImages,
    } = useSendMessage(room, inputMessageRef)
    const { isAllowChat, timeToAllowChat, setCountCurSpam } = useBlockingSpam(10000,20)

    const sendMessageWithBlockingSpam = async (
        e: FormEvent<HTMLFormElement>
    ) => {
        if (!isAllowChat || isSending) return
        setCountCurSpam()
        await sendMessage(e)
    }

    return (
        <Stack
            p={1}
            justifyContent="space-between"
            alignItems="center"
            direction="row"
            position="relative"
        >
            <IconBox>
                <FontAwesomeIcon icon={faPlusCircle} />
            </IconBox>

            <InputLabel htmlFor="chat-images" sx={{color:'primary.main',cursor:'pointer'}}>
                <InputImage onChange={inputImages} id="chat-images" />
                <FontAwesomeIcon icon={faFileImage} />
            </InputLabel>

            <form onSubmit={sendMessageWithBlockingSpam}>
                <MessageInput
                    ref={inputMessageRef}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    type="text"
                    // onFocus={focus}
                    // onBlur={blur}
                />
            </form>

            
            <IconBox
                color="primary"
                disabled={!isAllowChat || isSending}
                onClick={sendMessageWithBlockingSpam}
            >
                {isAllowChat && !isSending ? (
                    <FontAwesomeIcon icon={faPaperPlane} />
                ) : (
                    <CircularProgress
                        value={timeToAllowChat}
                        variant="determinate"
                        size={20}
                    />
                )}
            </IconBox>

            {previewImages && (
                <Stack
                    position="absolute"
                    left={0}
                    bottom="100%"
                    right={0}
                    bgcolor="white"
                    alignItems="center"
                >
                    <IconBox
                        onClick={clearImages}
                        sx={{ position: 'absolute', top: 0, right: '5px' }}
                    >
                        <FontAwesomeIcon icon={faTimes} />
                    </IconBox>
                    <PreviewImage images={previewImages} />
                </Stack>
            )}
        </Stack>
    )
}

export default Footer
