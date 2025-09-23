"use client"

import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ResetPassword() {
    const router = useRouter();
    const [token, setToken] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
    }, []);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setLoading(true)
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        setError("")
        try {
            const res = await axios.post("/api/user/resetpassword", {
                token,
                password
            })

            setPassword("")
            setConfirmPassword("")
            router.push("/login")

        } catch (err: any) {
            setMessage(err.response?.data?.error || "Something went wrong");
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-2xl mb-4">Reset Password</h1>
            {message ? (
                <div>
                    <p>{message}</p>
                    <Link href="/login" className="text-blue-600">Login</Link>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-64">
                    <input
                        type="password"
                        placeholder="Enter new password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border p-2"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Re-enter new password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="border p-2"
                        required
                    />
                    {error && <p className="text-red-600 text-sm">{error}</p>}
                    <button type="submit" className="bg-green-500 text-white px-4 py-2">
                        {loading ? "Resetting Password" : "Reset Password"}
                    </button>
                </form>
            )}
        </div>
    )
}
