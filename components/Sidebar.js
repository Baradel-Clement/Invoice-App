import React from 'react';
import Image from 'next/image';
import logo from '../public/assets/logo.svg'
import profilePic from '../public/assets/image-avatar.jpg'

const Sidebar = () => {
  return (
    <div className='Sidebar'>
      <div className='Sidebar-logo'>
        <Image
          src={logo}
          alt="logo"
        />
        <span className='shape' />
      </div>
      <div className='Sidebar-profile'>
        <Image
          src={profilePic}
          alt="profilePic"
        />
      </div>
    </div>
  )
}

export default Sidebar