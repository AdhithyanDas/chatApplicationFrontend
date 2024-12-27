import React, { useContext, useEffect, useRef, useState } from 'react';
import './Message.css';
import profilepicavatar from '../../../images/avatar.png';
import base_Url from '../../../services/baseUrl';
import inComingMessages from '../../../hooks/inComingMessages';
import { messageContainerContext } from '../../../context/ContextApi';
import { getMessageApi } from '../../../services/allApis';

function Message() {

  const [messages, setMessages] = useState([]);
  const [receiverId, setReceiverId] = useState('');
  const [loading, setLoading] = useState(true); // loading

  const { state } = useContext(messageContainerContext); // messageContainerContext

  const scrollRef = useRef(); // scrolling

  inComingMessages(messages, setMessages); // inComingMessages

  // fetch-data
  useEffect(() => {
    setLoading(true);
    getData();
  }, [state.id]);

  // fetch-data
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
      console.error(err);
      setMessages([]);
    } finally {
      setLoading(false);
    }
  };

  // out-Going-Message
  const addOutgoingMessage = (newMessage) => {
    setMessages((prev) => [...prev, newMessage]);
  };

  // out-Going-Message
  useEffect(() => {
    if (state.newMessage && state.newMessage.receiverId == state.id) {
      addOutgoingMessage(state.newMessage);
    }
  }, [state.newMessage]);

  // scrolling
  useEffect(() => {
    setTimeout(() => {
      scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }, [messages]);

  return (
    <>
      <div className="message-container">
        {/* loading-spinner */}
        {loading ? (
          <div className="loading-spinner-container">
            <div className="loading-spinner"></div>
          </div>
        ) : (
          <div className="message-list">

            {messages.length > 0 ? (
              messages.map((item) => (
                // chat-start - end
                <div
                  className={`chat ${item.senderId === state.id ? 'chat-start' : 'chat-end'
                    }`}
                  key={item._id}
                  ref={scrollRef}
                >
                  <div className="chat-image avatar scroll-anim">
                    <div className="w-10 rounded-full">
                      {/* profilePic */}
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
                    {/* chat-bubble */}
                    <div className="chat-bubble"
                      style={{
                        background: item.senderId === state.id ? "#3498db" : "#2ecc71",
                        color: item.senderId === state.id ? "white" : "#1c1c1c"
                      }}>{item.text}
                    </div>

                    {/* time */}
                    <div className="chat-footer opacity-50 ">
                      {new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>

                  {/* scroll */}
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
