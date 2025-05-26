"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import { Shield, Mail, Lock, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function SuperAdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    try {
      // Call backend API for JWT authentication
      const response = await axios.post("/api/superadmin/login", { email, password })
      const { token } = response.data
      localStorage.setItem("superadmin_token", token) // Store JWT in localStorage
      router.push("/superadmin/dashboard") // Redirect to dashboard
    } catch (err) {
      setError("Invalid credentials. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Left side - Image/Illustration */}
      <div className="hidden lg:flex lg:w-1/2 bg-slate-800 items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-700/90 to-slate-900/90 z-10"></div>
        <div className="absolute inset-0 opacity-20">
          <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            {[...Array(10)].map((_, i) => (
              <path
                key={i}
                d={`M${i * 10},0 Q${i * 10 + 5},${50 + Math.random() * 30} ${i * 10},100`}
                stroke="currentColor"
                strokeWidth="0.5"
                fill="none"
                className="text-slate-300"
              />
            ))}
          </svg>
        </div>
        <div className="relative z-20 p-12 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-slate-700 mb-8">
            <Shield className="h-10 w-10 text-slate-300" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">Admin Control Center</h2>
          <p className="text-slate-300 max-w-md">
            Secure access to your administration dashboard. Manage your system with complete control and security.
          </p>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardHeader className="space-y-1">
              <div className="flex items-center justify-center mb-2">
                <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center">
                  <Shield className="h-6 w-6 text-slate-700" />
                </div>
              </div>
              <CardTitle className="text-2xl font-bold text-center">Super Admin Login</CardTitle>
              <CardDescription className="text-center text-slate-500">
                Enter your credentials to access the control panel
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-slate-700">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Mail className="h-4 w-4 text-slate-400" />
                    </div>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                      placeholder="admin@example.com"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="text-sm font-medium text-slate-700">
                      Password
                    </label>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Lock className="h-4 w-4 text-slate-400" />
                    </div>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                </div>
                {error && <div className="p-3 rounded-md bg-red-50 text-red-500 text-sm">{error}</div>}
                <Button
                  type="submit"
                  className="w-full bg-slate-800 hover:bg-slate-700 text-white"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Authenticating...
                    </>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex justify-center border-t pt-4">
              <p className="text-xs text-slate-500">Secure System • Admin Access Only</p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
