import React, { useEffect, useState } from 'react'
import add from '../assets/iconplus.png'
import Dropdowns from '../components/dropdowns'
import pict from '../assets/user.png'
import menu from '../assets/Profile menu.png'
import saveIcon from '../assets/eck.png'
import cancelIcon from '../assets/cancel.png'
import axios from 'axios'
import Swal from 'sweetalert2'
import ScrollToBottom from 'react-scroll-to-bottom';
// import { useNavigate } from 'react-router-dom'

const RoomChat = ({socket}) => {

  // const navigate = useNavigate()
  const idLocal = localStorage.getItem('id')
  const token = localStorage.getItem('token')
  const [setting, setSetting] = useState(false)
  const [message, setMessage] = useState()
  const [chat, setChat] = useState([])
  const [friends, setFriends] = useState()
  const [choose, setChoose] = useState()
  const [profile, setProfile] = useState()
  // const [profilePict, setProfilePict] = useState()
  const [photo, setPhoto] = useState([])
  // const [msg, setMsg] = useState()
  // console.log(chat);

  useEffect(()=>{
    const getProfile = async () => {
      const res = await axios({
        method: 'GET',
        url: `http://localhost:7878/user/profile/${idLocal}`,
        headers: {
          authorization: `Bearer ${token}`
        }
      })
      setProfile(res.data.data[0])
      // setProfilePict(res.data.data[0].photo)
    }
    getProfile()
  }, [idLocal, token])
  // console.log(profilePict);

  useEffect(()=>{
    const getAll = async() => {
      try {
        const res = await axios({
          method: `GET`,
          url: `http://localhost:7878/user`,
          headers: {
            authorization: `Bearer ${token}`
          }
        })
        setFriends(res.data.data)
      } catch (error) {
        console.log(error);
      }
    }
    getAll()
  }, [token])

  useEffect(()=>{
    const getChat = async() => {
      try {
        const res = await axios({
          method: `GET`,
          url: `http://localhost:7878/chat/${choose.id}`,
          headers: {
            authorization: `Bearer ${token}`
          }
        })
        setChat(res.data.data)
      } catch (error) {
        console.log(error);
      }
    }
    getChat()
  }, [token, choose])

  useEffect(()=>{
    if(socket){
      socket.on('newMsg', (message)=>{
        setChat((current)=>[...current, message])
      })
    }
  }, [socket])

  useEffect(()=>{
    setChat([])
  }, [choose])

  const handleUpdate = async(e) => {
    const formData = new FormData()
    formData.append('photo', photo, photo.name)
    try {
      await axios({
        method: 'PUT',
        url: `http://localhost:7878/user/update/${idLocal}`,
        data: formData,
        headers: {
          authorization: `Bearer ${token}`
        }
      })
      Swal.fire({
        icon: 'success',
        title: 'Success...',
        text: 'Change Photo Sucess!'
      })
      window.location.reload()
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Login failed',
        text: error
    })
    }
  }

  const handleSend = (e) => {
    e.preventDefault()
    if(socket && message){
      socket.emit('msg', {
        idReciever: choose.id,
        messageSend: message,
        date: ''
      }, (message)=>{
        setChat((current)=>[...current, message])
      })
      setMessage('')
    }
  }

  const chooseFriend=(friend)=>{
    setChoose(friend)
    // setReciever2(friend.id)
  }
  // console.log('ini chat ===', chat);
  // console.log('ini choose ===', choose);

  return (
    <div>
      <div className="flex">
        <div className="wrapperleft w-1/4 border px-10 py-9 h-screen">
          <div className="flex">
            <p className='text-5xl font-semibold text-[#7E98DF]'>Fun Talk</p>
            <Dropdowns onClick={()=>setSetting(true)} />
          </div>
          {setting === true ?
            <div className="wrapperedit my-10 grid">
              <div className="wrapperimg mx-auto">
                { profile.photo ?
                <img src={profile.photo} alt="pict" className='w-[7rem] h-[7rem] rounded-full' />
                :
                <img src={pict} alt="pict" className='w-[7rem] h-[7rem] rounded-full' />
                }
              </div>
              <div className="change mt-5 flex">
                <label htmlFor="photo" className='text-xl mx-auto text-white bg-[#7E98DF] rounded-lg font-semibold px-5 py-2'>Change</label>
                <input name="photo" onChange={(e)=>setPhoto(e.target.files[0])} id='photo' type="file" hidden/>
              </div>
              <div className="confirm flex w-max mx-auto mt-10">
                <button onClick={()=>setSetting(false)} className='bg-[#7E98DF] rounded-lg mx-2 p-1'><img src={cancelIcon} alt="cancel" className='w-[1.5rem] h-[1.5rem]' /></button>
                <button onClick={handleUpdate} className='bg-[#7E98DF] rounded-lg mx-2 p-1'><img src={saveIcon} alt="save" className='w-[1.5rem] h-[1.5rem]' /></button>
              </div>
            </div>
          : null }
          <div className="flex mt-12">
            <input type="text" className='bg-gray-200 rounded-md px-5 py-3 w-3/4' placeholder='Type your message . . .' />
            <button className='ml-auto mr-7'><img src={add} alt="" /></button>
          </div>
          <div className="flex my-7">
            <button className='rounded-3xl font-semibold text-xl mx-auto px-8 py-3 focus:bg-[#7E98DF] focus:text-white'>All</button>
            <button className='rounded-3xl font-semibold text-xl mx-auto px-8 py-3 focus:bg-[#7E98DF] focus:text-white'>Important</button>
            <button className='rounded-3xl font-semibold text-xl mx-auto px-8 py-3 focus:bg-[#7E98DF] focus:text-white'>Unread</button>
          </div>
            {friends ? friends.map((item)=>
          <div key={item.id} className="flex py-5 px-5 border-t-2 cursor-pointer hover:bg-gray-100 active:bg-gray-300 focus:bg-gray-300" onClick={()=>chooseFriend(item)}>
            <div className="profilepicture">
              { item.photo ?
              <img src={item.photo} alt="pict" className='w-[4.5rem] h-[4.5rem] rounded-xl' />
              :
              <img src={pict} alt="pict" className='w-[4.5rem] h-[4.5rem] rounded-xl' />
              }
            </div>
            <div className="username my-auto px-6 overflow-hidden">
              <p className='font-semibold text-black text-xl mb-2'>{item.username}</p>
              <p className='text-[#7E98DF] text-lg mt-2'>Message</p>
            </div>
            <div className="wrapper ml-auto pt-2">
              <p>16:23</p>
              {/* <div className='bg-[#7E98DF] rounded-full w-6 h-6 pl-2 mt-3'>
                <p className='text-white text-sm'>1</p>
              </div> */}
            </div>
          </div>
            ): null }
        </div>

        <div className="wrapperRight w-3/4 border h-screen">
          <div className="wrapperhead px-16 py-6 shadow-lg shadow-gray-300">
            <div className="head flex">
                {choose ?
                <div className="flex">
                { choose.photo ?
                  <img src={choose.photo} alt="pict" className='w-[4.5rem] h-[4.5rem] rounded-xl' />
                  :
                  <img src={pict} alt="pict" className='w-[4.5rem] h-[4.5rem] rounded-xl' />
                }
                  <div className="username my-auto px-6">
                    <p className='font-semibold text-black text-xl'>{choose.username}</p>
                    <p className='text-[#7E98DF] text-lg'>Online</p>
                  </div>
                </div>
                :
                <p className='font-semibold text-black text-xl'>Choose your friend to start conversations</p>
                }
              <button className='ml-auto'><img src={menu} alt="" /></button>
            </div>
          </div>
          <div className="wrapperchat h-3/4 overflow-auto border">
            <ScrollToBottom className='h-full'>
            { chat ? chat.map((item)=>
            <div className="w-full">
                { item.reciever === choose.id ?
                <div key={item.id} className='wrapperOther w-3/4 px-16 py-6 ml-auto flex'>
                  <div className="wrapper w-11/12">
                    <div className="chatOther p-4 border-2 w-max rounded-lg ml-auto mr-5">
                      <p className='text-xl text-black'>{item.message}</p>
                      <div className="wraperdate">
                        <p className='text-sm mt-3 text-gray-500'>{item.date}</p>
                      </div>
                    </div>
                  </div>
                  <div className="profileOther w-1/12">
                    <img src={pict} alt="pict" className='w-[4rem] h-[4rem] rounded-xl' />
                  </div>
                </div>
                :
                <div key={item.id} className='w-3/4 px-16 py-6 flex'>
                  <div className="profileOther w-1/12">
                    <img src={pict} alt="pict" className='w-[4rem] h-[4rem] rounded-xl' />
                  </div>
                  <div className="wrapper w-11/12">
                    <div className="chatOther p-4 bg-[#7E98DF] w-max mr-auto rounded-lg">
                      <p className='text-xl text-white'>{item.message}</p>
                      <div className="wraperdate">
                        <p className='text-sm mt-3 text-gray-300'>{item.date}</p>
                      </div>
                    </div>
                  </div>
                </div>
                }
              </div>
            ): null }
            </ScrollToBottom>
          </div>
          <form>
            <div className="flex px-16 py-8">
              <input value={message} onChange={(e)=>setMessage(e.target.value)} type="text" className='px-8 py-3 text-xl rounded-xl border-2 w-11/12 outline-none' placeholder='Type your message . . .' />
              <button onClick={handleSend} className='px-5 py-3 text-xl bg-[#7E98DF] text-white rounded-xl ml-5 w-1/12'>Send</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default RoomChat

// { chat && choose ? chat.map((msg)=>
//   <div key={msg.id} className={`wrapperOther ${msg.recieve === choose.id ? 'w-3/4 px-16 py-6 ml-auto flex' : 'w-3/4 px-16 py-6 flex'}`}>
//         <div className={`wrapper ${msg.recieve === choose.id ? 'w-11/12' : 'w-1/12'}`}>
//           <div className="chatOther p-4 bg-white border-2 w-max ml-auto mr-5 rounded-lg">
//             <p className='text-xl text-black'>{msg.message}</p>
//             <div className="wraperdate">
//               <p>{msg.date}</p>
//             </div>
//           </div>
//         </div>
//         <div className="profileOther w-1/12">
//           <img src={pict} alt="pict" className='w-[4rem] h-[4rem] rounded-xl' />
//         </div>
//   </div>
//     ): chat.map((msg)=>
//   <div className="wrapperSelf w-3/4 px-16 py-6 flex">
//     <div className="profileOther">
//       <img src={pict} alt="pict" className='w-[4rem] h-[4rem] rounded-xl' />
//     </div>
//     <div className="wrapper w-11/12">
//       <div className="chatOther p-4 bg-[#7E98DF] w-max rounded-lg ml-5">
//         <p className='text-xl text-white'>{msg.message}</p>
//         <div className="wraperdate">
//           <p>{msg.date}</p>
//         </div>
//       </div>
//     </div>
//   </div>
//     )}


// { chat ? chat.map((item)=>
//   <div className="wrapper w-full">
//     {item.receiver === choose.id ?
//       <div className='w-3/4 px-16 py-6 flex'>
//         <div className="profileOther">
//           <img src={pict} alt="pict" className='w-[4rem] h-[4rem] rounded-xl' />
//         </div>
//         <div className="wrapper w-11/12">
//           <div className="chatOther p-4 bg-[#7E98DF] w-max rounded-lg ml-5">
//             <p className='text-xl text-white'>{item.message}</p>
//             <div className="wraperdate">
//               <p>{item.date}</p>
//             </div>
//           </div>
//         </div>
//       </div>
//       :
//       <div className="w-3/4 px-16 py-6 ml-auto flex">
//         <div className="wrapper w-11/12">
//           <div className="chatOther p-4 bg-white border-2 w-max ml-auto mr-5 rounded-lg">
//             <p className='text-xl text-black'>{item.message}</p>
//             <div className="wraperdate">
//               <p>{item.date}</p>
//             </div>
//           </div>
//         </div>
//         <div className="profileOther w-1/12">
//           <img src={pict} alt="pict" className='w-[4rem] h-[4rem] rounded-xl' />
//         </div>
//       </div>
//     }
//   </div>
//   ): null }