import { NextResponse } from "next/server";
import prisma from "@/app/db";

export async function GET(request, { params }){
    const {roomTypeId} = params
    const response = await prisma.room.findMany({
        where: {
            roomTypeId: Number(roomTypeId)
        }
    })
    if(response) {
        return NextResponse.json(response, {status: 200})
    }
    else {
        return NextResponse.json(null, {status:401})
    }
}
