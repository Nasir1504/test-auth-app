import { connect } from "@/dbConfig/dbConfig";
import User from "@/model/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcryptjs';
import { sendEmail } from '@/helpers/maillers';


connect();

export async function POST(request: NextRequest) {

    try {
        const { email } = await request.json();
        if (!email) {
            return NextResponse.json({ success: false, message: "Email is required" }, { status: 400 });
        }
        const user = await User.findOne({ email })

        if (!user) {
            return NextResponse.json({
                success: false,
                message: "User not found. Please enter a valid email."
            }, { status: 404 })
        }

        await sendEmail({ email, emailType: "RESET", userId: user._id })

        return NextResponse.json({
            success: true,
            message: "Password reset link sent to your email",
        });

    } catch (e: any) {
        return NextResponse.json(
            { success: false, message: "Something went wrong" },
            { status: 500 }
        );
    }
}