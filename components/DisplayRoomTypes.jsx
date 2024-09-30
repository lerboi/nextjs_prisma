"use client"
import Link from "next/link"

export default function DisplayRoomTypes({ roomTypes }){
    return(
        <div className="p-5 outline m-2 outline-white">
            {roomTypes && roomTypes.map(room => {
                return (
                    <div key={room.id} className="hover:cursor-pointer hover:border-b-[1.5px] hover:border-b-white">
                        <p><Link href={`/booking/${room.id}`}>{room.name}</Link></p>
                    </div>
                )
            })}
        </div>
    )
}