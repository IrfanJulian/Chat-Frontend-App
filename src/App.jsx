import React, {useState, useEffect} from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import io from 'socket.io-client'
import Chtaroom from './pages/chatroom';
import Login from './pages/login';
import Main from './pages/main';
import Register from './pages/register';
import RoomChat from './pages/RoomChat';

function App() {

  const [socket, setSocket] = useState()
  useEffect(()=>{
    const token = localStorage.getItem('token')
    if(!socket && token){
      const resSocket = io(`${process.env.REACT_APP_API}`, {
        query: {
          token: token
        }
      })
      setSocket(resSocket)
    }
  },[socket])

  return(
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login setSocket={setSocket} />} />
          <Route path='/login' element={<Login setSocket={setSocket} />} />
          <Route path='/register' element={<Register />} />
          <Route path='/main' element={<Main />} />
          <Route path='/room' element={<RoomChat socket={socket}/>} />
          <Route path='/chatroom' element={<Chtaroom />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;