import styled, { keyframes } from 'styled-components'

export const WrapperMessage = styled.div`
    position: relative;
    padding: 0.5rem 0.5rem;
    overflow-y: auto;
    height: 300px;
    display: flex;
    flex-direction: column-reverse;
    justify-content: flex-start;
`
const Composing = styled.div`
    width: 2.5rem;
    background: #d8dadf;
    display: flex;
    justify-content: space-between;
    border-radius: 10px;
    margin-bottom: 5px;
    padding: 0.7rem 0.6rem;
`

const bubble = keyframes`
    0%{transform:translateY(0)}
    40%{transform:translateY(-2px)}
    60%{transform:translateY(2px)}
    100%{transform:translateY(0)}
`
const DotBubble = styled.div`
    width: 5px;
    height: 5px;
    background: #7a7979;
    border-radius: 50%;
`
const DotBubble1 = styled(DotBubble)`
    animation: ${bubble} 1s 0.4s infinite;
`
const DotBubble2 = styled(DotBubble)`
    animation: ${bubble} 1s 0.5s infinite;
`
const DotBubble3 = styled(DotBubble)`
    animation: ${bubble} 1s 0.6s infinite;
`

export const FriendComposing = () => (
    <Composing>
        <DotBubble1 />
        <DotBubble2 />
        <DotBubble3 />
    </Composing>
)
