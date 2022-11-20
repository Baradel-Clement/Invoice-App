import React from 'react';
import Head from 'next/head';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  return (
    <div className='Layout'>
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