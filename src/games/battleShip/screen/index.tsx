import { Component } from "react";

export interface IScreenProps{
    changeScreen: (screen:typeof Screen)=>void
}

abstract class Screen extends Component<IScreenProps>{
    
    constructor(props:IScreenProps) {
        super(props)
    }
}

export default Screen