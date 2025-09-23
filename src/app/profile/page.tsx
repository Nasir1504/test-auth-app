"use client"

import axios from "axios"
import Link from "next/link"
import { toast } from "react-hot-toast"
import { useRouter } from "next/navigation"
import { useState } from "react";

export default function Profile() {
  const router = useRouter();
  const [data, setData] = useState("nothing");

  const getUserDetails = async () => {
    try {
      //we can use get method also because we are not posting 
      // anything here.
      const res = await axios.post("api/user/me")
      console.log(res.data)
      setData(res.data.data._id)

    } catch (error: any) {
      console.log(error.message)
      toast.error(error.message)
    }
  }


  const logout = async () => {
    try {
      await axios.get("/api/user/logout")
      toast.success("logout success")
      router.push("/login")

    } catch (error: any) {
      console.log(error.message)
      toast.error(error.message)

    }
  }


  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-[2rem]">Your Profile</h1>
      <hr />
      <br />

      <h2>
        {
          data === "nothing" ? "Nothing" : <Link href={`/profile/${data}`}>{data}</Link>
        }
      </h2>
      <hr />
      <button
        className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={logout}
      >
        logout
      </button>

       <button
        className="bg-green-500 mt-4 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        onClick={getUserDetails}
      >
        Get user details
      </button>
    </div>)
}
