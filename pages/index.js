import React, { useEffect } from 'react';
import { useRouter } from "next/router";
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

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
          <>
            <div className="auth-info pr-2">
              <p>Hi, {session.user.name}</p>
            </div>
            <div className="dropdown">
              <ul className="dropdown-list">
                <li className="dropdown-item">
                  <button onClick={() => signOut()} className="cta">
                    Logout
                  </button>
                </li>
              </ul>
            </div>
            <br />
            <br />
            <br />
            <button type='button' onClick={() => createInvoice(1111.11, session)}>createInvoice</button>
          </>
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