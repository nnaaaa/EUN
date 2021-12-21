import {
    faFileImage,
    faPaperPlane,
    faPlusCircle,
    faTimes
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { CircularProgress, InputLabel, Stack } from '@mui/material'
import { chatAPI } from 'api/rest'
import InputImage from 'components/images/input'
import { useContent } from 'hooks/useContent'
import { IChatRoom } from 'models/chatRoom'
import { FormEvent, useRef, useState } from 'react'
import { IconBox } from '../chatStyles'
import { useBlockingSpam } from '../../messageHooks'
import { MessageInput } from './footerStyles'
import PreviewImage from 'components/images/output'
import { IMessage } from 'models/message'

interface IProps {
    room: IChatRoom
}

function Footer({ room }: IProps) {
    const inputMessageRef = useRef<null | HTMLInputElement>(null)
    const {
        previewImages,
        content,
        getContentAndImages,
        setContent,
        inputImages,
        clearImages,
    } = useContent<IMessage>(inputMessageRef)
    const { isAllowChat, timeToAllowChat, setCountCurSpam } = useBlockingSpam(10000,20)
    const [isSending,setIsSending] = useState<boolean>(false)


    const sendMessageWithBlockingSpam = async (
        e: FormEvent<HTMLFormElement>
    ) => {
        try {   
            e.preventDefault()
            if (!isAllowChat || isSending) return
            setCountCurSpam()
            setIsSending(true)
            const message = await getContentAndImages()
            if (message) 
                await chatAPI.sendMessage(message, room._id)
            setIsSending(false)
        }
        catch (e) {
            console.log(e)
        }
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
                    bgcolor="#b4b4b47f"
                    alignItems="center"
                >
                    <IconBox
                        onClick={clearImages}
                        sx={{ position: 'absolute', top: 0, right: '5px' }}
                    >
                        <FontAwesomeIcon icon={faTimes} />
                    </IconBox>
                    <PreviewImage images={previewImages} width='80%' height='100%'/>
                </Stack>
            )}
        </Stack>
    )
}

export default Footer
