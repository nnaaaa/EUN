import React, { ReactNode } from 'react'
import { Opacity, Wrapper } from './popupStyles'

interface IProps {
    open: boolean
    onClose: () => void
}

const Popup: React.FC<IProps> = (props) => {
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
