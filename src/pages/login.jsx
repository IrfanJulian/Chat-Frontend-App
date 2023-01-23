import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import io from 'socket.io-client'
import Swal from 'sweetalert2';
import logo from '../assets/logo-google.png'

const Login = ({ setSocket }) => {

    const navigate = useNavigate()
    const [credential, setCredential] = useState({
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        setCredential({
            ...credential,
            [e.target.name]: e.target.value
        })
    }

    const handleLogin = async(e) => {
        e.preventDefault()
        try {
            const res = await axios({
                method: 'POST',
                url: `http://localhost:7878/user/login`,
                data: credential
            })
            const respData = res.data.data
            localStorage.setItem('token', respData.token)
            localStorage.setItem('id', respData.id)
            localStorage.setItem('username', respData.username)
            const resSocket = io(`http://localhost:7878`, {
                query: {
                    token: respData.token
                }
            })
            // console.log(respData);
            setSocket(resSocket);
            Swal.fire({
                icon: 'success',
                title: 'Success...',
                text: 'Login Sucess!'
              })
              navigate('/room')
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Login failed',
                text: error
            })
        }
    }

  return (
    <div className='bg-[#E5E5E5]'>
        <div className="container mx-auto grid w-screen h-screen">
            <div className="card w-[32rem] mx-auto my-auto border bg-white rounded-3xl py-10 px-16">
                <p className='text-center text-3xl font-bold text-[#7E98DF]'>Login</p>
                <p className='text-lg mt-7'>Hi, Welcome Back!</p>
                <form onSubmit={handleLogin} className='grid my-5'>
                    <label htmlFor="email" className='text-md text-gray-500'>Email</label>
                    <input type="email" name='email' onChange={handleChange} value={credential.email} id='email' className='border-b-2 outline-none border-black text-xl font-semibold py-2' />
                    <label htmlFor="password" className='mt-7 text-md text-gray-500'>Password</label>
                    <input type="password" name='password' onChange={handleChange} value={credential.password} id='password' className='border-b-2 outline-none border-black text-xl font-semibold py-2' />
                    <Link to={'/'} className='text-lg my-9 text-end text-[#7E98DF]'>Forgot Password</Link>
                    <button type='submit' className='bg-[#7E98DF] py-5 rounded-full text-white text-lg font-semibold'>Login</button>
                </form>
                <p className='text-gray-400 text-center'>Login With</p>
                <button type='' className='my-5 w-full border border-[#7E98DF] py-5 rounded-full text-black text-lg font-semibold'>
                    <div className="flex justify-center">
                        <img src={logo} className='w-[2rem] h-[2rem]' alt="logo" />
                        <p className='text-lg text-[#7E98DF] ml-5'>Google</p>
                    </div>
                </button>
                <p className='text-center'>Don't have an account?<Link to={'/register'} className='ml-1 font-semibold text-[#7E98DF]'>Sign Up</Link> </p>
            </div>
        </div>
    </div>
  )
}

export default Login


// const navigate = useNavigate()
// const [credential, setCredential] = useState({
//     email: '',
//     password: ''
// })

// const handleChange = (e) => {
//     setCredential({
//         ...credential,
//         [e.target.name]: e.target.value
//     })
// }

// const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//         const resLogin = await axios({
//             method: 'POST',
//             url: `http://localhost:2222/user/login`,
//             data: credential
//         });
//         const respData = resLogin.data.data;
//         localStorage.setItem('token', respData.token);
//         localStorage.setItem('refreshToken', respData.refreshToken);
//         localStorage.setItem('id', respData.id);
//         const resSocket = io('http://localhost:2222', {
//             query: {
//                 token: respData.token
//             }
//         });
//         setSocket(resSocket)
//         alert('Login success');
//         navigate('/home');
//     } catch (error) {
//         console.log(error);
//     }
// }