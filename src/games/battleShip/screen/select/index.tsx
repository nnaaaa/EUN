import { Component, useState } from 'react'
import SwipeableViews from 'react-swipeable-views'
import Screen, { IScreenProps } from '..'
import CreateRoom from './createRoom'
import HomeButton from './home'

const SelectFunc = ({ state }: { state: Select }) => {
    const [index,setIndex] = useState(0)

    return (
        <>
            <HomeButton setIndex={setIndex} />

            <SwipeableViews
                axis={'x'}
                index={index}
                onChangeIndex={(index: number) => setIndex(index)}
            >
                <CreateRoom changeScreen={state.props.changeScreen} />
                {/* <JoinRoom setState={setState} />
                <JoinWatch setState={setState} /> */}
            </SwipeableViews>
        </>
    )
}


class Select extends Screen {
    constructor(props:IScreenProps) {
        super(props)
    }

    render() {
        return <SelectFunc state={this}/>
    }
}



export default Select
