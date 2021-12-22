import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { InputLabel } from '@mui/material'
import { ChangeEvent, ReactNode } from 'react'
import { uid } from 'uid'
interface IProps {
    children: React.ReactChild
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

function InputImage({ onChange, children }: IProps) {
    const id = uid()
    return (
        <InputLabel
            htmlFor={id}
            sx={{ color: 'primary.main', cursor: 'pointer' }}
        >
            <input
                accept="image/*"
                multiple
                type="file"
                alt="image"
                style={{ display: 'none' }}
                id={id}
                onChange={onChange}
            />
            {children}
        </InputLabel>
        
    )
}

export default InputImage
