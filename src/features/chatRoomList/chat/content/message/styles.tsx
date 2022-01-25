import { makeStyles } from '@mui/styles'
import { styled as styledMUI } from '@mui/system'
import styled from 'styled-components'

export const useStyle = makeStyles({
    previewUrl: {
        color: 'red',
        '&.LowerContainer.Title': {
            fontSize: 16,
            color: 'blue',
        },
    },
})

const Message = styled.span`
    max-width: 80%;
    border-radius: 10px;
    margin-top: 0;
    margin-bottom: 5px;
`
export const FriendMessage = styledMUI(Message)(({ theme }) => ({
    backgroundColor: '#D8DADF',
    marginRight: 'auto',
}))
export const MyMessageWrap = styledMUI(Message)(({ theme }) => ({
    display: 'flex',
    marginLeft: 'auto',
}))

export const MyMessage = styledMUI('div')(({ theme }) => ({
    maxWidth: '90%',
    borderRadius: '10px',
    marginTop: 0,
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
}))

export const TextContent = styled.p`
    display: block;
    margin: 0;
    word-break: break-word;
    font-size: 14px;
    padding: 0.5rem 0.6rem;
`
