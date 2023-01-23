import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import logo from '../assets/logo-google.png'

const Register = () => {

    const navigate = useNavigate()

    const [register, setRegister] = useState({
        username: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setRegister({
            ...register,
            [e.target.name]: e.target.value
        });
        console.log(e.target.value)
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await axios({
                method: 'POST',
                url: 'http://localhost:7878/user/register',
                data: register
            })
            Swal.fire({
                icon: 'success',
                title: 'Success...',
                text: 'Register Sucess!'
              })
            navigate('/login');
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Register Failed!',
                text: error
        })
        }
    }

  return (
    <div className='bg-[#E5E5E5]'>
        <div className="container mx-auto grid w-screen h-screen">
            <div className="card w-[32rem] mx-auto my-auto border bg-white rounded-3xl py-10 px-16">
                <p className='text-center text-3xl font-bold text-[#7E98DF]'>Register</p>
                <p className='text-lg mt-7'>Let's create your account!</p>
                <form onSubmit={handleRegister} className='grid mt-10 mb-5'>
                    <label htmlFor="username" className='text-md text-gray-500'>Name</label>
                    <input type="text" name='username' id='username' onChange={handleChange} value={register.username} className='border-b outline-none border-black text-xl font-semibold py-2' />
                    <label htmlFor="email" className='mt-7 text-md text-gray-500'>Email</label>
                    <input type="email" name='email' id='email' onChange={handleChange} value={register.email} className='border-b outline-none border-black text-xl font-semibold py-2' />
                    <label htmlFor="password" className='mt-7 text-md text-gray-500'>Password</label>
                    <input type="password" name='password' id='password' onChange={handleChange} value={register.password} className='border-b outline-none border-black text-xl font-semibold py-2' />
                    <button type='submit' className='bg-[#7E98DF] mt-12 py-5 rounded-full text-white text-lg font-semibold'>Register</button>
                </form>
                <p className='text-gray-400 text-center'>Register With</p>
                <button type='' className='my-5 w-full border border-[#7E98DF] py-5 rounded-full text-black text-lg font-semibold'>
                    <div className="flex justify-center">
                        <img src={logo} className='w-[2rem] h-[2rem]' alt="logo" />
                        <p className='text-lg text-[#7E98DF] ml-5'>Google</p>
                    </div>
                </button>
            </div>
        </div>
    </div>
  )
}

export default Register