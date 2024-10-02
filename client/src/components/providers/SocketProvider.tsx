import { createContext, useContext, useEffect, useState } from "react";
import { io as ClientIo } from 'socket.io-client';

type SocketContextType = {
    isConnected: boolean;
    socket: any | null;
}

const SocketContext = createContext<SocketContextType>({
    socket: null,
    isConnected: false,
});

export const useSocket = () => {
    return useContext(SocketContext);
}

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
    const [socket, setSocket] = useState(null);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        const socketInstance = ClientIo('http://localhost:8080');

        socketInstance.on("connect", () => {
            setIsConnected(true);
            console.log("Connected to socket");
        });

        socketInstance.on("disconnect", () => {
            setIsConnected(false);
            console.log("Disconnected from socket");
        });

        setSocket(socketInstance as any);

        return () => {
            socketInstance.disconnect();
        };
    }, []);

    return (
        <SocketContext.Provider value={{ socket, isConnected }}>
            {children}
        </SocketContext.Provider>
    );
}
