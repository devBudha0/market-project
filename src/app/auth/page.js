// src/app/auth/SignInPage.js
"use client"

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from '@/context/AuthProvider'
import { supabase } from "@/utils/supabase/client" // Import Supabase client
import { useRouter } from "next/navigation"
import { useState } from "react"
import { FaEye, FaEyeSlash } from "react-icons/fa"
import { toast } from 'sonner'

export default function SignInPage() {
  const { setUser } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [fullName, setFullName] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({})
  const [msg, setMsg] = useState("")
  const router = useRouter()

  // Email validation
  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email)

  // Password validation
  const validatePassword = (password) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/.test(password)

  const handleSignIn = async () => {
    const newErrors = {}
    if (!validateEmail(email)) newErrors.email = "Please enter a valid email"
    if (!password) newErrors.password = "Password is required"
    setErrors(newErrors)

    if (!Object.keys(newErrors).length) {
      // Attempt sign-in with Supabase
      const { data, error } = await supabase.auth.signInWithPassword({ email, password })

      if (error) {
        setErrors({ password: "Login failed. Please check your credentials and try again." })
      } else {
        console.log("Login successful:", data) // This should include a user session if successful

        // Fetch the user from Supabase's session after login
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession()
        if (sessionError) {
          console.error("Error fetching session:", sessionError)
        } else {
          const user = sessionData.session?.user
          console.log("Authenticated user session:", sessionData.session?.user)

          setUser(user)
          toast(`Welcome ${user.user_metadata.fullName}!`)

          router.push("/")
        }
      }
    }
  }

  const handleSignUp = async () => {
    const newErrors = {}
    if (!fullName) newErrors.fullName = "Full name is required"
    if (!validateEmail(email)) newErrors.email = "Please enter a valid email"
    if (!validatePassword(password)) {
      newErrors.password = `Password must be at least 6 characters, include upper and lower case letters and a number`
    }
    if (password !== confirmPassword) newErrors.confirmPassword = "Passwords do not match"
    setErrors(newErrors)

    if (!Object.keys(newErrors).length) {
      // Sign up with Supabase
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { fullName }, // Store additional user data if desired
        },
      })

      if (error) {
        setErrors({ email: "Sign up failed, please try again." })
      } else {
        setMsg("Registration Successful. Check your email to confirm your account")
      }
    }
  }

  const handlePasswordVisibility = () => setShowPassword(!showPassword)

  return (
    <main className="flex justify-center items-start h-screen bg-white pt-20">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-center">Welcome</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="signIn">
            <TabsList>
              <TabsTrigger value="signIn">Sign In</TabsTrigger>
              <TabsTrigger value="signUp">Create Account</TabsTrigger>
            </TabsList>

            {/* Sign In Tab */}
            <TabsContent value="signIn">
              <div className="flex flex-col space-y-4">
                <div>
                  <h4 className="ml-1.5">Email</h4>
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border p-2 w-full rounded"
                  />
                  {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                </div>

                <div className="relative">
                  <h4 className="ml-1.5">Password</h4>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border p-2 w-full rounded pr-10"
                  />
                  <button
                    type="button"
                    onClick={handlePasswordVisibility}
                    className="absolute inset-y-11 right-3 flex items-center text-gray-500"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                  {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                </div>

                <p className="text-blue-500 cursor-pointer" onClick={() => router.push('/auth/forgot-password')}>
                  Forgotten password?
                </p>
              </div>

              <Button onClick={handleSignIn} className="mt-6 w-full text-white py-2 rounded-lg hover:bg-indigo-900">
                Sign In
              </Button>
            </TabsContent>

            {/* Sign Up Tab */}
            <TabsContent value="signUp">
              <div className="flex flex-col space-y-4">
                <div>
                  <h4 className="ml-1.5">Full Name</h4>
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="border p-2 w-full rounded"
                  />
                  {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}
                </div>

                <div>
                  <h4 className="ml-1.5">Email</h4>
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border p-2 w-full rounded"
                  />
                  {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                </div>

                <div className="relative">
                  <h4 className="ml-1.5">Password</h4>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border p-2 w-full rounded pr-10"
                  />
                  <button
                    type="button"
                    onClick={handlePasswordVisibility}
                    className="absolute inset-y-11 right-3 flex items-center text-gray-500"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                  {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                </div>

                <div>
                  <h4 className="ml-1.5">Confirm Password</h4>
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="border p-2 w-full rounded"
                  />
                  {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
                </div>
              </div>

              <button onClick={handleSignUp} className="mt-6 w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700">
                Create Account
              </button>

              {msg && <p className="text-green-500 text-center mt-4">{msg}</p>}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </main>
  )
}
