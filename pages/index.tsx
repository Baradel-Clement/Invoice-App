import React, { useEffect } from 'react';
import type { ReactElement } from 'react'
import Layout from '../components/Layout'
import type { NextPageWithLayout } from './_app'
import { useSession, getSession } from 'next-auth/react';
import Link from 'next/link';
import { Toaster } from 'react-hot-toast';
import Header from '../components/Header';
import Invoices from '../components/Invoices';
import ViewInvoice from '../components/ViewInvoice';
import { getInvoices } from './api/invoice';
import { useHomeStateContext } from '../context/Home';
import { GetServerSideProps } from 'next';
import { IInvoice } from '../types/home';

type Props = {
  invoices: IInvoice[];
}

const Home: NextPageWithLayout<Props> = ({invoices}) => {
  const { status } = useSession();
  const { setInvoices, viewInvoiceMode } = useHomeStateContext();

  useEffect(() => {
    console.log(invoices)
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

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
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