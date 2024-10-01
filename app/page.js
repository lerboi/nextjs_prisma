"use client"
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import DisplayRoomTypes from "@/components/DisplayRoomTypes";
import { useState, useEffect } from "react";

export default function Home(){
  const [roomTypes, setRoomTypes] = useState(null)
  const {data: session, status} = useSession()
  const [bookings, setBookings] = useState(null)
  //fetch roomTypes
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

  //fetch bookings
  useEffect(() => {
    async function getBookings(){
      console.log(status)
      const response = await fetch(`/api/getBookingsAPI/${session?.user?.email}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
      })
      if(response.ok){
        console.log("Bookings Received")
        const bookings = await response.json()
        setBookings(bookings)
        console.log("Bookings set to " + bookings)
      }
    }
    getBookings()
  }, [status, session])

  if (status === "loading"){
    return(
      <p>Loading...</p>
    )
  }

  return(
    <>
    <div className="flex m-5 gap-6">
      <button className="p-2 outline outline-white"><Link href="/authentication/signInPage">Sign In</Link></button>
      <button className="p-2 outline outline-white"><Link href="/authentication/registerPage">Register</Link></button>
      <button onClick={() => signOut()} className="p-2 outline outline-white hover:cursor-pointer">Sign Out</button>
    </div>
    <div>
      {session? 
      <p>Welcome {session?.user?.email || "User"}</p>
      : 
      <p>Not logged in</p>
       }
    </div>
    <div>
      {session && (
        <DisplayRoomTypes roomTypes={roomTypes} />
      )}
    </div>
    <div>
      {bookings? 
      <p>{bookings.map(booking => {
        return (
          <div className="flex gap-3 border-b-2 border-b-white w-[50%] mt-4">
          <p>{booking.bookDate}</p>
          <p>{booking.bookTime}</p>
          </div>
        )
      })}</p>
      :
      <p>No bookings</p>}
    </div>
    </>
  )
}