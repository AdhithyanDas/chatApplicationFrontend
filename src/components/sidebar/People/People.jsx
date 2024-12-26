import React, { useContext, useEffect, useState } from 'react';
import { getUsersForSidebarApi } from '../../../services/allApis';
import profilePicAvatar from '../../../images/avatar.png';
import base_Url from '../../../services/baseUrl';
import { messageContainerContext } from '../../../context/ContextApi';
import { useSocketContext } from '../../../context/SocketContext';
import './People.css'; // Import the CSS for spinner

function People({ search }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true); // Loading state
    const { state, setState } = useContext(messageContainerContext);
    const { onlineUsers } = useSocketContext();
    const [clickedUserId, setClickedUserId] = useState(null); // Track clicked user

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        const header = {
            "Content-Type": "multipart/form-data",
            "Authorization": `Token ${sessionStorage.getItem('token')}`,
        };

        const res = await getUsersForSidebarApi(header);
        if (res.status === 200) {
            setData(res.data);
            setLoading(false); // Set loading to false once data is fetched
        } else {
            setLoading(false); // Stop loading even if there's an error
            // Handle error case here if needed
        }
    };


    const handleDivClick = (fullName, profilePic, _id) => {
        setState({
            Boolean: false,
            fullName,
            profilePic: profilePic ? `${base_Url}/profilePics/${profilePic}` : profilePicAvatar,
            id: _id,
        });
        setClickedUserId(_id); // Set the clicked user ID
    };

    const filteredData = search
        ? data.filter((user) =>
            user.fullName.toLowerCase().includes(search.toLowerCase())
        )
        : data;

    return (
        <div className="people-list">
            {loading ? ( // Show spinner while loading
                <div className="spinner-wrapper">
                    <i className="fa-solid fa-spinner fa-spin send-icon" /> {/* Spinner icon */}
                </div>
            ) : filteredData.length > 0 ? (
                filteredData.map((item, index) => {
                    const isOnline = onlineUsers.includes(item._id);
                    const isClicked = clickedUserId === item._id; // Check if this item is clicked
                    return (
                        <div
                            key={item._id}
                            onClick={() => handleDivClick(item.fullName, item.profilePic, item._id)}
                            className="flex align-items-center cursor-pointer w-99 ps-2 py-1 people-container people" style={{
                                position: 'relative',
                                backgroundColor: isClicked ? '#1c1c20ad' :'', // Change color based on isClicked state
                                transition: 'background-color 0.3s ease', // Smooth transition for color change
                            }}
                        >
                            {index !== 0 && (
                                <span className='people-border' />
                            )}
                            <div className={`avatar ${isOnline ? "online" : ""}`}>
                                <div className="max-w-20 rounded-full">
                                    <img
                                        className="img-fluid"
                                        src={item.profilePic ? `${base_Url}/profilePics/${item.profilePic}` : profilePicAvatar}
                                        alt="Avatar"
                                    />
                                </div>
                            </div>
                            <div className="ms-4 people-name">
                                <h6 className="fw-bold">{item.fullName}</h6>
                            </div>
                        </div>
                    );
                })
            ) : (
                <h4 className='text-center fw-bold'>Oops! No users found.</h4>
            )}
        </div>
    );
}

export default People;
