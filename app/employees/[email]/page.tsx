"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, Loader2, UserCog, PlusCircle, ClipboardList } from "lucide-react";

import { Button } from "@/components/ui/button";
import { EmployeeEvaluationModal } from "@/app/superadmin/dashboard/components/employee-evaluation-modal";

interface Employee {
  _id: string;
  trainingStartDate: string;
  trainingEndDate: string;
  partnerName: string;
  position: string;
  technology: string;
  callsShadowed: number;
  marks: number | null;
  username: string;
  email: string;
  feedback: string | null;
  comments: string; // Added comments property
  rating: number; // Added rating property
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export default function EmployeeDetailPage() {
  const router = useRouter();
  const params = useParams(); // Use `useParams` to access the params object
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // State for modal
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Retrieve the token (example: from localStorage)
  const token = localStorage.getItem("superadmin_token") || "";

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        setLoading(true);

        if (!params?.email) {
          throw new Error("Email parameter is missing.");
        }

        console.log('Fetching employees for email:', params?.email);

        const response = await fetch(`https://backend-mzfh.onrender.com/task/${params.email}`);

        if (!response.ok) {
          throw new Error(`Error fetching employee: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('API response:', data);
        setEmployees(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching employee:", err);
        setError(err instanceof Error ? err.message : "Failed to load employee details.");
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, [params?.email]);

  // Handle modal open
  const handleEvaluateEmployee = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsModalOpen(true);
  };

  // Handle modal close
  const closeModal = () => {
    setSelectedEmployee(null);
    setIsModalOpen(false);
  };

  function getRelativeTime(dateString: string) {
  const now = new Date();
  const date = new Date(dateString);
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hr ago`;
  if (diff < 2592000) return `${Math.floor(diff / 86400)} days ago`;
  if (diff < 31536000) return `${Math.floor(diff / 2592000)} months ago`;
  return `${Math.floor(diff / 31536000)} years ago`;
}

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }



  const { username, email } = employees[0];

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <Button variant="outline" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>
        <div className="flex gap-4">
         
         
          <Button
            variant="default"
            onClick={() => router.push(`/employees/${params.email}/evaluation?username=${encodeURIComponent(username)}&email=${encodeURIComponent(email)}`)}
          >
            <ClipboardList className="mr-2 h-4 w-4" />
            Evaluation
          </Button>
        </div>
      </div>

      {/* Common Details */}
      <div className="mb-6 p-4 border rounded-md shadow-md bg-gray-50">
        <h2 className="text-xl font-bold">{username}</h2>
        <p className="text-sm text-muted-foreground">{email}</p>
      </div>

      {/* Employee Details */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
             
              <th className="border border-gray-200 px-4 py-2 text-left text-sm font-medium text-gray-600">
                Partner Name 
              </th>
              <th className="border border-gray-200 px-4 py-2 text-left text-sm font-medium text-gray-600">
                Position
              </th>
              <th className="border border-gray-200 px-4 py-2 text-left text-sm font-medium text-gray-600">
                Calls Shadowed
              </th>
             
               <th className="border border-gray-200 px-4 py-2 text-left text-sm font-medium text-gray-600">
                Description
              </th>
               <th className="border border-gray-200 px-4 py-2 text-left text-sm font-medium text-gray-600">
                Feedback
              </th>
                <th className="border border-gray-200 px-4 py-2 text-left text-sm font-medium text-gray-600">
              Submitted
            </th>
              <th className="border border-gray-200 px-4 py-2 text-right text-sm font-medium text-gray-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee, index) => (
              <tr key={employee._id} className="hover:bg-gray-50">
               
                <td className="border border-gray-200 px-4 py-2 text-sm">{employee.partnerName}</td>
    <td className="border border-gray-200 px-4 py-2 text-sm">{employee.position}</td>
    <td className="border border-gray-200 px-4 py-2 text-sm">{employee.callsShadowed}</td>
 
    <td className="border border-gray-200 px-4 py-2 text-sm">{employee.comments}</td>
        <td className="border border-gray-200 px-4 py-2 text-sm">{employee.feedback}</td>

     <td className="border border-gray-200 px-4 py-2 text-sm">
                {getRelativeTime(employee.createdAt)}
              </td>
                <td className="border border-gray-200 px-4 py-2 text-right">
                  {index % 5 === 0 && ( // Show the "Review" button only once every 5 rows
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => handleEvaluateEmployee(employee)}
                    >
                      <UserCog className="mr-2 h-4 w-4" />
                      Review
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Evaluation Modal */}
      {selectedEmployee && (
        <EmployeeEvaluationModal
          employee={selectedEmployee}
          isOpen={isModalOpen}
          onClose={closeModal}
          token={token} // Pass the token here
        />
      )}
    </div>
  );
}