import React from 'react';
import Head from 'next/head';

const Layout = ({ children }) => {
  return (
    <div className='Layout'>
      <Head>
        <title>Invoice App</title>
      </Head>
      <main className='main-container'>
        {children}
      </main>
    </div>
  )
}

export default Layout