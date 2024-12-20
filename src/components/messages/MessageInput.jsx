import React, { useContext, useEffect, useState } from 'react'
import './MessageInput.css'
import { messageContainerContext } from '../../context/ContextApi'
import { sendMessageApi } from '../../services/allApis'

function MessageInput({ response }) {

    const { state, setState } = useContext(messageContainerContext)

    const [messages, setMessages] = useState({
        text: "", receiverId: "", senderId: sessionStorage.getItem('_id')
    })

    useEffect(() => {
        setMessages(e => ({
            ...e, receiverId: state.id
        }))
    }, [state.id])

    const handleMessages = async () => {
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
              }        } catch (err) {
            console.error(err);
        }
    };


    return (
        <>
            <div className='input-container'>
                <input onChange={e => setMessages({ ...messages, text: e.target.value })} value={messages.text} type="text" placeholder='Type a message...' className='messageinp' />
                <button className='btn message-btn' onClick={handleMessages}>
                    <i className="fa-solid fa-paper-plane send-icon" />
                </button>
            </div>
        </>
    )
}

export default MessageInput