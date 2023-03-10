import { createTheme } from '@mui/material'
import { createGlobalStyle } from 'styled-components'

const globalStyles = createGlobalStyle`
    html{
        font-family:'Fira Code';
    }
    *{
        box-sizing: border-box;
    }
    a{
        text-decoration:none;
    }
    img{
        width:100%;
        display:inline-block;
    }
    input{
        outline:none;
        border:none;
    }
    form{
        margin:0;
    }
    ::-webkit-scrollbar{
        width:10px;
    }
    ::-webkit-scrollbar-track{
        width:12px;
    }
    ::-webkit-scrollbar-thumb{
        width:10px;
        border-radius: 10px;
        background:gray;
    }
    ::-webkit-scrollbar-thumb:hover {
        background:#1876D1;
    }
`

export const theme = createTheme({
    palette: {
        // primary: {
        //     main: 'rgba(236, 58, 245,0.7)',
        // },
        // secondary: {
        //     main: '#5CD6F5',
        // },
    },
})

export const Color = {
    PRIMARY: "primary.main",
    CARD_BACKGROUND: 'background.paper',
    FOCUS_CARD_BACKGROUND: 'action.disabledBackground',
    TEXT_PRIMARY_COLOR: 'text.primary',
}

export default globalStyles
