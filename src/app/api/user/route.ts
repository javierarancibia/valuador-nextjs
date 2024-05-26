import connectMongoDB from "../../../../lib/mongodb"
import AppUser from "../../../../models/appUser"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
    const { date, name, email } = await req.json()
    await connectMongoDB()
    await AppUser.create({ date, name, email });
    return NextResponse.json({ message: "User Registered" }, { status: 201 })
}