import { makeStyles } from '@mui/styles'
import { styled as styledMUI } from '@mui/system'
import styled from 'styled-components'

const Message = styled.span`
    max-width: 80%;
    border-radius: 10px;
    margin-top: 0;
    margin-bottom: 20px;
`
const Emoji = styled.div`
    z-index: 100;
    position: absolute;
    bottom: -10px;
    transform: translateY(30%);
    border-radius: 50px;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.397);
    background-color: white;
`

export const FriendMessageWrap = styledMUI(Message)(({ theme }) => ({
    display: 'flex',
    marginRight: 'auto',
}))

export const FriendMessage = styledMUI('div')(({ theme }) => ({
    position: 'relative',
    backgroundColor: theme.palette.action.disabledBackground,
    maxWidth: '90%',
    borderRadius: '10px',
    marginTop: 0,
}))

export const FriendEmoji = styledMUI(Emoji)(({ theme }) => ({
    left: '55%',
}))

export const MyMessageWrap = styledMUI(Message)(({ theme }) => ({
    display: 'flex',
    marginLeft: 'auto',
}))

export const MyMessage = styledMUI('div')(({ theme }) => ({
    position: 'relative',
    maxWidth: '90%',
    borderRadius: '10px',
    marginTop: 0,
    backgroundColor: theme.palette.primary.main,
    // color: '#fff',
}))

export const MyEmoji = styledMUI(Emoji)(({ theme }) => ({
    right: '5%',
}))

export const TextContent = styled.p`
    display: block;
    margin: 0;
    word-break: break-word;
    font-size: 14px;
    padding: 0.5rem 0.6rem;
`
