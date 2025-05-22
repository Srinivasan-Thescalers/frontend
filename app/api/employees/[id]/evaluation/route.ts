import { type NextRequest, NextResponse } from "next/server"

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const employeeId = params.id
    const data = await request.json()

    // Get the JWT token from the request headers
    const authHeader = request.headers.get("authorization")

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ success: false, message: "Unauthorized: Missing or invalid token" }, { status: 401 })
    }

    const token = authHeader.split(" ")[1]

    // Make the request to the actual API
    const response = await fetch(`https://backend-mzfh.onrender.com/task/${employeeId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      return NextResponse.json(
        { success: false, message: errorData.message || response.statusText },
        { status: response.status },
      )
    }

    const responseData = await response.json()

    return NextResponse.json({
      success: true,
      message: "Employee evaluation updated successfully",
      data: responseData,
    })
  } catch (error) {
    console.error("Error updating employee evaluation:", error)
    return NextResponse.json({ success: false, message: "Failed to update employee evaluation" }, { status: 500 })
  }
}

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const employeeId = params.id

    // Get the JWT token from the request headers
    const authHeader = request.headers.get("authorization")

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ success: false, message: "Unauthorized: Missing or invalid token" }, { status: 401 })
    }

    const token = authHeader.split(" ")[1]

    // Make the request to the actual API
    const response = await fetch(`https://backend-mzfh.onrender.com/task/${employeeId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      return NextResponse.json(
        { success: false, message: errorData.message || response.statusText },
        { status: response.status },
      )
    }

    const data = await response.json()

    return NextResponse.json({
      success: true,
      data: data,
    })
  } catch (error) {
    console.error("Error fetching employee:", error)
    return NextResponse.json({ success: false, message: "Failed to fetch employee" }, { status: 500 })
  }
}

