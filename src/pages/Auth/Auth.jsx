import React, { useContext, useState } from 'react'
import './Auth.css'
import { loginApi, registerApi } from '../../services/allApis'
import { useNavigate } from 'react-router-dom'
import { useSocketContext } from '../../context/SocketContext'
import { authContext } from '../../context/ContextApi'
import toast from 'react-hot-toast'

function Auth() {

  const [user, setuser] = useState({
    fullName: "", email: "", password: ""
  })

  const [state, setState] = useState(false) // changeState
  const [loading, setLoading] = useState(false) // loading-spinner

  const { authContextStatus, setAuthContextStatus } = useContext(authContext) // contextStatus
  const { handleLoginSubmit } = useSocketContext(); // loginSocketContext

  const nav = useNavigate()

  // changeState
  const changeState = () => {
    setState(!state)
  }

  // registration
  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { fullName, email, password } = user;

    if (!fullName || !email || !password) {
      setLoading(false);
      toast.error("All fields are required!");
    } else {
      if (password.length < 6) {
        setLoading(false);
        toast.error("Password must be at least 6 characters!");
      }
    }

    const res = await registerApi(user);
    console.log(res);
    setLoading(false);

    if (res.status == 200) {
      setuser({
        fullName: "", email: "", password: ""
      });
      toast.success("Registration successful!");
      changeState();
    } else if (res.status == 400) {
      if (res.response.data === 'Email already exists!') {
        toast.error('Email already registered! Log in or use another email.')
      }
    }
  };


  // logIn
  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    const { email, password } = user
    if (!email || !password) {
      setLoading(false)
      toast.error("Please enter both email and password!")
    } else {
      const res = await loginApi(user)
      console.log(res)
      setLoading(false)
      if (res.status == 200) {
        const userId = res.data._id;
        setuser({
          fullName: "", email: "", password: ""
        })
        sessionStorage.setItem("token", res.data.token)
        sessionStorage.setItem("email", res.data.email)
        sessionStorage.setItem("fullName", res.data.fullName)
        sessionStorage.setItem("profilePic", res.data.profilePic)
        sessionStorage.setItem("_id", res.data._id)
        handleLoginSubmit(userId)
        toast.success("Login successful!")
        setAuthContextStatus(true)
        nav('./home')
      } else {
        toast.error("Incorrect email or password!")
      }
    }
  }

  return (
    <div className='auth-main-container'>
      <div className='auth-second-container'>
        <div className="auth-form">
          {/* headline */}
          <h2>
            {loading ? (
              <i className="fa-solid fa-spinner fa-spin auth-spinner"></i>
            ) : (
              state ? 'Register' : 'Login'
            )}
          </h2>

          {/* form */}
          <form action="">
            {state &&
              <div>
                <div className='auth-input-box'>
                  {/* fullName */}
                  <input
                    onChange={e => setuser({ ...user, fullName: e.target.value })}
                    value={user.fullName}
                    type="text"
                    id='username'
                    required
                  />
                  <label htmlFor="username">Full name</label>
                  <i className="fa-solid fa-user" />
                </div>
              </div>
            }

            <div>
              <div className='auth-input-box'>
                {/* email */}
                <input
                  onChange={e => setuser({ ...user, email: e.target.value })}
                  value={user.email}
                  type="email"
                  id='email'
                  required
                />
                <label htmlFor="email">Email address</label>
                <i className="fa-solid fa-envelope" />
              </div>

              <div className='auth-input-box'>
                {/* password */}
                <input
                  onChange={e => setuser({ ...user, password: e.target.value })}
                  value={user.password}
                  type="password"
                  id='password'
                  required
                />
                <label htmlFor="password">Password</label>
                <i className="fa-solid fa-lock" />
              </div>
            </div>

            {/* buttons */}
            <div className='auth-input-box'>
              {state ? (
                <button onClick={handleRegister} className='btn sign-up_in-btn' type='submit'>Sign Up</button>
              ) : (
                <button onClick={handleLogin} className='btn sign-up_in-btn' type='submit'>Sign In</button>
              )}
            </div>

            {/* changeState */}
            <div className='auth-link-container'>
              <p style={{ color: '#EDEDED' }}>
                {state ? 'Have an account?' : "Don't have an account?"}
                <a onClick={changeState} href="#" className='auth-link ms-1'>
                  {state ? 'Sign In' : 'Sign Up'}
                </a>
              </p>
            </div>

          </form>
        </div>
      </div>
    </div>
  )
}

export default Auth
