import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";

function inComingMessages(messages, setMessages) {

    const { socket } = useSocketContext();

    useEffect(() => {
        if (!socket) return;

        const handleNewMessage = (newMessage) => {
            setMessages((prevMessages) => [...prevMessages, newMessage]);
        };

        socket.on("newMessage", handleNewMessage);

        return () => {
            socket.off("newMessage", handleNewMessage);
        };
    }, [socket, setMessages]);
}

export default inComingMessages;