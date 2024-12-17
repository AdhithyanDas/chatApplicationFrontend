import React, { useEffect, useState } from 'react'
import { getUsersForSidebarApi } from '../../../services/allApis'
import profilePicAvatar from '../../../images/avatar.png'
import base_Url from '../../../services/baseUrl'

function People() {

    const [data, setData] = useState([])

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

    return (
        <>
            {
                data.length > 0 ?
                    <>
                        {
                            data?.map(item => (
                                <div className="ms-3 flex align-items-center border cursor-pointer w-64">
                                    <div className="avatar online">
                                        <div className="w-20 rounded-full">
                                            <img className='img-fluid' src={item.profilePic ? `${base_Url}/profilePics/${item.profilePic}` : profilePicAvatar} alt="Avatar" />
                                        </div>
                                    </div>

                                    <div className='ms-4'>
                                        <h6 className='fw-bold'>{item.fullName}</h6>
                                    </div>
                                </div>
                            ))

                        }
                    </>
                    :
                    <h1>hahaha</h1>
            }

        </>
    )
}

export default People