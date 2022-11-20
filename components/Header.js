import React from 'react'
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import arrowDown from '../public/assets/icon-arrow-down.svg';
import plus from '../public/assets/icon-plus.svg';

const Header = () => {
  const { data: session } = useSession();
  return (
    <div className='Header'>
      <div className='Header-left'>
        <h2 className='XXL bold'>Fais la petite interface filter :)</h2>
        <p className='true-lavender S'>Hi {session.user.name}, you have 7 total invoices</p>
      </div>
      <div className='Header-filter'>
        <p className='M'>Filter by status</p>
        <Image src={arrowDown} alt='arrow' />
      </div>
      <button type="button" className='button button1'>
        <span />
        <Image src={plus} alt="plus" />
        <p className='bold S'>New Invoice</p>
      </button>
    </div>
  )
}

export default Header