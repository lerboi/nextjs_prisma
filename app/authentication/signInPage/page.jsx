"use client"
import { signIn } from "next-auth/react"
import Link from "next/link"
import { useState } from "react"

export default function Home(){
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  async function handleSubmit(e){
    e.preventDefault()
    const response = await signIn("credentials", {
      redirect: false,
      email: email,
      password: password 
    })
    if(response.ok){
      window.location.href = "/"
    } 
    else {
      setError("something went wrong")
    }
  }

  return(
    <>
    <form onSubmit={handleSubmit}>
      <div className="flex justify-center items-center mt-40 flex-col gap-4">
        <div>
          <label>email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} className="text-black"/>
        </div>
        <div>
          <label>password</label>
          <input value={password} onChange={(e) => setPassword(e.target.value)} className="text-black"/>
        </div>
        <button>Submit</button>
        <p><Link href="/authentication/registerPage">Register Account</Link></p>
        <p>{error && error}</p>
      </div>
    </form>
    </>
  )
}