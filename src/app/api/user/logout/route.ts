import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";

connect();

// use POST when dealing with sessions
export async function GET(request: NextRequest) {

    try {
        const response = NextResponse.json({
            message: "logout Successfully",
            success: true
        })

        response.cookies.set("token", "",
            {
                httpOnly: true, //can only be modified on the server
                expires: new Date(0)

            },
        )
        console.log("RES: ", response)
        return response;

    } catch (e: any) {
        return NextResponse.json({ error: e.message }, { status: 500 })
    }
}