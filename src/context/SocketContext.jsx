import React, { createContext, useContext, useEffect, useState } from 'react'
import { io } from 'socket.io-client';

const socketContext = createContext()

export const useSocketContext = () => {
    return useContext(socketContext)
}

export const SocketContext = ({ children }) => {

    const [socket, setSocket] = useState(null)
    const [onlineUsers, setOnlineUsers] = useState([])
    const [userId, setUserId] = useState(null)

    useEffect(() => {
        const storedUserId = sessionStorage.getItem('_id');
        if (storedUserId) {
            setUserId(storedUserId);  // Set userId to state
        }
    }, []);

    useEffect(() => {
        const userId = sessionStorage.getItem('_id');
        console.log(userId);

        if (userId) {
            const newSocket = io("http://localhost:3000", {
                query: {
                    userId
                }
            })

            setSocket(newSocket)

            newSocket.on("getOnlineUsers", (users) => {
                console.log("Online Users Updated in Context:", users); // Debugging
                setOnlineUsers(users)
            })

            return () => {
                newSocket.close();
                console.log("Socket connection closed");
            };
        }
        else {
            if (socket) socket.close()
            setSocket(null)

        }
    }, [userId])

    return <socketContext.Provider value={{ socket, onlineUsers }}>{children}</socketContext.Provider>
}
