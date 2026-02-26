<<<<<<< HEAD
import { useState } from 'react'
import './App.css'
import Dashboard from "./components/Dashboard/dashboard.jsx"
=======
import { Navigate, Route, Routes } from 'react-router-dom'
import ForgotPassword from './pages/ForgotPassword'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
>>>>>>> c41bcf53ce506d98c0d37396584d1b53267c7a28

function App() {
  return (
<<<<<<< HEAD
    <>
      <div>
        <Dashboard />
      </div>
    </>
=======
    <div className="app">
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/home" element={<Home />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </div>
>>>>>>> c41bcf53ce506d98c0d37396584d1b53267c7a28
  )
}

export default App
