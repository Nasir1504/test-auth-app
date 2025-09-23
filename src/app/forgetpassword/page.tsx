"use client"

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import toast from "react-hot-toast";
import axios from 'axios';
import Link from 'next/link';

export default function ForgetPassword() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [btnDisabled, setBtnDisabled] = useState(true);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (email.length > 0) {
            setBtnDisabled(false)

        } else {
            setBtnDisabled(true)
        }
    }, [email]);

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        try {
            setLoading(true)
            const res = await axios.post("/api/user/forgetpassword", {email})
            setMessage(res.data.message)
            setEmail("")

            console.log(res.data.message);
            router.push("/login");

        } catch (error: any) {
            setMessage(error.response?.data?.message || "Invalid Email")
            console.log("Invalid email");
            toast.error(e.message)

        } finally {
            setLoading(false)
        }
    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            {message && <p className="mt-4">{message}</p>}
            <h1 className="text-2xl mb-4">Forgot Password</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                <input
                    type="email"
                    placeholder="Enter your email"
                    className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black bg-white"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button
                    type="submit"
                    className={`p-2 border border-gray-300 rounded-lg mb-4 px-[2rem] focus:outline-none focus:border-gray-600 
                            ${btnDisabled ? "none" : "cursor-pointer"} 
                            ${btnDisabled ? "bg-[#c5c5c580]" : "none"}
                        `}
                    disabled={btnDisabled}
                >
                    {loading ? "Sending..." : "Send"}
                </button>
            </form>
            <Link href="/login">Back to login</Link >
        </div>
    )
}
