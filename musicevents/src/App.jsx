import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import Protected from './Protected'
import Events from './pages/Events'
import Profile from './pages/Profile'
import CreateEvent from './pages/CreateEvent'
import ViewEvent from './pages/ViewEvent'
import UpdateEvent from './pages/UpdateEvent'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route element={<Protected />}>
          <Route path='/events' element={<Events />} />
          <Route path='/add-event' element={<CreateEvent />} />
          <Route path='/event/:id' element={<ViewEvent />} />
          <Route path='/events/:id' element={<UpdateEvent />} />
          <Route path='/profile' element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
