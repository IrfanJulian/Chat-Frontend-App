import React from 'react'
// import { useNavigate } from 'react-router-dom'
import ChatLayout from '../components/chatLayout'
import Side from '../components/side'

const Main = () => {

    return (
        <div className='flex h-screen bg-[#FAFAFA]'>
          <Side />
          <ChatLayout />
        </div>
      )
    }
export default Main


// const navigate = useNavigate()
// const [username, setUsername] = useState()
// const [group, setGroup] = useState()

// const handleLogin = () => {
//     navigate(`/chatroom?name=${username}&group=${group}`)
// }

// return (
// <div>
//     <div className="container mx-auto grid my-10">
//         <div className="wraapper w-1/4">               
//             <input type="text" name='username' placeholder='name' className='border' value={username} onChange={(e)=>setUsername(e.target.value)} />
//             <select className="flex my-10" value={group} onChange={(e)=>setGroup(e.target.value)}>
//                 <option className='mr-4 border px-5 bg-blue-400' value='g1'>group 1</option>
//                 <option className='mr-4 border px-5 bg-blue-400' value='g2'>group 2</option>
//                 <option className='mr-4 border px-5 bg-blue-400' value='g3'>group 3</option>
//             </select>
//             <button className='px-5 py3 bg-red-500' onClick={handleLogin}>Join Group</button>
//         </div>
//     </div>
// </div>
// )
// }