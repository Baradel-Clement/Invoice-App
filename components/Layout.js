import React, { useEffect } from 'react';
import Head from 'next/head';
import Sidebar from './Sidebar';
import { useInvoiceFormStateContext } from '../context/InvoiceForm';
import { useHomeStateContext } from '../context/Home';
import { closeModalStatusFilter } from '../utils/closeModal';
import InvoiceForm from './InvoiceForm';
import ConfirmDeletion from './ConfirmDeletion';
import ConfirmEmail from './ConfirmEmail';

const Layout = ({ children }) => {
  const { invoiceForm } = useInvoiceFormStateContext();
  const { statusFilter, setStatusFilter, confirmDeletion, confirmEmail } = useHomeStateContext();
  
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
      {
        invoiceForm.open && (
          <InvoiceForm />
        )
      }
      {
        confirmDeletion.open && (
          <ConfirmDeletion />
        )
      }
      {
        confirmEmail.open && (
          <ConfirmEmail />
        )
      }
      <Sidebar />
      <main className='Main'>
        {children}
      </main>
    </div>
  )
}

export default Layout