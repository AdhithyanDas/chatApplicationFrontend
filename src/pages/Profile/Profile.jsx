import React from 'react'
import './Profile.css'
import profilepic from '../../images/avatar.png'
import { Camera } from 'lucide-react'

function Profile() {
    return (
        <>
            <div className='d-flex justify-content-center align-items-center' style={{ height: '91vh', background: '#25252B' }}>
                <div className='profile-second-container' style={{ width: '40vw', height: '80vh' }}>
                    <h3 className='text-white text-center mt-4 fw-bold'>Profile</h3>
                    <p className='text-white text-center'>Your profile information</p>
                    <div className='d-flex justify-content-center relative'>
                        <img className='size-32 rounded-full object-cover border-4' src={profilepic} alt="" />
                        <label
                            htmlFor="avatar-upload"
                            className={`
                  absolute bottom- ms-24 mt-20
                  bg-base-content hover:scale-105
                  p-2 rounded-full cursor-pointer 
                  transition-all duration-200
                `}
                        >
                            <Camera className="w-5 h-5 text-base-200" />
                            <input
                                type="file"
                                id="avatar-upload"
                                className="hidden"
                            />
                        </label>

                    </div>
                    <p className='text-white text-center mt-3'>Click the camara icon to update your photo</p>

                    <div>
                        
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile