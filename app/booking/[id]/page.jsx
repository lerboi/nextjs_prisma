"use client"
import DisplayRooms from "@/components/DisplayRooms";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

export default function Booking({ params }){
    const {data: session, status} = useSession()
    const roomTypeId = useParams()
    const [rooms, setRooms] = useState(null)
    const [date, setDate] = useState("")
    const [selectedRoom, setSelectedRoom] = useState(null)

    let Timeslots = [
        "09:00", "10:00", "11:00", "12:00", "13:00", 
        "14:00", "15:00", "16:00", "17:00", "18:00", 
        "19:00", "20:00"
      ]

    //timeslots logic
    useEffect(() => {
        async function checkBookings(){
            //fetch data from bookings where (email, date, roomid)
            const response = await fetch(`/api/bookingsAPI/${session.user.email}/${date}/${selectedRoom}`, {
                method: "GET",
                headers: {
                    "Content-Type" : "application/json"
                }
            })
            if(response){
                // delete timeslots from array logic

            }
            else {
                return null
            }
        }
    }, [date])

    //get rooms
    useEffect(() => {
        async function getRooms(){
            const response = await fetch(`/api/getRoomsAPI/${roomTypeId.id}`, {
                method: "GET",
                headers: {
                    "Content-Type" : "application/json"
                }
            })
            if (response.ok) {
                const rooms = await response.json()
                setRooms(rooms)
            }
            else {
                setRooms (null)
            }
        }
        getRooms()
    }, [])


    return(
        <div className="mt-10 m-4">
            <div className="flex flex-col gap-3 mb-3">
                <label>Selected Date: {date}</label>
                <label>Selected Room: {selectedRoom}</label>
            </div>
            <div className="flex gap-4 mt-5">
                <input value={date} onChange={(e) => setDate(e.target.value)}  id="inputDate" className="text-black" type="date" />
            </div>
            <div>
                <DisplayRooms rooms={rooms} setSelectedRoom={setSelectedRoom}/>
            </div>
            <div className="grid grid-cols-6 mt-5">
                <h1 className="col-span-6">Timeslots</h1>
                {(date && selectedRoom) && Timeslots.map(timeslot => {
                    return(
                        <div key={timeslot} className="m-1 p-1 outline outline-white rounded hover:text-black hover:bg-white">
                            <p>{timeslot}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
