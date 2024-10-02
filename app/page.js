"use client"
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import DisplayRoomTypes from "@/components/DisplayRoomTypes";
import { useState, useEffect } from "react";

export default function Home(){
  const [roomTypes, setRoomTypes] = useState(null)
  const {data: session, status} = useSession()
  const [bookings, setBookings] = useState(null)

  //fetch/generate roomTypes
  useEffect(() => {
    async function handleRoomTypes(){
      await generateRoomTypes()
      await getRoomTypes()
    }

    async function generateRoomTypes(){
      const response = await fetch("/api/generateRoomTypesAPI/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      })
      if(response.ok){
        const rooms = await response.json()
        if(rooms.roomTypes){
          console.log("Room records Created")
        }
        console.log("Creating records failed")
      }
      else{
        console.log("Creating records failed")
      }
    }
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
    
    handleRoomTypes()
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
      {!session && (
        <>
        <button className="p-2 outline outline-white"><Link href="/authentication/signInPage">Sign In</Link></button>
        <button className="p-2 outline outline-white"><Link href="/authentication/registerPage">Register</Link></button>
        </>
      )}
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
      <>
      <h1 className="underline mt-5">Bookings</h1>
      {bookings.map(booking => {
        return (
          <div key={booking.id} className="flex gap-3 border-b-2 border-b-white w-[50%] mt-4">
            <p>{booking.Room.roomType.name}</p> 
            <p>{booking.bookDate}</p>
            <p>{booking.bookTime[0] + " - " + booking.bookTime[booking.bookTime.length-1]}</p>
          </div>
        )
      })}
      </>
      :
      <p>No bookings</p>}
    </div>
    </>
  )
}