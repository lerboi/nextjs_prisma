import { NextResponse } from "next/server";
import prisma from "@/app/db";

export async function GET(){
    const roomtypes = await prisma.roomType.findMany()

    if (roomtypes){
        return NextResponse.json(roomtypes, {status:200})
    }
    else {
        return NextResponse.json({status: 401})
    }
}