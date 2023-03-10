import React, { ChangeEvent, RefObject, useState } from 'react'
import { useContent } from 'hooks/useContent'

interface IHobbie {
    value: string
    label: string
}

export const hobbieOptions: IHobbie[] = [
    { value: 'code', label: '💻 Code' },
    { value: 'game', label: '🎮 Play game' },
    { value: 'coffee', label: '🥤 Drink Coffee' },
]

export const useEditProfile = () => {
    const [nameValue, setName] = useState<string>('')
    const [educationValue, setEducation] = useState<string>('')
    const [imageFile, setImageFile] = useState<File | undefined>()
    const [previewImage, setPreviewImage] = useState<string | undefined>()
    const [hobbies, setHobbies] = useState<string[]>([])

    const inputAvatar = async (e: ChangeEvent<HTMLInputElement>) => {
        try {
            if (!e.target.files) return
            const url = URL.createObjectURL(e.target.files[0])
            setImageFile(e.target.files[0])
            setPreviewImage(url)
        } catch (e) {
            console.error(e)
        }
    }

    const changeHobbies = (value: string, checked: boolean) => {
        const newHobbies = [...hobbies, value]
        if (checked) setHobbies(newHobbies)
        else setHobbies(newHobbies.filter((hobby) => hobby !== value))
    }

    const clearImages = () => {
        setImageFile(undefined)
        setPreviewImage(undefined)
    }
    const clearAll = () => {
        clearImages()
        setName('')
        setEducation('')
        setHobbies([])
    }

    const getContent = () => {
        const content: any = {
            username: nameValue,
            education: educationValue,
            hobbies,
            avatar: imageFile,
        }
        clearAll()
        return content
    }

    return {
        clearAll,
        getContent,
        nameValue,
        setName,
        inputAvatar,
        hobbies,
        educationValue,
        setEducation,
        changeHobbies,
        previewImage,
        setPreviewImage,
    }
}
