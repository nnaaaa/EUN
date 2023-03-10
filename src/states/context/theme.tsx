import { createContext, ReactNode, useMemo, useState } from 'react'
import { createTheme, Theme } from '@mui/material';

type ThemeMode = 'dark' | 'light'

interface IThemeContext {
    toggleColorMode: () => void,
    mode: ThemeMode,
    theme: Theme
}

export const ThemeContext = createContext<IThemeContext>({
    toggleColorMode: () => { },
    mode: 'light',
    theme: createTheme()
})

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [mode, setMode] = useState<ThemeMode>('light')

    const toggleColorMode = () => {
        setMode((mode) => (mode === 'dark' ? 'light' : 'dark'))
    }

    const theme = useMemo(()=>createTheme({
        palette: {
            // primary: {
            //     main: 'rgba(236, 58, 245,0.7)',
            // },
            // secondary: {
            //     main: '#5CD6F5',
            // },
            mode,
        },
    }), [mode])


    return <ThemeContext.Provider value={{ theme, toggleColorMode, mode }}>{children}</ThemeContext.Provider>
}
