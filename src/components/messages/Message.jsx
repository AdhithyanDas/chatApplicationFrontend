import React, { useContext, useEffect, useRef, useState } from 'react';
import { messageContainerContext } from '../../context/ContextApi';
import { getMessageApi } from '../../services/allApis';
import base_Url from '../../services/baseUrl';
import profilepicavatar from '../../images/avatar.png';
import './Message.css'; // For CSS adjustments

function Message() {

  const { state } = useContext(messageContainerContext);

  const scrollRef = useRef(); // Ref for scrolling


  const [messages, setMessages] = useState([]);
  const [receiverId, setReceiverId] = useState('');

  useEffect(() => {
    getData();
  }, [state.id]);

  const getData = async () => {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Token ${sessionStorage.getItem('token')}`,
    };

    try {
      const res = await getMessageApi(state.id, headers);

      if (res && Array.isArray(res.data)) {
        setMessages(res.data);
        setReceiverId(state.id);
      } else {
        console.error('Invalid response format:', res);
        setMessages([]);
      }
    } catch (err) {
      console.error('Error fetching messages:', err);
      setMessages([]);
    }
  };

  const addOutgoingMessage = (newMessage) => {
    setMessages((prev) => [...prev, newMessage]);
  };

  useEffect(() => {
    // Listen for changes in `state.newMessage` for outgoing messages
    if (state.newMessage && state.newMessage.receiverId === state.id) {
      addOutgoingMessage(state.newMessage);
    }
  }, [state.newMessage]);

  useEffect(() => {
    setTimeout(() => {
      scrollRef.current?.scrollIntoView({ behavior: "smooth" })
    }, 100)
  }, [messages])

  return (
    <>
      <div className="message-container">
        <div className="message-list">
          {messages.length > 0 ? (
            messages.map((item) => (
              <div className={`chat ${item.senderId === state.id ? 'chat-start' : 'chat-end'}`} key={item._id} ref={scrollRef} >
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full">
                    <img
                      alt="User Avatar"
                      src={item.senderId === state.id
                        ? state.profilePic
                          ? state.profilePic
                          : profilepicavatar
                        : sessionStorage.getItem('profilePic')
                          ? `${base_Url}/profilePics/${sessionStorage.getItem('profilePic')}`
                          : profilepicavatar}
                    />
                  </div>
                </div>
                <div className="chat-bubble">{item.text}</div>
                <div className="chat-footer opacity-50">
                  {new Date(item.createdAt).toLocaleTimeString()}
                </div>
                <span ref={scrollRef}></span>
              </div>
            ))
          ) : (
            <h1>No messages to display</h1>
          )}
        </div>
      </div>
    </>
  );
}

export default Message;
