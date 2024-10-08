import { NextResponse } from "next/server";
import prisma from "@/app/db";

export async function POST(req){
    const {date, totalTime, selectedRoom, email} = await req.json()
    console.log("The booking data will be: " + date, totalTime, selectedRoom, email)

    //check if there are dupe timeslots in database
    const dupeEntries = await prisma.booking.findMany({
        where: {
            userEmail: email,
            bookTime: {
                array_contains: totalTime
            },
            bookDate: date,
            roomId: selectedRoom
        }
    })
    if(!dupeEntries.length >= 1){
        const newBooking = await prisma.booking.create({
            data:{
                bookDate: date,
                bookTime: totalTime,
                roomId: selectedRoom,
                userEmail: email
            }
        })
        return NextResponse.json(newBooking, {status: 200})
    }
    else{
       return NextResponse.json({message: "Something went wrong"}, {status: 401})
    }

    return NextResponse.json({message:"error"}, {status: 401})
}