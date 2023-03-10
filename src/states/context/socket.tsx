import { SERVER_SOCKET } from 'config/keys'
import { createContext, ReactNode, useMemo } from 'react'
import { io, Socket } from 'socket.io-client'

interface ISocketContext {
    socket: Socket | null
}

export const SocketContext = createContext<ISocketContext>({
    socket: null,
})

export const SocketProvider = ({ children }: { children: ReactNode }) => {
    const socket = useMemo(() => io(SERVER_SOCKET), [])
    return <SocketContext.Provider value={{ socket }}>{children}</SocketContext.Provider>
}
