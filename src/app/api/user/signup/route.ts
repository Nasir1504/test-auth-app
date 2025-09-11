import { connect } from "@/dbConfig/dbConfig";
import User from "@/model/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcryptjs';
import { sendEmail } from '@/helpers/maillers';


connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { username, email, password } = reqBody
        //validation
        console.log(reqBody);

        const user = await User.findOne({ email })

        if (user) {
            return NextResponse.json({ error: "User already exits" }, { status: 400 })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })

        const savedUser = await newUser.save()
        console.log(savedUser);

        //send verification email

        await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id })

        return NextResponse.json({
            message: "User register successfully",
            success: true,
            savedUser
        })

    } catch (e: any) {
        return NextResponse.json({ error: e.message }, { status: 500 })
    }
}




// You are generating a salt using bcrypt.

// A salt is a random string added to your password before hashing it.

// The 10 is the number of rounds (cost factor). Higher number = more secure, but slower.