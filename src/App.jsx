import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login/Login'
import Dashboard from './pages/Dashboard/Dashboard'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import ProtectedRoute from './services/Protectedayout'

function App() {
  
  return (
    <>
     <Header />
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute >
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
    </>
  )
}

export default App