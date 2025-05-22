"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import { EmployeeEvaluationDashboard } from "./components/employee-evaluation-dashboard"

export default function SuperAdminDashboard() {
  const router = useRouter()
  const [token, setToken] = useState("")

  useEffect(() => {
    const storedToken = localStorage.getItem("superadmin_token")
    if (!storedToken) {
      router.push("/auth/superadmin-login")
      return
    }

    setToken(storedToken)

    // Verify token with backend
    const verifyToken = async () => {
      try {
        await axios.post("/api/superadmin/verify", { token: storedToken })
      } catch {
        localStorage.removeItem("superadmin_token")
        router.push("/auth/superadmin-login")
      }
    }

    verifyToken()
  }, [router])

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Hey, Admin Welcome back</h1>
      <EmployeeEvaluationDashboard token={token} />
    </div>
  )
}
