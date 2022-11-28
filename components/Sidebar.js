import React from 'react';
import Image from 'next/image';
import logo from '../public/assets/logo.svg'
import { signOut } from "next-auth/react"
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

const Sidebar = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

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
        {
          status === 'authenticated' && (
            <button onClick={() => {
              signOut();
              router.push('/login');
            }} className='button5 logout'>Logout</button>
          )
        }
      </div>
    </div>
  )
}

export default Sidebar