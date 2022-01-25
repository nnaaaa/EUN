import { useRef, useState } from 'react'

const useToggle = () => {
    const [isHover, setIsHover] = useState(false)
    const toggleBtnRef = useRef(null)
    const [isToggle, setIsToggle] = useState(false)

    return { isHover, setIsHover, toggleBtnRef, isToggle, setIsToggle }
}

export default useToggle
