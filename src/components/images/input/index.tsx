import { ChangeEvent } from "react"

interface IProps{
    id:string
    onChange: (e:ChangeEvent<HTMLInputElement>)=>void
}

function InputImage({ onChange,id }: IProps) {
    return (
        <input
            accept="image/*"
            multiple
            type="file"
            alt="image"
            style={{ display: 'none' }}
            id={id}
            onChange={onChange}
        />
    )
}

export default InputImage
