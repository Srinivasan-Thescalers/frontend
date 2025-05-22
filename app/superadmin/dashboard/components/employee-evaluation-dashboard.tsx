"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowUpDown, BarChart3, ChevronDown, Eye, Search, UserCog } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/hooks/use-toast"
import { EmployeeEvaluationModal } from "./employee-evaluation-modal"

// Define the employee type based on the API response
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
  rating: number | null
  marks: number | null
  createdAt: string
  updatedAt: string
  __v: number
}

interface EmployeeEvaluationDashboardProps {
  token: string // Add token as a prop
}

export function EmployeeEvaluationDashboard({ token }: EmployeeEvaluationDashboardProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [employees, setEmployees] = useState<Employee[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Function to get distinct employees based on username
  const getDistinctEmployees = (employees: Employee[]) => {
    const seen = new Set<string>()
    return employees.filter((employee) => {
      if (seen.has(employee.username)) {
        return false
      }
      seen.add(employee.username)
      return true
    })
  }

  // Fetch employees from the API
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        setLoading(true)
        const response = await fetch("https://backend-mzfh.onrender.com/task")

        if (!response.ok) {
          throw new Error(`Error fetching employees: ${response.statusText}`)
        }

        const data = await response.json()
        setEmployees(data)
        setError(null)
      } catch (err) {
        console.error("Error fetching employees:", err)
        setError("Failed to load employees. Please try again later.")
        toast({
          title: "Error",
          description: "Failed to load employees. Please try again later.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchEmployees()
  }, [toast])

  // Filter employees based on search term and ensure distinct usernames
  const distinctEmployees = getDistinctEmployees(employees)

  const filteredEmployees = distinctEmployees.filter(
    (employee) =>
      employee.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.technology.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.partnerName.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Handle view employee details
  const handleViewEmployee = (employee: Employee) => {
    router.push(`/employees/${employee.email}`)
  }

  // Handle evaluate employee
  const handleEvaluateEmployee = (employee: Employee) => {
    setSelectedEmployee(employee)
    setIsModalOpen(true)
  }

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedEmployee(null)
  }

  // Calculate average rating if available
  const calculateAverageRating = () => {
    const employeesWithRatings = employees.filter((emp) => emp.rating !== null)
    if (employeesWithRatings.length === 0) return "N/A"

    const sum = employeesWithRatings.reduce((acc, emp) => acc + (emp.rating || 0), 0)
    return Math.round(sum / employeesWithRatings.length)
  }

  // Calculate average marks if available
  const calculateAverageMarks = () => {
    const employeesWithMarks = employees.filter((emp) => emp.marks !== null)
    if (employeesWithMarks.length === 0) return "N/A"

    const sum = employeesWithMarks.reduce((acc, emp) => acc + (emp.marks || 0), 0)
    return Math.round(sum / employeesWithMarks.length)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search employees..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full sm:w-auto">
              <UserCog className="mr-2 h-4 w-4" />
              Select Employee
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[250px] max-h-[400px] overflow-y-auto">
            {distinctEmployees.map((employee) => (
              <DropdownMenuItem key={employee._id} onClick={() => handleEvaluateEmployee(employee)}>
                {employee.username}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Employee Evaluations</CardTitle>
          <CardDescription>Manage and review employee performance evaluations.</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : error ? (
            <div className="flex justify-center items-center h-64">
              <p className="text-red-500">{error}</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">
                    <Button variant="ghost" className="p-0 font-medium flex items-center">
                      Name
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>Email</TableHead>
                  {/* <TableHead>Position</TableHead> */}
                  {/* <TableHead>Technology</TableHead> */}
                  {/* <TableHead className="text-right">Marks</TableHead>
                  <TableHead className="text-right">Rating</TableHead> */}
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEmployees.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8">
                      No employees found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredEmployees.map((employee) => (
                    <TableRow key={employee._id}>
                      <TableCell className="font-medium">{employee.username}</TableCell>
                      <TableCell>{employee.email}</TableCell>
                      {/* <TableCell>{employee.position}</TableCell> */}
                      {/* <TableCell>{employee.technology}</TableCell> */}
                      {/* <TableCell className="text-right">
                        {employee.marks !== null ? (
                          <span
                            className={`font-medium ${
                              employee.marks >= 85
                                ? "text-green-600"
                                : employee.marks >= 70
                                ? "text-amber-600"
                                : "text-red-600"
                            }`}
                          >
                            {employee.marks}
                          </span>
                        ) : (
                          <span className="text-muted-foreground">Not evaluated</span>
                        )}
                      </TableCell> */}
                      {/* <TableCell className="text-right">
                        {employee.rating !== null ? (
                          <span
                            className={`font-medium ${
                              employee.rating >= 4
                                ? "text-green-600"
                                : employee.rating >= 3
                                ? "text-amber-600"
                                : "text-red-600"
                            }`}
                          >
                            {employee.rating}/5
                          </span>
                        ) : (
                          <span className="text-muted-foreground">Not rated</span>
                        )}
                      </TableCell> */}
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="icon" onClick={() => handleViewEmployee(employee)}>
                            <Eye className="h-4 w-4" />
                            <span className="sr-only">View</span>
                          </Button>
                          <Button variant="default" size="icon" onClick={() => handleEvaluateEmployee(employee)}>
                            <UserCog className="h-4 w-4" />
                            <span className="sr-only">Evaluate</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {selectedEmployee && (
        <EmployeeEvaluationModal
          employee={selectedEmployee}
          isOpen={isModalOpen}
          onClose={closeModal}
          token={token} // Pass the token prop here
        />
      )}
    </div>
  )
}

