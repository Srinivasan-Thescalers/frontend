import { NextResponse } from "next/server"
import axios from "axios"

export async function POST(req: Request) {
  const { token } = await req.json()

  try {
    // Verify token with backend API
    await axios.post("https://your-backend-api.com/verify", { token })
    return NextResponse.json({ valid: true })
  } catch (error) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 })
  }
}
