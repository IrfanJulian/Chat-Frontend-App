import React from 'react'
import menu from '../assets/menu.png'
import {
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Button,
  } from "@material-tailwind/react";
import { useNavigate } from 'react-router-dom';
   
  export default function Dropdowns({onClick, onClick2}) {

    const navigate = useNavigate()
    const handleLogout = () => {
      localStorage.clear()
      navigate('/login')
    }

    return (
      <Menu>
        <MenuHandler>
          <Button color='white' className='ml-auto' variant="gradient"><img src={menu} alt="" /></Button>
        </MenuHandler>
        <MenuList className='bg-[#7E98DF] text-white'>
          <MenuItem onClick={onClick}>Settings</MenuItem>
          <MenuItem>Contacts</MenuItem>
          <MenuItem>Calls</MenuItem>
          <MenuItem>Save messages</MenuItem>
          <MenuItem>Invite Friends</MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </MenuList>
      </Menu>
    );
  }