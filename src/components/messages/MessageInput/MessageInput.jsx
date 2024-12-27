import React, { useContext, useEffect, useState } from 'react'
import './MessageInput.css'
import { messageContainerContext } from '../../../context/ContextApi'
import { sendMessageApi } from '../../../services/allApis'

function MessageInput({ response }) {

    const [messages, setMessages] = useState({
        text: "", receiverId: "", senderId: sessionStorage.getItem('_id')
    })
    const [loading, setLoading] = useState(false); // loading-spinner

    const { state, setState } = useContext(messageContainerContext) // messageContainerContext

    useEffect(() => {
        setMessages(e => ({
            ...e, receiverId: state.id
        }))
    }, [state.id])

    // handleMessages
    const handleMessages = async () => {
        if (loading || !messages.text.trim()) return;
        setLoading(true);
        const { text, receiverId, senderId } = messages;
        const data = { text, receiverId, senderId };

        try {
            const header = {
                "Content-Type": "application/json",
                "Authorization": `Token ${sessionStorage.getItem('token')}`
            }
            const res = await sendMessageApi(receiverId, header, data);
            console.log(res);

            setMessages((e) => ({
                ...e,
                text: ""
            }));

            setState((prev) => ({
                ...prev,
                newMessage: {
                    text,
                    receiverId,
                    senderId,
                    createdAt: new Date().toISOString(),
                },
            }));

            if (response.current) {
                response.current.scrollIntoView({ behavior: 'smooth' });
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };


    return (
        <>
            <div className='input-container'>
                <input onChange={e => setMessages({ ...messages, text: e.target.value })} value={messages.text} type="text" placeholder='Type a message...' className='messageinp' />
                <button className='btn message-btn' onClick={handleMessages} disabled={loading}>
                    {loading ? (
                        <i className="fa-solid fa-spinner fa-spin send-icon" /> // Spinner-icon
                    ) : (
                        <i className="fa-solid fa-paper-plane send-icon" /> // Default-send-icon
                    )}
                </button>
            </div>
        </>
    )
}

export default MessageInput