import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { Zoom } from 'react-toastify';
import { AuthProvider } from './context/auth.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'

createRoot(document.getElementById('root')).render(
  <ThemeProvider>
  <AuthProvider>
  <BrowserRouter>
  <ToastContainer
    position="top-center"
    autoClose={2000}
    hideProgressBar={true}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="dark"
    transition={Zoom}
    toastClassName="small-toast"  // Apply smaller toast class
    bodyClassName="small-toast-body"  

    />
    <App />
  </BrowserRouter>
  </AuthProvider>
  </ThemeProvider>
)
