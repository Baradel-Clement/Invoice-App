import React, { useEffect } from 'react';
import { useRouter } from "next/router";
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import Header from '../components/Header';

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
            <Header />
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