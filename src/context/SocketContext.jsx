import React, { createContext, useContext, useEffect, useState } from 'react'
import { io } from 'socket.io-client';

const socketContext = createContext()

export const useSocketContext = () => {
    return useContext(socketContext)
}

export const SocketContext = ({ children }) => {

    const [socket, setSocket] = useState(null)
    const [onlineUsers, setOnlineUsers] = useState([])
    const [userId, setUserId] = useState(sessionStorage.getItem("_id"));

    useEffect(() => {
        // const userId = sessionStorage.getItem('_id');

        if (userId) {
            const socket = io("http://localhost:3000", {
                query: {
                    userId
                }
            })

            setSocket(socket)

            socket.on("getOnlineUsers", (users) => {
                setOnlineUsers(users)
            })

            return () => {
                socket.disconnect();
                setSocket(null);
            };
        }
        else {
            if (socket) {
                socket.disconnect();
                setSocket(null)
            }

        }
    }, [userId])


    const handleLoginSubmit = (newUserId) => {
        sessionStorage.setItem("_id", newUserId);
        setUserId(newUserId);
    };

    const handleLogout = () => {
        sessionStorage.clear();
        setUserId(null);
    };

    return <socketContext.Provider value={{ socket, onlineUsers, handleLoginSubmit, handleLogout }}>{children}</socketContext.Provider>
}
