import React, { useContext, useEffect, useState } from 'react'
import { getUsersForSidebarApi } from '../../../services/allApis'
import profilePicAvatar from '../../../images/avatar.png'
import base_Url from '../../../services/baseUrl'
import { messageContainerContext } from '../../../context/ContextApi'
import { useSocketContext } from '../../../context/SocketContext'

function People() {

    const [data, setData] = useState([])

    const { state, setState } = useContext(messageContainerContext)

    const { onlineUsers } = useSocketContext()

    console.log("Online Users in People Component:", onlineUsers); // Debugging

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        const header = {
            "Content-Type": "multipart/form-data",
            "Authorization": `Token ${sessionStorage.getItem('token')}`
        }

        const res = await getUsersForSidebarApi(header)
        console.log(res);

        if (res.status == 200) {
            setData(res.data);
        } else {

        }
    }

    const handleDivClick = (fullName, profilePic, _id) => {
        setState({
            Boolean: false,
            fullName,
            profilePic: profilePic ? `${base_Url}/profilePics/${profilePic}` : profilePicAvatar,
            id: _id
        });
    };

    return (
        <>
            {data.length > 0 ? (
                data.map(item => {
                    const isOnline = onlineUsers.includes(item._id);
                    return (
                        <div 
                            key={item._id} 
                            onClick={() => handleDivClick(item.fullName, item.profilePic, item._id)} 
                            className="ms-3 flex align-items-center border cursor-pointer w-64"
                        >
                            <div className={`avatar ${isOnline ? "online" : ""}`}>
                                <div className="w-20 rounded-full">
                                    <img 
                                        className='img-fluid' 
                                        src={item.profilePic ? `${base_Url}/profilePics/${item.profilePic}` : profilePicAvatar} 
                                        alt="Avatar" 
                                    />
                                </div>
                            </div>
                            <div className='ms-4'>
                                <h6 className='fw-bold'>{item.fullName}</h6>
                            </div>
                        </div>
                    );
                })
            ) : (
                <h1>No users available</h1>
            )}
        </>
    );
}

export default People