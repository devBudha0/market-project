// src/app/auth/ForgotPassword.js
"use client"

import { useState } from "react"

export default function ForgotPassword() {
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(null)

  const handlePasswordReset = async () => {
    setMessage(null)
    setError(null)
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address")
      return
    }
    try {
      // Implement the Supabase reset password logic here
      setMessage("If this email is registered, a reset link has been sent.")
    } catch (error) {
      setError("Failed to send reset email. Try again later.")
    }
  }

  return (
    <main className="flex justify-center items-center h-screen">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-center text-2xl font-bold mb-4">Reset Password</h3>
        <div className="space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 w-full rounded"
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {message && <p className="text-green-500 text-sm">{message}</p>}
        </div>
        <button
          onClick={handlePasswordReset}
          className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700"
        >
          Send Reset Email
        </button>
      </div>
    </main>
  )
}
