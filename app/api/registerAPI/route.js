import { NextResponse } from "next/server";
import prisma from "@/app/db";
import { z } from "zod"
import bcrypt from "bcrypt"

const credentialsSchema = z.object({
    email: z.string().email({message: "Invalid Email"}),
    password: z.string().min(8, {message: "Password must be at least 8 characters"})
})

export async function POST(req){
    const credentials = await req.json()
    const validCreds = credentialsSchema.safeParse(credentials)

    if(!validCreds.success){
        console.log("Invalid Credentials")
        const errors = validCreds.error.issues.map(err => err.message)
        return NextResponse.json({message: errors}, {status: 401})
    }
    else {
        const existingUser = await prisma.user.findUnique({
            where: {
                email: credentials.email
            }
        })
        if(existingUser){
            console.log("Account already exists")
            return NextResponse.json({message: "Account with that email already exists"}, {status: 402})
        }
        else{
            const hashedPass = await bcrypt.hash(credentials.password, 10)
            const newUser = await prisma.user.create({
                data: {
                    email: credentials.email,
                    password: hashedPass
                }
            })
            return NextResponse.json(newUser, {status: 200})
        }
    }

    return NextResponse.json({message: "error", status: 400})
}