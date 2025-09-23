import { connect } from "@/dbConfig/dbConfig";
import User from "@/model/userModel";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";

connect();


export async function POST(request: NextRequest) {
    // extract data from token
    const userId = await getDataFromToken(request)
    //-password will excluded
    const user = await User.findOne({ _id: userId }).select("-password")

    //check if there is no user
    if (!user) {
        return NextResponse.json({ error: "Invalid Token" }, { status: 400 })
    }

    return NextResponse.json({
        message: "User found",
        data: user
    })
}


// Logout flow:
// Usually, during logout, you might still want to fetch the user 
// (to confirm who is logging out, or to show their profile info).
// But there’s no reason to send back their password.