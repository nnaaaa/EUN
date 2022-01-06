import { CONSTANTS } from 'games/battleShip/logics/constants'
import styled, { keyframes } from 'styled-components'

const ripple = keyframes`
    0% {
        transform:translate(-50%,-50%) scale(1);
        opacity: 0;
    }
    50%{
        opacity: 1;
    }
    100% {
        transform:translate(-50%,-50%) scale(1.5);
        opacity: 0;
    }
`
export const Dot = styled.div`
    position: absolute;
    width: 14;
    height: 14;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 2px solid ${(props) => (props.color ? props.color : 'white')};
    border-radius: 50%;
    display: none;
    animation: ${ripple} 1.2s infinite ease-in-out;
`
export const Inside = styled.div`
    position: absolute;
    width: 8;
    height: 8;
    top: 50%;
    left: 50%;
    display: none;

    transform: translate(-50%, -50%);
    background-color: ${(props) => (props.color ? props.color : 'white')};
    border-radius: 50%;
`
const DotComponent = ({ color }) => {
    return (
        <div
            style={{
                position: 'absolute',
                width: CONSTANTS.boardSize,
                height: CONSTANTS.boardSize,
            }}
        >
            <Dot color={color} />
            <Inside color={color} />
        </div>
    )
}

export default DotComponent
