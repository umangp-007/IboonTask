import { Navigate, useLocation } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
  // const location = useLocation()
  const isAuthenticated = localStorage.getItem('token')

  if (!isAuthenticated) {
    return <Navigate to="/login"  />
  }
  
  return children
}

export default ProtectedRoute