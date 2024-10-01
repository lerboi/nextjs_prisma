"use client"
import DisplayRooms from "@/components/DisplayRooms";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import DisplayTimeslots from "@/components/DisplayTimeslots";

export default function Booking({ params }){
    const {data: session, status} = useSession()
    const roomTypeId = useParams()
    const [rooms, setRooms] = useState(null)
    const [selectedTime, setSelectedTime] = useState([])
    const [error, setError] = useState(null)
    
    const [selectedRoom, setSelectedRoom] = useState(null)
    const [date, setDate] = useState("")
    const [totalTime, setTotalTime] = useState([])

    let Timeslots = [
        "09:00", "10:00", "11:00", "12:00", "13:00", 
        "14:00", "15:00", "16:00", "17:00", "18:00", 
        "19:00", "20:00"
      ]

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

    //log selectTime + logic
    useEffect(() => {
        console.log("The selected Timings are " + selectedTime)
        if (selectedTime.length == 2) {
            let sortedTime = []
            sortedTime = selectedTime
            selectedTime.sort((next, first) => {
                const firstHour = Number(first.slice(0,2))
                const nextHour = Number(next.slice(0,2))
                return nextHour - firstHour
            })
            console.log("after sorting: " + sortedTime)
            //edit the sorted time to include all the time in between
            let total = []
            for(let i = Number(sortedTime[0].slice(0,2)) ; i <= Number(sortedTime[1].slice(0,2)) ; i++) {
                total.push(i)
            }
            total = total.map(item => {
                if(item < 10){
                    return `0${item}:00`
                }
                else{
                    return `${item}:00`
                }
            })
            setTotalTime(total)
        }
        if(selectedTime.length == 1){
            setTotalTime(selectedTime)
        }
    }, [selectedTime])

    //log totaltime + logic
    useEffect(() => {
        console.log(totalTime)
    }, [totalTime])

    //handle logic of selected Time
    function handleSelectedTime(timeslot){
        if (selectedTime.includes(timeslot)){
            setSelectedTime(selectedTime.filter(item => item !== timeslot))
            setTotalTime([])
        }
        if (selectedTime.length < 2 && !selectedTime.includes(timeslot)){
            setSelectedTime(prev => [...prev, timeslot])
        }
    }

    //submit logic
    async function handleSubmit(e){
        e.preventDefault()
        const response = await fetch("/api/bookingsAPI", {
            method: "POST",
            headers:{
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                date: date,
                totalTime: totalTime,
                selectedRoom: selectedRoom,
                email: session.user.email
            })
        })
        if(!response.ok){
            const data = await response.json()
            setError(data.message)
        }
        else {
            const data = await response.json()
            const {bookDate, bookTime, roomId, userEmail} = data 
            console.log("Succesfully booked")
            alert(`${userEmail} has succesfully booked ${roomId} on ${bookDate} at ${bookTime}`)
            window.location.href = "/"
        }
    }


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
                <DisplayTimeslots date={date} selectedRoom={selectedRoom} Timeslots={Timeslots} selectedTime={selectedTime} handleSelectedTime={handleSelectedTime} totalTime={totalTime}/>
            </div>
            <div>
                {error && (
                    <p>{error}</p>
                )}
            </div>
            <div className="absolute bottom-0 w-full flex justify-center mb-10">
                <button type="submit" onClick={handleSubmit} className={`rounded outline outline-white p-2 w-[70%] ${date && totalTime.length >= 1 && selectedRoom? `opacity-100` : `cursor-not-allowed opacity-35` }`}>Submit</button>
            </div>
        </div>
    )
}
