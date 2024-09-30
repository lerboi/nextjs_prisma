"use client"
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

export default function Home(){
  const {data: session, status} = useSession()

  return(
    <>
    <div className="flex m-5 gap-6">
      <button className="p-2 outline outline-white"><Link href="/authentication/signInPage">Sign In</Link></button>
      <button className="p-2 outline outline-white"><Link href="/authentication/registerPage">Register</Link></button>
      <button onClick={() => signOut()} className="p-2 outline outline-white hover:cursor-pointer">Sign Out</button>
    </div>
    <div>
      {session? 
      <p>Welcome {session.user?.email || "User"}</p>
      : 
      <p>Not logged in</p>
       }
    </div>
    </>
  )
}