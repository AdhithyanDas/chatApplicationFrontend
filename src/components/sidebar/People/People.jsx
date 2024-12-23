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
                filteredData.map((item) => {
                    const isOnline = onlineUsers.includes(item._id);
                    return (
                        <div
                            key={item._id}
                            onClick={() => handleDivClick(item.fullName, item.profilePic, item._id)}
                            className="flex align-items-center border cursor-pointer w-99 ms-3"
                        >
                            <div className={`avatar ${isOnline ? "online" : ""}`}>
                                <div className="w-20 rounded-full">
                                    <img
                                        className="img-fluid"
                                        src={item.profilePic ? `${base_Url}/profilePics/${item.profilePic}` : profilePicAvatar}
                                        alt="Avatar"
                                    />
                                </div>
                            </div>
                            <div className="ms-4">
                                <h6 className="fw-bold">{item.fullName}</h6>
                            </div>
                        </div>
                    );
                })
            ) : (
                <h1>No users available</h1>
            )}
        </div>
    );
}

export default People;
