import React, { useContext, useEffect, useRef, useState } from 'react';
import { messageContainerContext } from '../../context/ContextApi';
import { getMessageApi } from '../../services/allApis';
import base_Url from '../../services/baseUrl';
import profilepicavatar from '../../images/avatar.png';
import './Message.css'; // Include CSS for loading spinner
import inComingMessages from '../../../hooks/inComingMessages';

function Message() {
  const { state } = useContext(messageContainerContext);
  const scrollRef = useRef(); // Ref for scrolling
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true); // State to track loading

  inComingMessages(messages, setMessages);
  const [receiverId, setReceiverId] = useState('');

  useEffect(() => {
    setLoading(true); // Set loading to true before fetching data
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
    } finally {
      setLoading(false); // Stop loading once data is fetched
    }
  };

  const addOutgoingMessage = (newMessage) => {
    setMessages((prev) => [...prev, newMessage]);
  };

  useEffect(() => {
    if (state.newMessage && state.newMessage.receiverId === state.id) {
      addOutgoingMessage(state.newMessage);
    }
  }, [state.newMessage]);

  useEffect(() => {
    setTimeout(() => {
      scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }, [messages]);

  return (
    <>
      <div className="message-container">
        {loading ? (
          <div className="loading-spinner-container">
            <div className="loading-spinner"></div>
          </div>
        ) : (
          <div className="message-list">
            {messages.length > 0 ? (
              messages.map((item) => (
                <div
                  className={`chat ${item.senderId === state.id ? 'chat-start' : 'chat-end'
                    }`}
                  key={item._id}
                  ref={scrollRef}
                >
                  <div className="chat-image avatar scroll-anim">
                    <div className="w-10 rounded-full">
                      <img
                        alt="User Avatar"
                        src={
                          item.senderId === state.id
                            ? state.profilePic
                              ? state.profilePic
                              : profilepicavatar
                            : sessionStorage.getItem('profilePic')
                              ? `${base_Url}/profilePics/${sessionStorage.getItem('profilePic')}`
                              : profilepicavatar
                        }
                      />
                    </div>
                  </div>
                  <div className='scroll-anim'>
                    <div className="chat-bubble" style={{
                      background: item.senderId === state.id ? "#3498db" : "#2ecc71",
                      color: item.senderId === state.id ? "white" : "#1c1c1c"
                    }}>{item.text}</div>
                    <div className="chat-footer opacity-50 ">
                      {new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                  <span ref={scrollRef}></span>
                </div>
              ))
            ) : (
              <div className='flex justify-center align-items-center flex-col h-100'>
                <h3 className='text-center'><strong>No chats yet. Start a conversation!</strong></h3>
                <i className="fa-regular fa-comment-dots fs-4 start-conversation-icon"></i>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default Message;
