import React from 'react'

const Chat = ({ name, photo, message, time, notif }) => {
  return (
    <div className="flex py-3">
        <img src={photo} alt="user" className='w-[4rem] h-[4rem] rounded-xl' />
        <div className="name pl-5 w-3/4">
            <p className='text-xl font-semibold'>{name}</p>
            <p className='mt-2 text-md text-[#7E98DF]'>{message}</p>
        </div>
        <div className="time">
            <p className='text-sm text-gray-500'>{time}</p>
            <div className="notif rounded-full border mt-4 w-6 h-6 bg-[#7E98DF]">
                <p className='text-white text-sm text-center align-center'>{notif}</p>
            </div>
        </div>
    </div>
  )
}

export default Chat