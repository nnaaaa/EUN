import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { SocketProvider } from 'states/context/socket'
import { store } from 'states/store'
import App from './App'
import * as serviceWorker from './serviceWorker'
ReactDOM.render(
    <SocketProvider>
        <Provider store={store}>
            <App />
        </Provider>
    </SocketProvider>,
    document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
