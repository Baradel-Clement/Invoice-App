import React, { useEffect } from "react"
import { getCsrfToken } from "next-auth/react"
import { useSession } from 'next-auth/react';
import { useRouter } from "next/router";
import { getAllUsers } from "./api/user";

export default function Login({ csrfToken, users }) {
  const router = useRouter();
  const { data: session, status } = useSession();
  useEffect(() => {
    if (status === 'authenticated') {
      router.replace("/")
    }
  })
  console.log(users)
  return (
    <div className="Login">
      <p className="bold XL violet">Login</p>
      <form method="post" action="/api/auth/signin/email">
        <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
        <label className="M true-lavender" htmlFor="email">Email</label>
        <input className="bold M" type="email" id="email" name="email" placeholder="email@example.com" />
        <button className="button2 radiusoff" type="submit">Sign in with Email</button>
        {
          users.map((user) => (
            <p key={user.id}>{user.email}d {user.emailVerified}</p>
          ))
        }
      </form>
    </div>
  )
}

export async function getServerSideProps(context) {
  const csrfToken = await getCsrfToken(context);
  const users = await getAllUsers()
  const updatedUsers = JSON.parse(JSON.stringify(users))
  console.log(updatedUsers)
  return {
    props: { csrfToken, users: updatedUsers },
  }
}