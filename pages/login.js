import React, { useEffect } from "react"
import { getCsrfToken } from "next-auth/react"
import { useSession } from 'next-auth/react';
import { useRouter } from "next/router";

export default function Login({ csrfToken }) {
  const router = useRouter();
  const { data: session, status } = useSession();
  useEffect(() => {
    if (status === 'authenticated') {
      router.replace("/")
    }
  })
  return (
    <div className="Login">
    <p className="bold XL violet">Login</p>
      <form method="post" action="/api/auth/signin/email">
        <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
        <label className="M true-lavender" htmlFor="email">Email</label>
        <input className="bold M" type="email" id="email" name="email" placeholder="email@example.com" />
        <button className="button2 radiusoff" type="submit">Sign in with Email</button>
      </form>
    </div>
  )
}

export async function getServerSideProps(context) {
  const csrfToken = await getCsrfToken(context)
  return {
    props: { csrfToken },
  }
}