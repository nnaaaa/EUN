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
        width:8px;
    }
    ::-webkit-scrollbar-track{
        width:12px;
    }
    ::-webkit-scrollbar-thumb{
        width:7px;
        border-radius: 10px;
        background:gray;
    }
    ::-webkit-scrollbar-thumb:hover {
        background:#EA63FD;
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

// export const linearBackground = `linear-gradient(to right bottom,
//     rgba(24, 1, 86,0.4),
//     rgba(84, 0, 218,0.4),
//     rgba(122, 39, 244,0.4),
//     rgba(236, 58, 245,0.4),
//     rgba(93, 214, 245,0.4))`

export default globalStyles
