import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { authContext } from '../../context/ContextApi'
import './Header.css'
import toast from 'react-hot-toast'

function Header() {

    const nav = useNavigate()
    const { authContextStatus, setAuthContextStatus } = useState(authContext)

    const handleLogout = () => {
        sessionStorage.clear()
        nav('/')
        toast.success("You have successfully logged out!")
        setTimeout(() => {
            window.location.reload()
        }, 1000)
        setAuthContextStatus(false)
    }

    return (
        <>
            <nav class="navbar navbar-expand-lg" style={{ background: '#2F2F37' }}>
                <div class="container">
                    <a class="navbar-brand fw-bold" style={{ color: '#EDEDED' }} href="#">Chatty</a>
                    <div>
                        <Link to={'/profile'}>
                            <button className='btn' style={{ color: '#EDEDED', border: '0', }}>
                                <i className="fa-solid fa-user fs-5 me-1" />
                                <span>Profile</span>
                            </button>
                        </Link>

                        <button onClick={handleLogout} className='btn' style={{ color: '#EDEDED', border: '0' }}>
                            <i className="fa-solid fa-right-from-bracket fs-5 me-1" />
                            <span>Logout</span>
                        </button>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Header