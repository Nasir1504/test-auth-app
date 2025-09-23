import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connect } from "@/dbConfig/dbConfig";
import User from "@/model/userModel";

connect();

export async function POST(request: NextRequest) {
    try {
        const { token, password } = await request.json();

        const user = await User.findOne({
            forgotPasswordToken: token,
            forgotPasswordTokenExpiry: { $gt: Date.now() }
        })

        if (!user) {
            return NextResponse.json({ error: "Invalid or expired token" }, { status: 400 });

        }

        console.log(user);
        // hash new password
        const hashedPassword = await bcrypt.hash(password, 10);

        user.password = hashedPassword;
        // clear reset fields
        user
        user.resetPasswordToken = undefined;
        user.resetPasswordExpiry = undefined;

        await user.save();

        return NextResponse.json({
            message: "Password reset successfully",
            success: true
        }, { status: 200 })

    } catch (e: any) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}
