import React, { createContext, useContext, useEffect, useState } from 'react'
import { io } from 'socket.io-client';

const socketContext = createContext()

export const useSocketContext = () => {
    return useContext(socketContext)
}

export const SocketContext = ({ children }) => {

    const [socket, setSocket] = useState(null)
    const [onlineUsers, setOnlineUsers] = useState([]) // onlineUsers
    const [userId, setUserId] = useState(sessionStorage.getItem("_id"));

    useEffect(() => {
        if (userId) {
            const socket = io("http://localhost:3000", {
                query: {
                    userId
                }
            })

            setSocket(socket)

            // onlineUsers
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

    // login
    const handleLoginSubmit = (newUserId) => {
        sessionStorage.setItem("_id", newUserId);
        setUserId(newUserId);
        if (socket) {
            socket.emit("userLoggedIn", newUserId)
        }

    };

    // logout
    const handleLogout = () => {
        sessionStorage.clear();
        setUserId(null);
    };

    return <socketContext.Provider value={{ socket, onlineUsers, handleLoginSubmit, handleLogout }}>{children}</socketContext.Provider>
}
