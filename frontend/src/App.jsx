import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import Login from './components/Login'
import Register from './components/register'
import Admindashboard from './components/AdminDashboard'
import Managerdashboard from './components/ManagerDashboard'
import Employeedashboard from './components/EmployeeDashboard'

function App() {

  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Register/>}/>
          <Route path="/admin-dashboard" element={<Admindashboard />}/>
          <Route path="/manager-dashboard" element={<Managerdashboard />}/>
          <Route path="/employee-dashboard" element={<Employeedashboard />}/>
        </Routes>
      </BrowserRouter>
  )
}

export default App
