import { NextResponse } from "next/server"
import axios from "axios"

export async function POST(req: Request) {
  const { email, password } = await req.json()

  try {
    // Forward login request to backend API
    const response = await axios.post("https://backend-mzfh.onrender.com/custom/login", { email, password })
    const { token } = response.data
    return NextResponse.json({ token }) // Return JWT to client
  } catch (error) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
  }
}
