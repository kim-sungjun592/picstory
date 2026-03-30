import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from './auth.store'
const ProtectRoute = ({ children }) => {

  const { isAuthed, ready } = useAuth()


  if (!ready) return null;


  if (!isAuthed) return <Navigate to="/login" replace />

  return children
}

export default ProtectRoute