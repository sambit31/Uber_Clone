import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import UserContextProvider from './context/UserContext.jsx'   // ✅ correct import

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserContextProvider>   {/* ✅ wrap with Provider */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </UserContextProvider>
  </StrictMode>,
)
