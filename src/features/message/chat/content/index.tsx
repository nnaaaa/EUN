import { Tooltip } from '@mui/material'
import { IChatRoom } from 'models/chatRoom'
import { IUser } from 'models/user'
import moment from 'moment'
import React, { useEffect, useRef } from 'react'
import { useAppSelector } from 'states/hooks'
import {
    FriendComposing,
    FriendMessage,
    MyMessage,
    WrapperMessage,
} from './contentStyles'

function Content(props: IChatRoom) {
    const { messages, composing } = props
    const user = useAppSelector((state) => state.user.current)
    const heightOfChatWrapper = useRef<null | HTMLDivElement>(null)

    // //scroll xuống khi vừa mở khung chat hoặc có tin nhắn mới
    useEffect(() => {
        const chatRef = heightOfChatWrapper.current
        const scrolling = (e: React.UIEvent<HTMLElement>) => {
            e.currentTarget.scroll({
                top: e.currentTarget.scrollHeight,
                behavior: 'smooth',
            })
        }
        if (!chatRef) return
        //vừa mở khung chat -> scroll
        chatRef.scroll({
            top: chatRef?.scrollHeight,
            behavior: 'smooth',
        })

        //bắt sự kiện thêm 1 tin nhắn mới sẽ scroll
        // chatRef.addEventListener('DOMNodeInserted', scrolling)
        // return () => {
        //   chatRef.removeEventListener('DOMNodeInserted', scrolling)
        // }
    }, [])

    return (
        <WrapperMessage ref={heightOfChatWrapper}>
            {messages.map((msg) => {
                let time = moment(msg.createAt.getSeconds()).calendar()
                if ((msg.owner as IUser)._id !== user?._id) {
                    return (
                        <Tooltip title={time} placement="left" key={msg._id}>
                            <MyMessage>{msg.content}</MyMessage>
                        </Tooltip>
                    )
                }
                return (
                    <Tooltip title={time} placement="right" key={msg._id}>
                        <FriendMessage>{msg.content}</FriendMessage>
                    </Tooltip>
                )
            })}
            {composing.length > 0 && <FriendComposing />}
        </WrapperMessage>
    )
}

export default Content
