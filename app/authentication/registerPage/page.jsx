"use client"
import { useState } from "react"
import Link from "next/link"

export default function RegisterPage(){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    

    async function handleSubmit(e){
        e.preventDefault()
        const response = await fetch("/api/registerAPI", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
        if(response.ok){
            console.log("Response received")
            window.location.href = "/"
        }
        else{
            const data = await response.json()
            setError(data.message)
        }
    }

    return(
        <>
        <form onSubmit={handleSubmit}>
            <div className="flex justify-center items-center mt-40 flex-col gap-4">
                <h1>REGISTER PAGE</h1>
                <div>
                    <label>Email</label>
                    <input className="text-black" value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div>
                    <label>password</label>
                    <input className="text-black" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <p>{error}</p>
                <button type="submit">Submit</button>
                <p><Link href="/authentication/registerPage">Register Account</Link></p>
            </div>
        </form>
        </>
    )
}