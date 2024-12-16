import React, { useState } from 'react'
import './Auth.css'
import { loginApi, registerApi } from '../../services/allApis'
import { useNavigate } from 'react-router-dom'

function Auth() {

  const [user, setuser] = useState({
    fullName: "", email: "", password: ""
  })

  const [state, setState] = useState(false)

  const nav = useNavigate()

  const changeState = () => {
    setState(!state)
    // e.preventDefault()
  }

  const handleRegister = async (e) => {
    // e.preventDefault()
    console.log(user);
    const { fullName, email, password } = user
    if (!fullName || !email || !password) {

    } else {
      const res = await registerApi(user)
      console.log(res);
      if (res.status == 200) {
        setuser({
          fullName: "", email: "", password: ""
        })
        changeState()
      } else {

      }
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    const { email, password } = user
    if (!email || !password) {

    } else {
      const res = await loginApi(user)
      console.log(res);
      if (res.status == 200) {

        setuser({
          fullName: "", email: "", password: ""
        })
        sessionStorage.setItem("token", res.data.token)
        sessionStorage.setItem("email", res.data.email)
        sessionStorage.setItem("fullName", res.data.fullName)
        sessionStorage.setItem("profilePic", res.data.profilePic)
        nav('./home')
      } else {

      }
    }
  }

  return (
    <>
      <div className='auth-main-container'>
        <div className='auth-second-container'>
          <div className="auth-form">
            {
              state ?
                <h2>Register</h2>
                :
                <h2>Login</h2>
            }
            <form action="">
              {
                state &&
                <div>
                  <div className='auth-input-box'>
                    <input onChange={e => setuser({ ...user, fullName: e.target.value })} value={user.fullName} type="text" id='username' required />
                    <label htmlFor="username">Full name</label>
                    <i className="fa-solid fa-user" />
                  </div>
                </div>
              }

              <div>
                <div className='auth-input-box'>
                  <input onChange={e => setuser({ ...user, email: e.target.value })} value={user.email} type="email" id='email' required />
                  <label htmlFor="email">Email address</label>
                  <i className="fa-solid fa-envelope" />
                </div>
                <div className='auth-input-box'>
                  <input onChange={e => setuser({ ...user, password: e.target.value })} value={user.password} type="password" id='password' required />
                  <label htmlFor="password">Password</label>
                  <i className="fa-solid fa-lock" />
                </div>
              </div>

              {
                state ?
                  <div className='auth-input-box'>
                    <button onClick={handleRegister} className='btn sign-up_in-btn' type='submit'>Sign Up</button>
                  </div>
                  :
                  <div className='auth-input-box'>
                    <button onClick={handleLogin} className='btn sign-up_in-btn' type='submit'>Sign In</button>
                  </div>

              }
              {
                state ?
                  <div className='auth-link-container'>
                    <p style={{ color: '#EDEDED' }}>Have an account? <a onClick={changeState} href="#" className='auth-link'>Sign In</a></p>
                  </div>
                  :
                  <div className='auth-link-container' >
                    <p style={{ color: '#EDEDED' }}>Don't have an account? <a onClick={changeState} href="#" className='auth-link'>Sign Up</a></p>
                  </div>
              }
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Auth