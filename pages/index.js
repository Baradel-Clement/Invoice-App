import React, { useEffect } from 'react';
import { useRouter } from "next/router";
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import Header from '../components/Header';

const createInvoice = async (total, session) => {
  let invoice = {
    total,
    userId: session.user.id
  };
  let res = await fetch("api/invoice", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(invoice)
  })

  const newInvoice = await res.json();
  console.log("Create successful", { newInvoice });
  // add to invoices list (global context state)
  // setinvoices({ invoice: newinvoice, type: "add" });
}

const Home = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
   useEffect(() => {
     if (status === 'unauthenticated') {
       router.replace("/login")
     } 
   })

  return (
    <div className='Home'>
      {
        status === 'authenticated' && (
          <Header />
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

export default Home