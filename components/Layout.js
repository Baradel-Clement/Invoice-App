import React from 'react';
import Head from 'next/head';
import Sidebar from './Sidebar';
import { useStateContext } from '../context/StateContext';
import { closeModalStatusFilter } from '../utils/closeModal';

const Layout = ({ children }) => {
  const { statusFilter, setStatusFilter } = useStateContext();
  return (
    <div className='Layout' onClick={(e) => {
      if (statusFilter) {
        if (closeModalStatusFilter('closeModalStatusFilterOff', e)) {
          setStatusFilter(false)
        }
      }
    }}>
      <Head>
        <title>Invoice App</title>
      </Head>
      <Sidebar />
      <main className='Main'>
        {children}
      </main>
    </div>
  )
}

export default Layout