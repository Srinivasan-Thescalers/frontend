"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PhoneCall, PhoneIncoming, PhoneOutgoing } from "lucide-react"

export function CallList() {
  // Sample call data - in a real app, this would come from an API
  const [calls] = useState([
    {
      id: 1,
      count: 12,
      type: "outbound",
      date: "2023-03-15",
      user: "John Doe",
    },
    {
      id: 2,
      count: 8,
      type: "inbound",
      date: "2023-03-15",
      user: "Jane Smith",
    },
    {
      id: 3,
      count: 15,
      type: "outbound",
      date: "2023-03-14",
      user: "John Doe",
    },
    {
      id: 4,
      count: 10,
      type: "follow-up",
      date: "2023-03-14",
      user: "Mike Johnson",
    },
    {
      id: 5,
      count: 7,
      type: "inbound",
      date: "2023-03-13",
      user: "Sarah Williams",
    },
  ])

  const getCallTypeBadge = (type: string) => {
    switch (type) {
      case "outbound":
        return (
          <Badge className="bg-blue-500 hover:bg-blue-600 text-white">
            <PhoneOutgoing className="mr-1 h-3 w-3" /> Outbound
          </Badge>
        )
      case "inbound":
        return (
          <Badge className="bg-green-500 hover:bg-green-600">
            <PhoneIncoming className="mr-1 h-3 w-3" /> Inbound
          </Badge>
        )
      case "follow-up":
        return (
          <Badge variant="secondary">
            <PhoneCall className="mr-1 h-3 w-3" /> Follow-up
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <div className="space-y-4">
      {calls.map((call) => (
        <Card key={call.id}>
          <CardHeader className="pb-2">
            <div className="flex items-start justify-between">
              <div>
                <CardTitle>{call.count} Calls</CardTitle>
                <CardDescription>{call.date}</CardDescription>
              </div>
              {getCallTypeBadge(call.type)}
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Logged by: <span className="font-medium">{call.user}</span>
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

