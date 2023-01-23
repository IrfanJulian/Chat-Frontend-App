import React, {useEffect, useState} from 'react'
import { useSearchParams } from 'react-router-dom'
import io from 'socket.io-client'
import ScrollToBottom from 'react-scroll-to-bottom'

const Chtaroom = () => {

    const [searchParams, setSearchParams] = useSearchParams()
    const [socket, setSocket] = useState()
    const [group, setGroup] = useState()
    const [username, setUsername] = useState()
    const [message, setMessage] = useState()
    const [messages, setMessages] = useState([])

    useEffect(()=>{
        const resultSocket = io(`http://localhost:7878`)
        setSocket(resultSocket)
        resultSocket.emit('initRoom', { room: searchParams.get('group'), username: searchParams.get('name') })
        setGroup(searchParams.get('group'))
        setUsername(searchParams.get('name'))
    }, [searchParams])
    console.log(setSearchParams);

    useEffect(()=>{
        if(socket){
            socket.off('newMsgGroup')
            socket.on('newMsgGroup', (data)=>{
                setMessages((current)=>[...current, data])
            })
            socket.on('notif', (data)=>{
                setMessages((current)=>[...current, data])
            })
        }
    }, [socket])

    const handleSend = () => {
        const dataMessage = {
            sender: username,
            message: message,
            room: group
        }
        socket.emit('msgGroup', dataMessage)
        setMessage('')
    }

  return (
    <div>
        <div className='container mx-auto'>
            <div className="my-20 flex">
                <div className="w-1/4">

                </div>
                <div className="w-3/4">
                    <p className='text-2xl font-semibold'>Group chat: {group}</p>
                    <ScrollToBottom>
                    {messages ? messages.map(msg=>
                    <div className='h-max py-4 mt-auto'>
                        <p>{msg.sender}</p>
                        <p>{msg.message} - {msg.date}</p>
                    </div>
                    ) : null }
                    </ScrollToBottom>
                </div>
            </div>
            <div className="flex">
                <input type="text" value={message} placeholder='enter your message . . . .' className='w-11/12 py3 px-5 border rounded-xl' onChange={(e)=>setMessage(e.target.value)} />
                <button onClick={handleSend} className='w-1/12 py-3 px-5 border rounded-xl'>Send</button>
            </div>
        </div>
    </div>
  )
}

export default Chtaroom