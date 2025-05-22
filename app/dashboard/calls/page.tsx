"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CallList } from "@/components/call-list"

export default function CallsPage() {
  const [callCount, setCallCount] = useState("")
  const [callType, setCallType] = useState("outbound")
  const [callDate, setCallDate] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setCallCount("")
      setCallType("outbound")
      setCallDate("")
      setIsSubmitting(false)

      // In a real app, you would add the call data to your state or make an API call
      alert("Call data added successfully!")
    }, 1000)
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Call Tracking</h1>
        <p className="text-muted-foreground">Log and monitor your daily call activities</p>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Calls</TabsTrigger>
          <TabsTrigger value="add">Log New Calls</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4">
          <CallList />
        </TabsContent>
        <TabsContent value="add">
          <Card>
            <form onSubmit={handleSubmit}>
              <CardHeader>
                <CardTitle>Log New Calls</CardTitle>
                <CardDescription>Record the number of calls you've made today</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="call-count">Number of Calls</Label>
                  <Input
                    id="call-count"
                    type="number"
                    placeholder="Enter number of calls"
                    value={callCount}
                    onChange={(e) => setCallCount(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="call-type">Call Type</Label>
                  <Select value={callType} onValueChange={setCallType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select call type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="outbound">Outbound</SelectItem>
                      <SelectItem value="inbound">Inbound</SelectItem>
                      <SelectItem value="follow-up">Follow-up</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="call-date">Date</Label>
                  <Input
                    id="call-date"
                    type="date"
                    value={callDate}
                    onChange={(e) => setCallDate(e.target.value)}
                    required
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
                      Saving...
                    </>
                  ) : (
                    "Log Calls"
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

