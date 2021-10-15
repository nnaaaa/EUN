import { IPost } from 'models/post'
import React, { ReactNode } from 'react'
import { Opacity, Wrapper } from './popupStyles'

interface IProps {
    open: boolean
    children: ReactNode
    onClose: () => void
}

const Popup = (props: IProps) => {
    const { open, children, onClose } = props
    return open ? (
        <Opacity onClick={onClose}>
            <Wrapper
                borderRadius={3}
                boxShadow={6}
                bgcolor="white"
                display="block"
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </Wrapper>
        </Opacity>
    ) : (
        <></>
    )
}

export default Popup
