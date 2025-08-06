"use client"

import type React from "react"

import { useState } from "react"
import { SuperAdminHeader } from "../superadmin/dashboard/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Plus, Save, Code, BookOpen, Zap, Target, Brain } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const QuestionsPage = () => {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    technology: "",
    description: "",
    difficulty: "",
    questionType: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Question Created Successfully!",
        description: "The question has been added to the question bank.",
      })

      // Reset form
      setFormData({
        technology: "",
        description: "",
        difficulty: "",
        questionType: "",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create question. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-emerald-100 text-emerald-800 border-emerald-200"
      case "medium":
        return "bg-amber-100 text-amber-800 border-amber-200"
      case "hard":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getQuestionTypeIcon = (type: string) => {
    return type === "coding" ? <Code className="h-4 w-4" /> : <BookOpen className="h-4 w-4" />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <SuperAdminHeader />

      <div className="container mx-auto px-6 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Brain className="h-6 w-6 text-blue-500" />
            </div>
            <h1 className="text-3xl font-bold text-slate-800">Question Management</h1>
          </div>
          <p className="text-slate-600 text-lg">Create and manage technical assessment questions</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-blue-400 to-indigo-400 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Plus className="h-5 w-5" />
                  Create New Question
                </CardTitle>
                <CardDescription className="text-blue-50">
                  Add a new question to your assessment question bank
                </CardDescription>
              </CardHeader>

              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Technology Field */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="technology"
                      className="text-sm font-semibold text-slate-700 flex items-center gap-2"
                    >
                      <Target className="h-4 w-4 text-blue-400" />
                      Technology
                    </Label>
                    <Input
                      id="technology"
                      placeholder="e.g., React, Python, JavaScript, Node.js"
                      value={formData.technology}
                      onChange={(e) => handleInputChange("technology", e.target.value)}
                      className="h-12 border-slate-200 focus:border-blue-400 focus:ring-blue-400"
                      required
                    />
                  </div>

                  {/* Description Field */}
                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-sm font-semibold text-slate-700">
                      Question Description
                    </Label>
                    <Textarea
                      id="description"
                      placeholder="Enter the detailed question description..."
                      value={formData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      className="min-h-[120px] border-slate-200 focus:border-blue-400 focus:ring-blue-400 resize-none"
                      required
                    />
                  </div>

                  {/* Difficulty and Question Type Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Difficulty Level */}
                    <div className="space-y-2">
                      <Label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                        <Zap className="h-4 w-4 text-orange-400" />
                        Difficulty Level
                      </Label>
                      <Select
                        value={formData.difficulty}
                        onValueChange={(value) => handleInputChange("difficulty", value)}
                      >
                        <SelectTrigger className="h-12 border-slate-200 focus:border-blue-400">
                          <SelectValue placeholder="Select difficulty" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="easy">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                              Easy
                            </div>
                          </SelectItem>
                          <SelectItem value="medium">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                              Medium
                            </div>
                          </SelectItem>
                          <SelectItem value="hard">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                              Hard
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Question Type */}
                    <div className="space-y-2">
                      <Label className="text-sm font-semibold text-slate-700">Question Type</Label>
                      <Select
                        value={formData.questionType}
                        onValueChange={(value) => handleInputChange("questionType", value)}
                      >
                        <SelectTrigger className="h-12 border-slate-200 focus:border-blue-400">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="coding">
                            <div className="flex items-center gap-2">
                              <Code className="h-4 w-4 text-blue-500" />
                              Coding
                            </div>
                          </SelectItem>
                          <SelectItem value="theory">
                            <div className="flex items-center gap-2">
                              <BookOpen className="h-4 w-4 text-purple-500" />
                              Theory
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <Button
                      type="submit"
                      disabled={
                        isSubmitting ||
                        !formData.technology ||
                        !formData.description ||
                        !formData.difficulty ||
                        !formData.questionType
                      }
                      className="w-full h-12 bg-gradient-to-r from-blue-400 to-indigo-400 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Creating Question...
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <Save className="h-4 w-4" />
                          Create Question
                        </div>
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Preview/Summary Panel */}
          <div className="space-y-6">
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-slate-400 to-slate-500 text-white rounded-t-lg">
                <CardTitle className="text-lg">Question Preview</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                {formData.technology && (
                  <div>
                    <Label className="text-xs font-medium text-slate-500 uppercase tracking-wide">Technology</Label>
                    <Badge variant="secondary" className="mt-1 bg-blue-50 text-blue-600 border-blue-200">
                      {formData.technology}
                    </Badge>
                  </div>
                )}

                {formData.difficulty && (
                  <div>
                    <Label className="text-xs font-medium text-slate-500 uppercase tracking-wide">Difficulty</Label>
                    <Badge className={`mt-1 ${getDifficultyColor(formData.difficulty)}`}>
                      {formData.difficulty.charAt(0).toUpperCase() + formData.difficulty.slice(1)}
                    </Badge>
                  </div>
                )}

                {formData.questionType && (
                  <div>
                    <Label className="text-xs font-medium text-slate-500 uppercase tracking-wide">Type</Label>
                    <Badge variant="outline" className="mt-1 flex items-center gap-1 w-fit">
                      {getQuestionTypeIcon(formData.questionType)}
                      {formData.questionType.charAt(0).toUpperCase() + formData.questionType.slice(1)}
                    </Badge>
                  </div>
                )}

                {formData.description && (
                  <div>
                    <Label className="text-xs font-medium text-slate-500 uppercase tracking-wide">Description</Label>
                    <p className="mt-1 text-sm text-slate-700 bg-slate-50 p-3 rounded-md border">
                      {formData.description.length > 100
                        ? `${formData.description.substring(0, 100)}...`
                        : formData.description}
                    </p>
                  </div>
                )}

                {!formData.technology && !formData.description && !formData.difficulty && !formData.questionType && (
                  <div className="text-center py-8 text-slate-400">
                    <Brain className="h-12 w-12 mx-auto mb-3 opacity-50" />
                    <p className="text-sm">Fill out the form to see preview</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="shadow-lg border-0 bg-gradient-to-br from-blue-50 to-indigo-50">
              <CardContent className="p-6">
                <h3 className="font-semibold text-slate-700 mb-4">Quick Tips</h3>
                <div className="space-y-3 text-sm text-slate-600">
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p>Be specific with technology names (e.g., "React 18" instead of just "React")</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p>Include clear requirements and expected outcomes in descriptions</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p>Choose difficulty based on years of experience required</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default QuestionsPage
