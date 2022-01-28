import {
    faFileImage,
    faPaperPlane,
    faPlusCircle,
    faTimes,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { CircularProgress, Stack } from '@mui/material'
import { chatAPI } from 'api/rest'
import InputImage from 'components/images/input'
import PreviewImage from 'components/images/output'
import { useBlockingSpam } from 'hooks/useBlockingSpam'
import { useContent } from 'hooks/useContent'
import { IChatRoom } from 'models/chatRoom'
import { IMessage } from 'models/message'
import { FormEvent, useRef, useState } from 'react'
import { IconBox } from '../chatStyles'
import { MessageInput } from './footerStyles'

interface IProps {
    room: IChatRoom
    onFocus: () => void
    onBlur: () => void
}

function Footer({ room, onFocus, onBlur }: IProps) {
    const inputMessageRef = useRef<null | HTMLInputElement>(null)
    const {
        previewImages,
        content,
        getContentAndImages,
        setContent,
        inputImages,
        clearImages,
    } = useContent<IMessage>(inputMessageRef)
    const { isAllow, timeToAllow, setCountCurSpam } = useBlockingSpam(10000, 20)
    const [isSending, setIsSending] = useState<boolean>(false)

    const sendMessageWithBlockingSpam = async (e: FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault()
            if (!isAllow || isSending) return
            setCountCurSpam()
            setIsSending(true)
            const message = getContentAndImages()
            if (message) await chatAPI.sendMessage(message, room._id)
            setIsSending(false)
        } catch (e) {
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

            <InputImage onChange={inputImages}>
                <FontAwesomeIcon icon={faFileImage} />
            </InputImage>

            <form onSubmit={sendMessageWithBlockingSpam}>
                <MessageInput
                    ref={inputMessageRef}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    type="text"
                    onFocus={onFocus}
                    onBlur={onBlur}
                />
            </form>

            <IconBox
                color="primary"
                disabled={!isAllow || isSending}
                onClick={sendMessageWithBlockingSpam}
            >
                {isAllow && !isSending ? (
                    <FontAwesomeIcon icon={faPaperPlane} />
                ) : (
                    <CircularProgress
                        value={timeToAllow}
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
                        sx={{ position: 'absolute', top: 0, right: 1 }}
                    >
                        <FontAwesomeIcon icon={faTimes} />
                    </IconBox>
                    <PreviewImage images={previewImages} width="80%" height="100%" />
                </Stack>
            )}
        </Stack>
    )
}

export default Footer
