import React, { Dispatch, SetStateAction, useState } from 'react'
import Select from 'react-select'
import { makeStyles } from '@mui/styles'
import { IModePost } from 'models/post'

const css = makeStyles({
    wrapper: {
        width: '100%',
        padding: 2,
    },
})

export interface IPostModeSelect {
    value: IModePost
    label: string
}
export const useInitMode = () =>
    useState<IPostModeSelect>({
        value: 'public',
        label: '🌏 public',
    })

export const modeOptions: IPostModeSelect[] = [
    { value: 'public', label: '🌏 public (Anyone)' },
    { value: 'friend', label: '👨‍👧‍👧 friend (Your friend and you)' },
    { value: 'private', label: '🔒 private (Only you)' },
]

interface ISelectMode {
    mode: IPostModeSelect
    setMode: Dispatch<SetStateAction<IPostModeSelect>>
}

export default function SelectMode({ mode, setMode }: ISelectMode) {
    const style = css()

    return (
        <Select
            className={style.wrapper}
            value={mode}
            onChange={(value) => setMode(value as IPostModeSelect)}
            options={modeOptions}
        />
    )
}
