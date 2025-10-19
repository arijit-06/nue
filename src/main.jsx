import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ToastContainer } from 'react-toastify'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'react-toastify/dist/ReactToastify.css'
import './styles/global.css'
import App from './App.jsx'
import { CartProvider } from './context/CartContext'
import { AuthProvider } from './context/AuthContext' // ← ENABLE THIS

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <CartProvider>
        <App />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          closeOnClick
          pauseOnHover
        />
      </CartProvider>
    </AuthProvider>
  </StrictMode>,
)
