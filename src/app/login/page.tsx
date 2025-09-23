"use client"

import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Login() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [btnDisabled, setBtnDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [loginFailed, setLoginFailed] = useState("")

  const onLogin = async () => {
    try {
      setLoading(true)
      const response = await axios.post("/api/user/login", user);

      setUser({
        email: "",
        password: "",
      });

      console.log("Login success", response.data);

      router.push("/profile")

    } catch (e: any) {
      if (e.response) {
        setLoginFailed(e.response.data.error)
        console.log("Signup failed");
      } else {
        setLoginFailed("Something went wrong. Please try again.");

      }

      toast.error(e.message)

    } finally {
      setLoading(false); // always reset
    }
  }

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setBtnDisabled(false)
    } else {
      setBtnDisabled(true)

    }
  }, [user]);


  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">

      <h1 className="text-[2rem]">Login</h1>
      <hr />
      <br />
      {loginFailed && <p>{loginFailed}</p>}
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
        onClick={onLogin}
        className={`p-2 border border-gray-300 rounded-lg mb-4 px-[2rem] focus:outline-none focus:border-gray-600 ${btnDisabled ? "none" : "cursor-pointer"} ${btnDisabled ? "bg-[#c5c5c580]" : "none"}`}
        disabled={btnDisabled}
      >
        {loading ? "Logging in..." : "Login"}
      </button>
      <Link href="/signup">Signup</Link >
      <br />
      <Link href="/forgetpassword">Forget Password</Link >


    </div >
  )
}
