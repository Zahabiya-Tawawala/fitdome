import './App.css'
import { BrowserRouter , Routes, Route, Navigate } from 'react-router-dom'
import Landing from './01LandingPage/Landing'
import Login from './02AuthPanel/Login'
import Register from './02AuthPanel/Register'
import UserPanel from './03UserPanel/UserPanel'
import GymAdminPanel from './04GymadminPanel/GymAdminPanel'
import CenterPanel from './05CenterPanel/CenterPanel'
import GymRegister from './02AuthPanel/GymRegister'


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/gymRegister" element={<GymRegister />} />
          <Route path="/user" element={<UserPanel />} />
          <Route path="/gymadmin" element={<GymAdminPanel />} />
          <Route path="/center" element={<CenterPanel />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>    
    </>
  )
}

export default App
