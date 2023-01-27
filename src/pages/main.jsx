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