import { connect } from "@/dbConfig/dbConfig";
import User from "@/model/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

connect();


export async function POST(request: NextRequest) {

    try {
        const reqBody = await request.json();
        const { email, password } = reqBody
        //validation
        console.log(reqBody);

        const user = await User.findOne({ email })

        if (!user) {
            return NextResponse.json({ error: "User does not exists" }, { status: 400 })

        }
        console.log(user)

        const validPassword = await bcrypt.compare(password, user.password)

        if (!validPassword) {
            return NextResponse.json({ error: "Check your credentials!" }, { status: 400 })

        }

        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }

        const token = jwt.sign(
            tokenData,
            process.env.JWT_SECRET as string,
            { expiresIn: '1d' }
        )

       const response = NextResponse.json({
            message: "logged In Successfully",
            success: true
        })

        response.cookies.set("token", token, {
            httpOnly: true //can only be modified on the server
        })

        return response;

    } catch (e: any) {
        return NextResponse.json({ error: e.message }, { status: 500 })
    }
}



// Bcrypt extracts the salt and cost factor from the stored hash.
// It re-hashes the provided plain password using the same salt and cost factor.
// Then it compares the newly generated hash with the stored hash.

