import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";


export const getDataFromToken = (request: NextRequest) => {
    try {

        const token = request.cookies.get("token")?.value || "";

        const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET!)

        return decodedToken.id

    } catch (e: any) {
        throw new Error(e.message)
    }
}


//jwt.verify(token, secret):
// If the token is valid and not expired → it decodes the payload.
// If the token is invalid/expired/tampered → it throws an error.