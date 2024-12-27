import React, { useState } from 'react'
import './Header.css'
import { Link, useNavigate } from 'react-router-dom'
import { authContext } from '../../context/ContextApi'
import { useSocketContext } from '../../context/SocketContext'
import { MessageCircle } from 'lucide-react'
import toast from 'react-hot-toast'

function Header() {

    const { authContextStatus, setAuthContextStatus } = useState(authContext) // context-status
    const { handleLogout } = useSocketContext() // logout-context

    const isLoggedIn = sessionStorage.getItem('_id') // loggedIn

    const nav = useNavigate()

    // logout
    const handleLogoutt = () => {
        handleLogout()
        toast.success("You have successfully logged out!")
        nav('/')
        setAuthContextStatus(false)
    }

    return (
        <>
            <nav class="navbar navbar-expand-lg" style={{ background: '#2F2F37' }}>
                <div class="container">
                    {/* name and icon */}
                    <div className="flex" style={{ color: '#EDEDED' }}>
                        <MessageCircle className='mt-2 me-1 message-circle-icon' />
                        <a class="navbar-brand fw-bold" style={{ color: '#EDEDED' }} href="#">Chatty</a>
                    </div>

                    <div>
                        {
                            isLoggedIn &&
                            <>
                                {/* profile-btn */}
                                <Link to={'/profile'}>
                                    <button className='btn' style={{ color: '#EDEDED', border: '0', }}>
                                        <i className="fa-solid fa-user fs-5 me-1" />
                                        <span className='header-spaan'>Profile</span>
                                    </button>
                                </Link>

                                {/* logout-btn */}
                                <button onClick={handleLogoutt} className='btn' style={{ color: '#EDEDED', border: '0' }}>
                                    <i className="fa-solid fa-right-from-bracket fs-5 me-1" />
                                    <span className='header-spaan'>Logout</span>
                                </button>
                            </>
                        }
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Header