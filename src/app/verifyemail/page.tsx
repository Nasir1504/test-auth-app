"use client"

import { useState, useEffect } from "react"
import axios from "axios";
// import { useRouter } from "next/router";
import Link from "next/link";

export default function VerifyEmail() {
  // const router = useRouter()
  const [token, setToken] = useState("");
  const [varified, setVerified] = useState(false);
  const [error, setError] = useState(false);


  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/user/verifyemail", { token })
      setVerified(true)
      setError(false)

    } catch (error: any) {
      setError(true)
      console.log(error.response.data)
    }
  }

  useEffect(() => {
    setError(false)
    const uriToken = window.location.search.split("=")[1]
    setToken(uriToken || "");

    // const { query } = router;
    // const uriToken = query.token;
    // setToken(uriToken || "");

  }, [])

  useEffect(() => {
    setError(false)

    if (token.length > 0) {
      verifyUserEmail()
    }

  }, [token])



  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-[2rem]">Verify Email</h1>
      <h2 className="py-2 px-4 bg-orange-500 text-black">
        {token ? `${token}` : "no token"}
      </h2>
      {varified && (
        <div>
          <h2>Verified</h2>
          <Link href="/login">Login</Link>
        </div>

      )}
      {error && (
        <div>
          <h2>Error</h2>
        </div>

      )}
    </div>
  )
}
