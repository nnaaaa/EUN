import { IMessage } from 'models/message'
import { useRef, useState } from 'react'

const useScroll = (messages: IMessage[]) => {
    const infiniteScrollRef = useRef<HTMLDivElement | null>()
    const [isDisplayScrollButton, setIsDisplayScrollButton] = useState(false)
    const scrollToBottom = () => {
        if (!infiniteScrollRef) return
        if (!infiniteScrollRef.current) return
        ;(infiniteScrollRef.current as any).el.scrollTop = 0
    }
    const onScroll = (e: MouseEvent) => {
        if (!e.target) return
        if ((e.target as any).scrollTop <= -600) setIsDisplayScrollButton(true)
        else if ((e.target as any).scrollTop === 0) setIsDisplayScrollButton(false)
    }
    return { onScroll, scrollToBottom, isDisplayScrollButton, infiniteScrollRef }
}

export default useScroll
