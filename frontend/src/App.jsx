import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'


function App() {

  return (
    <Router>
      <div>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path="/api/dashboard" element={<Dashboard/>}/>
        </Routes>
        <Toaster/>
      </div>
    </Router>
  )
}

export default App
