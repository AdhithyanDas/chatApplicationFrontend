import React, { useContext, useEffect, useState } from 'react'
import './MessageInput.css'
import { messageContainerContext } from '../../context/ContextApi'
import { sendMessageApi } from '../../services/allApis'

function MessageInput() {

    const { state } = useContext(messageContainerContext)

    const [message, setMessage] = useState({
        text: "", receiverId: "", senderId: sessionStorage.getItem('_id'), _id: ""
    })

    useEffect(() => {
        setMessage(e => ({
            ...e, receiverId: state.id
        }))
    }, [state.id])

    const handleMessages = async () => {
        const { text, receiverId, senderId } = message;
        const data = { text, receiverId, senderId };

        try {
            const header = {
                "Content-Type": "application/json",
                "Authorization": `Token ${sessionStorage.getItem('token')}`
            }
            const res = await sendMessageApi(receiverId, header, data);
            console.log(res);

        } catch (err) {
            console.error(err);
        }
    };


    return (
        <>
            <div className='input-container'>
                <input onChange={e => setMessage({ ...message, text: e.target.value })} type="text" placeholder='Type a message...' className='messageinp' />
                <button className='btn message-btn' onClick={handleMessages}>
                    <i className="fa-solid fa-paper-plane send-icon" />
                </button>
            </div>
        </>
    )
}

export default MessageInput