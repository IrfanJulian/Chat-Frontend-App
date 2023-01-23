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
      const resSocket = io(`http://localhost:7878`, {
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

// const [idSocket, setIdSocket] = useState('')
// const [sendChat, setSendChat] = useState('')
// const [getChat, setGetChat] = useState([])
// const [socket, setSocket] = useState(null)
// useEffect(()=>{
//   const resSocket = io('http://localhost:7878')
//   setSocket(resSocket)
//   console.log(resSocket.id);
//   resSocket.on(`msgBE`, (data)=>{
//     setGetChat((current)=>[...current, data])
//   })
// }, [getChat])
// const handleSend = () =>{
//   socket.emit('msg', {
//     idSocket,
//     sendChat
//   })
//   setSendChat('')
// }
// const handleCek = () => {
//   alert(socket.id)
// }
// return (
//   <div className="App">
//     <div className="wrapperchat">
//       <ul>
//         {getChat.map((item)=>
//           <li>{item.message} - {new Date(item.date).getHours()}:{new Date(item.date).getMinutes()}</li>
//         )}
//       </ul>
//     </div>
//     <div className="wrapper mt-16">
//       <input type="text" name='idSocket' value={idSocket} onChange={(e)=>setIdSocket(e.target.value)} className='text-xl font-semibold py-2 px-4 border-2 rounded-md' />
//       <input type="text" name='chat' value={sendChat} onChange={(e)=>setSendChat(e.target.value)} className='text-xl font-semibold py-2 px-4 border-2 rounded-md' />
//       <button type='submit' onClick={handleSend} className='text-xl font-semibold border-2 rounded-md py-2 px-6 ml-4'>Send</button>
//       <button type='submit' onClick={handleCek} className='text-xl font-semibold border-2 rounded-md py-2 px-6 ml-4'>Cek id</button>
//     </div>
//   </div>
// );
