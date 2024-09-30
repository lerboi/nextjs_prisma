"use client"
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import DisplayRoomTypes from "@/components/DisplayRoomTypes";
import { useState, useEffect } from "react";

export default function Home(){
  const [roomTypes, setRoomTypes] = useState(null)
  const {data: session, status} = useSession()

  useEffect(() => {
    async function getRoomTypes(){
      const response = await fetch("/api/getRoomTypesAPI/", {
        method: "GET",
        headers: {
          "Content-Type" : "application/json"
        }
      })
      if (response.ok) {
        const roomtypes = await response.json()
        console.log("Room Types Received")
        setRoomTypes(roomtypes)
      }
      else {
        console.log("No Room Types")
        setRoomTypes(null)
      }
    }
    getRoomTypes()
  }, [])
  

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
    <div>
      {session && (
        <DisplayRoomTypes roomTypes={roomTypes} />
      )}
    </div>
    </>
  )
}