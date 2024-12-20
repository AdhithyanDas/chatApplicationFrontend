import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import ContextApi from './context/ContextApi.jsx'
import { SocketContext } from './context/SocketContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ContextApi>
        <SocketContext>
          <App />
        </SocketContext>
      </ContextApi>
    </BrowserRouter>
  </StrictMode>,
)