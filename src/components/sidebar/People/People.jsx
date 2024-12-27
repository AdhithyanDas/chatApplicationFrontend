import React, { useContext, useEffect, useState } from 'react';
import './People.css';
import profilePicAvatar from '../../../images/avatar.png';
import base_Url from '../../../services/baseUrl';
import { getUsersForSidebarApi } from '../../../services/allApis';
import { messageContainerContext } from '../../../context/ContextApi';
import { useSocketContext } from '../../../context/SocketContext';

function People({ search }) {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true); // loading-spinner
    const [clickedUserId, setClickedUserId] = useState(null); // Track-clicked-user

    const { state, setState } = useContext(messageContainerContext); // messageContainerContext
    const { onlineUsers } = useSocketContext(); // onlineUsers

    // fetchData
    useEffect(() => {
        getData();
    }, []);

    // fetchData
    const getData = async () => {
        const header = {
            "Content-Type": "multipart/form-data",
            "Authorization": `Token ${sessionStorage.getItem('token')}`,
        };

        const res = await getUsersForSidebarApi(header);

        if (res.status == 200) {
            setData(res.data);
            setLoading(false);
        } else {
            setLoading(false);
        }
    };

    // selectUser-div
    const handleDivClick = (fullName, profilePic, _id) => {
        setState({
            Boolean: false,
            fullName,
            profilePic: profilePic ? `${base_Url}/profilePics/${profilePic}` : profilePicAvatar,
            id: _id,
        });
        setClickedUserId(_id);
    };

    // search-people
    const filteredData = search
        ? data.filter((user) =>
            user.fullName.toLowerCase().includes(search.toLowerCase())
        )
        : data;

    return (
        <div className="people-list">

            {/* loading-spinner */}
            {loading ? (
                <div className="spinner-wrapper">
                    <i className="fa-solid fa-spinner fa-spin send-icon" />
                </div>
            ) : filteredData.length > 0 ? (
                filteredData.map((item, index) => {
                    const isOnline = onlineUsers.includes(item._id); // onlineUsers
                    const isClicked = clickedUserId == item._id; // clickedUserId

                    return (

                        // selectUser-div
                        <div
                            key={item._id}
                            onClick={() => handleDivClick(item.fullName, item.profilePic, item._id)}
                            className="flex align-items-center cursor-pointer w-99 py-1 people-container people"
                            style={{
                                position: 'relative',
                                backgroundColor: isClicked ? '#1c1c20ad' : '',
                                transition: 'background-color 0.3s ease',
                            }}
                        >
                            {/* people-border-bottom */}
                            {index !== 0 && (
                                <span className='people-border' />
                            )}

                            {/* profilePic */}
                            <div className={`avatar ${isOnline ? "online" : ""}`}>
                                <div className="max-w-20 rounded-full">
                                    <img
                                        className="img-fluid"
                                        src={item.profilePic ? `${base_Url}/profilePics/${item.profilePic}` : profilePicAvatar}
                                        alt="Avatar"
                                    />
                                </div>
                            </div>

                            {/* fullName */}
                            <div className="ms-4 people-name">
                                <h6 className="fw-bold">{item.fullName}</h6>
                            </div>
                        </div>
                    );
                })
            ) : (
                <h4 className='text-center fw-bold no-user'>Oops! No users found.</h4>
            )}
        </div >
    );
}

export default People;
