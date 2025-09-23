"use client"

import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Signup() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: ""
  });

  const [btnDisabled, setBtnDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const onSignup = async () => {
    try {
      setLoading(true)
      const response = await axios.post("/api/user/signup", user);

      setUser({
        email: "",
        password: "",
        username: ""
      });

      console.log("Signup success", response.data);

      router.push("/login")

    } catch (e: any) {
      console.log("Signup failed");
      toast.error(e.message)

    } finally {
      setLoading(false); // always reset
    }
  }

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
      setBtnDisabled(false)
    } else {
      setBtnDisabled(true)

    }
  }, [user]);


  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">

      <h1 className="text-[2rem]">Signup</h1>
      <hr />
      <br />
      <label htmlFor="username">User Name</label>
      <input
        id="username"
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black bg-white"
        type="text"
        value={user.username}
        onChange={(e) => { setUser({ ...user, username: e.target.value }) }}
        placeholder="User name"
      />

      <label htmlFor="email">Email</label>
      <input
        id="email"
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black bg-white"
        type="email"
        value={user.email}
        onChange={(e) => { setUser({ ...user, email: e.target.value }) }}
        placeholder="Email"
      />

      <label htmlFor="email">Password</label>
      <input
        id="password"
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black bg-white"
        type="password"
        value={user.password}
        onChange={(e) => { setUser({ ...user, password: e.target.value }) }}
        placeholder="Password"
      />

      <button
        onClick={onSignup}
        className={`p-2 border border-gray-300 rounded-lg mb-4 px-[2rem] focus:outline-none focus:border-gray-600 ${btnDisabled ? "none" : "cursor-pointer"} ${btnDisabled ? "bg-[#c5c5c580]" : "none"}`}
        disabled={btnDisabled}
      >
        {loading ? "Signing up..." : "Sign up"}
      </button>
      <Link href="/login">Login</Link >

    </div >
  )
}
