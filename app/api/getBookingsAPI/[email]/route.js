import { NextResponse } from "next/server";
import prisma from "@/app/db";

export async function GET(request, {params}){
    const {email} = params
    console.log(email)
    const bookings = await prisma.booking.findMany({
        where: {
            userEmail: email
        }
    })
    if(bookings){
        return NextResponse.json(bookings, {status: 201})
    }
    else{
        return NextResponse.json({status: 401})
    }
}