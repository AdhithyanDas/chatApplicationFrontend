import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Header() {

    const nav = useNavigate()

    const handleLogout = () => {
        sessionStorage.clear()
        nav('/')
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
                                Profile
                            </button>
                        </Link>

                        <button onClick={handleLogout} className='btn' style={{ color: '#EDEDED', border: '0' }}>
                            <i className="fa-solid fa-right-from-bracket fs-5 me-1" />
                            Logout
                        </button>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Header