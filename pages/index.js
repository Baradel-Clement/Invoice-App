import React, { useEffect } from 'react';
import { useSession, getSession } from 'next-auth/react';
import Link from 'next/link';
import Header from '../components/Header';
import Invoices from '../components/Invoices';
import ViewInvoice from '../components/ViewInvoice';
import { getInvoices } from './api/invoice';
import { useHomeStateContext } from '../context/Home';
import { Toaster } from 'react-hot-toast';

const Home = ({ invoices }) => {
  const { status } = useSession();
  const { setInvoices, viewInvoiceMode } = useHomeStateContext();
  
  useEffect(() => {
    setInvoices(invoices);
  }, [invoices, setInvoices])

  return (
    <div className='Home'>
      <Toaster />
      {
        status === 'authenticated' && viewInvoiceMode.mode === false && (
          <>
            <Header />
            <Invoices />
          </>
        )
      }
      {
        status === 'authenticated' && viewInvoiceMode.mode === true && (
          <ViewInvoice />
        )
      }
      {
        status === 'unauthenticated' && (
          <Link href='/login'>--) Please, login (--</Link>
        )
      }
    </div>
  )
}

export const getServerSideProps = async (ctx) => {
  const session = await getSession(ctx);
  if (session) {
    const invoices = await getInvoices(session.user.id)
    const updatedInvoices = JSON.parse(JSON.stringify(invoices))

    return { props: { invoices: updatedInvoices } }
  }
  else return {
    props: { invoices: [] },
    redirect: {
      permanent: false,
      destination: "/login"
    }
  }

}

export default Home