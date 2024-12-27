import './App.css'
import './bootstrap.min.css'
import Header from './components/Header/Header'
import Auth from './pages/Auth/Auth'
import Home from './pages/Home/Home'
import Profile from './pages/Profile/Profile'
import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast';
import { useContext } from 'react'
import { authContext } from './context/ContextApi'

function App() {

  const { authContextStatus, setAuthContextStatus } = useContext(authContext)

  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Auth />} />
        <Route path='/home' element={authContextStatus ? <Home /> : <Auth />} />
        <Route path='/profile' element={authContextStatus ? <Profile /> : <Auth />} />
      </Routes>
      <Toaster />
    </>
  )
}

export default App