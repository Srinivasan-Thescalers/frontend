"use client"

import type React from "react"
import { useState } from "react"
import { Check, Loader2, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

interface Employee {
  _id: string
  trainingStartDate: string
  trainingEndDate: string
  partnerName: string
  position: string
  technology: string
  callsShadowed: number
  username: string
  email: string
  feedback: string | null
  comments: string | null
  rating: string | null
  percentage: string | null
  isCompleted: string | null
  createdAt: string
  updatedAt: string
  __v: number
}

interface EmployeeEvaluationModalProps {
  employee: Employee
  isOpen: boolean
  onClose: () => void
  token: string // Add token as a prop
}

export function EmployeeEvaluationModal({ employee, isOpen, onClose, token }: EmployeeEvaluationModalProps) {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    feedback: employee.feedback || "",
    comments: employee.comments || "",
    percentage: employee.percentage || "", 
    rating: employee.rating || "", 
    isCompleted: employee.isCompleted || "InProgress", 
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)

    try {
      if (!token || token.trim() === "") {
        throw new Error("Authentication token is invalid or not found. Please log in again.")
      }

      const response = await fetch(`https://backend-mzfh.onrender.com/task/${employee._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          feedback: formData.feedback,
          comments: formData.comments,
          percentage: formData.percentage,
          rating: formData.rating,
          isCompleted: formData.isCompleted,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || `Error: ${response.statusText}`)
      }

      toast({
        title: "Evaluation submitted",
        description: `${employee.username}'s evaluation has been updated successfully.`,
      })

      onClose()
      window.location.reload()
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to submit evaluation. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
    <DialogContent className="sm:max-w-[600px]">
      <DialogHeader>
        <DialogTitle>Evaluate Employee: {employee.username}</DialogTitle>
        <DialogDescription>Provide performance feedback and comments for this employee.</DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Name
          </Label>
          <Input id="name" value={employee.username} className="col-span-3" disabled />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="position" className="text-right">
            Position
          </Label>
          <Input id="position" value={employee.position} className="col-span-3" disabled />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="feedback" className="text-right">
            Feedback
          </Label>
          <Textarea
            id="feedback"
            name="feedback"
            value={formData.feedback}
            onChange={handleChange}
            placeholder="Provide feedback about the employee's performance..."
            className="col-span-3"
            rows={3}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="comments" className="text-right">
            Description
          </Label>
          <Textarea
            id="comments"
            name="comments"
            value={formData.comments}
            onChange={handleChange}
            placeholder="Additional comments about the employee..."
            className="col-span-3"
            rows={3}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="percentage" className="text-right">
            Percentage
          </Label>
          <Input
            id="percentage"
            name="percentage"
            type="number"
            value={formData.percentage}
            onChange={handleChange}
            placeholder="Enter percentage score..."
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="rating" className="text-right">
            Rating
          </Label>
          <Input
            id="rating"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            placeholder="Enter rating (e.g., 1, 2, 3)..."
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="isCompleted" className="text-right">
            Is Completed
          </Label>
          <Input
            id="isCompleted"
            name="isCompleted"
            value={formData.isCompleted}
            onChange={handleChange}
            placeholder="InProgress, true, or false"
            className="col-span-3"
          />
        </div>
      </div>
      <DialogFooter>
        <Button variant="outline" onClick={onClose}>
          <X className="mr-2 h-4 w-4" />
          Cancel
        </Button>
        <Button onClick={handleSubmit} disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              <Check className="mr-2 h-4 w-4" />
              Submit Evaluation
            </>
          )}
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
  )
}