import React from 'react'
import './Profile.css'
import profilepic from '../../images/avatar.png'
import { Camera, User, Mail, ArrowLeft, Trash } from 'lucide-react'
import { Link } from 'react-router-dom'

function Profile() {
    return (
        <>
            <div className='d-flex justify-content-center align-items-center' style={{ height: '91vh', background: '#25252B' }}>
                <div className='profile-second-container px-4' style={{ width: '40vw', height: '76vh' }}>
                    <div className='d-flex justify-between'>
                        <Link to={'/home'}>
                            <button className='btn' style={{ color: '#EDEDED', border: '0',marginLeft:'-23px' }}>
                                <ArrowLeft />
                            </button>
                        </Link>
                        <Link to={'/'}>
                            <button className='btn' style={{ color: '#FF3B30', border: '0',marginRight:'-23px' }}>
                                <Trash />
                            </button>
                        </Link>
                    </div>
                    <h3 className='text-white text-center fw-bold'>Profile</h3>
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
                  profile-pic-button
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
                    {/* <p className='text-white text-center mt-3'>Click the camera icon to update your photo</p> */}

                    <div className='mt-4 w-100'>
                        <div className='d-grid'>
                            <div className='d-flex'>
                                <User className='w-4 h-4 mt-1 text-white' />
                                <span className='text-white ms-1'>Full Name</span>
                            </div>
                            <input type="text" />
                        </div>
                        <div className='d-grid mt-3'>
                            <div className='d-flex'>
                                <Mail className='w-4 h-4 mt-1 text-white' />
                                <span className='text-white ms-1'>Email address</span>
                            </div>
                            <input type="text" className='profile-second-input border-0' />
                        </div>
                    </div>

                    <div className='mt-4 d-grid'>
                        <button className='btn text-white profile-save-button'>Save Changes</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile