import { createTheme } from '@mui/material';
import {
    createGlobalStyle
} from 'styled-components'
import {
    pink,blue
} from '@mui/material/colors'

const globalStyles = createGlobalStyle `
    html{
        font-family:'VT323';
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
        background:#f06292;
    }
`

export const theme = createTheme({
    palette: {
        primary: {
            main: pink[300],
        },
        secondary: {
            main: blue[300],
        },
    },
})

export default globalStyles