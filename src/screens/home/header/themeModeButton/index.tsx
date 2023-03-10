import { DarkMode, WbSunny } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { useContext } from 'react'
import { ThemeContext } from 'states/context/theme'

export function ThemeModeSwitch() {
    const { mode, toggleColorMode } = useContext(ThemeContext)

    return (
        <IconButton onClick={toggleColorMode}>
            {mode === 'dark' ? <DarkMode /> : <WbSunny />}
        </IconButton>
    )
}