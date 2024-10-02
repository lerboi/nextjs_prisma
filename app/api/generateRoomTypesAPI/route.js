import { NextResponse } from "next/server";
import prisma from "@/app/db";

export async function GET(){
    const checkExist = await prisma.roomType.findMany()
    if (checkExist.length === 0){
        const roomTypes = await prisma.roomType.createMany({
            data: [
                {name: "Deluxe",  description: "Perfect for Two", price: 10.00},
                {name: "Private",  description: "Enough for Four", price: 15.00},
                {name: "Corporate",  description: "Good for all", price: 20.00}
            ]
        })

        const createdRoomTypes = await prisma.roomType.findMany()
        const deluxeRoomId = createdRoomTypes.find(room => room.name === "Deluxe").id
        const privateRoomId = createdRoomTypes.find(room => room.name === "Private").id
        const corporateRoomId = createdRoomTypes.find(room => room.name === "Corporate").id

        const rooms = await prisma.room.createMany({
            data: [
                {name: "Deluxe 1", roomTypeId: deluxeRoomId},
                {name: "Deluxe 2", roomTypeId: deluxeRoomId},
                {name: "Deluxe 3", roomTypeId: deluxeRoomId},
                {name: "Private 1", roomTypeId: privateRoomId},
                {name: "Private 2", roomTypeId: privateRoomId},
                {name: "Corporate 1", roomTypeId: corporateRoomId},
            ]
        })
        return NextResponse.json(roomTypes, {status: 202})
    }
    else {
        return NextResponse.json({status:401})
    }
}