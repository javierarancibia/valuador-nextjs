import connectMongoDB from "../../../../lib/mongodb"
import Report from "../../../../models/report"
import AppUser from "../../../../models/appUser"
import { NextRequest, NextResponse } from "next/server"
import { getToken } from 'next-auth/jwt';

export async function GET(req: NextRequest) {
    const {searchParams} = new URL(req.url);
    const informeIdParam = searchParams.get("informeId");

    try {
        await connectMongoDB()
        // Extract the token from the request
        const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

        if (!token) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Extract the user's email from the token
        const email = token.email;

        if (!email) {
            return NextResponse.json({ error: 'Email is required' }, { status: 400 });
        }

        // If report id comes in params, find Report in DB and return it
        if (informeIdParam) {
            const report = await Report.findById(informeIdParam)
            return NextResponse.json({ message: 'Report found', report }, { status: 200 });
        }

        // Find the MongoDB user email to get all reports   
        const reports = await AppUser.findOne({ email }).populate('reports');
        return NextResponse.json(reports)

    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Failed to get reports' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        await connectMongoDB()
        const { property, reference } = await req.json()

        // Extract the token from the request
        const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

        if (!token) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Extract the user's email from the token
        const email = token.email;

        if (!email) {
            return NextResponse.json({ error: 'Email is required' }, { status: 400 });
        }

        // Find the MongoDB user ID using the email
        const user = await AppUser.findOne({ email });
        
        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }
        const report = await Report.create({ date: new Date(), property, reference, appUser: user._id });
        user.reports.push(report._id);
        await user.save();

        return NextResponse.json({ message: 'Report created successfully', property, reportId: report._id }, { status: 201 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Failed to create report' }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const request = await req.json()
        const mongoResponse = await Report.findByIdAndDelete(request.reportId)
        return NextResponse.json({ message: "Report Removed", dbResponse: mongoResponse }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: "Failed to remove report" }, { status: 500 })
    }
}