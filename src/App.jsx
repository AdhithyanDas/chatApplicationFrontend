import './App.css'
import './bootstrap.min.css'
import Header from './components/Header/Header'
import Auth from './pages/Auth/Auth'
import Home from './pages/Home/Home'
import Profile from './pages/Profile/Profile'
import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast';

function App() {

  return (
    <>
      <Header />
      <Routes>
        {/* <Route path='/' element={<Landing />} /> */}
        <Route path='/' element={<Auth />} />
        <Route path='/home' element={<Home />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
      <Toaster />
    </>
  )
}

export default App
