"use client";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";

import type React from "react";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { SuperAdminHeader } from "@/app/superadmin/dashboard/components/header";

export default function EmployeeEvaluationPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);
  const [getResult, setGetResult] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    partnerName: "",
    position: "",
    marks: "",
    percentage: "",
    rating: "",
    isCompleted: "",
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Get token from localStorage
  const token = typeof window !== "undefined" ? localStorage.getItem("superadmin_token") : null;

  // Get username and email from query params
  const username = searchParams.get("username") || "";
  const email = searchParams.get("email") || "";

  // Redirect if not authenticated
  useEffect(() => {
    if (!token) {
      router.replace("/login");
    }
  }, [token, router]);

  // Auto-fetch evaluations on mount
  useEffect(() => {
    handleGet();
    // eslint-disable-next-line
  }, []);

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};
    let isValid = true;

    if (!formData.partnerName) {
      errors.partnerName = "Partner name is required";
      isValid = false;
    }
    if (!formData.position) {
      errors.position = "Position is required";
      isValid = false;
    }
    if (!formData.marks) {
      errors.marks = "Marks are required";
      isValid = false;
    } else if (isNaN(Number(formData.marks)) || Number(formData.marks) < 0 || Number(formData.marks) > 100) {
      errors.marks = "Marks must be between 0 and 100";
      isValid = false;
    }
    if (!formData.percentage) {
      errors.percentage = "Percentage is required";
      isValid = false;
    } else if (isNaN(Number(formData.percentage)) || Number(formData.percentage) < 0 || Number(formData.percentage) > 100) {
      errors.percentage = "Percentage must be between 0 and 100";
      isValid = false;
    }
    if (!formData.rating) {
      errors.rating = "Rating is required";
      isValid = false;
    }
    if (!formData.isCompleted) {
      errors.isCompleted = "Status is required";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (formErrors[name]) {
      setFormErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleDownloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(aggregatedResults);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Evaluations");
    XLSX.writeFile(workbook, "Employee_Evaluations.xlsx");
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Employee Evaluations", 14, 10);
    doc.autoTable({
      head: [["Partner", "Position", "Average Percentage", "Average Rating", "Status"]],
      body: aggregatedResults.map((item) => [
        item.partnerName,
        item.position,
        `${item.averagePercentage}%`,
        item.averageRating,
        item.status,
      ]),
    });
    doc.save("Employee_Evaluations.pdf");
  };

  // POST API call
  const handlePost = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const postBody = {
        username,
        email,
        partnerName: formData.partnerName,
        position: formData.position,
        marks: Number(formData.marks),
        percentage: Number(formData.percentage),
        rating: formData.rating,
        isCompleted: formData.isCompleted,
      };

      const response = await fetch("https://backend-mzfh.onrender.com/performance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(postBody),
      });

      if (!response.ok) {
        throw new Error(`POST failed: ${response.statusText}`);
      }

      const data = await response.json();
      setResult(data);
      setFormData({
        partnerName: "",
        position: "",
        marks: "",
        percentage: "",
        rating: "",
        isCompleted: "",
      });
      handleGet();
    } catch (err) {
      setError(err instanceof Error ? err.message : "POST failed");
    } finally {
      setLoading(false);
    }
  };

  // GET API call (fetch only for the current email)
  async function handleGet() {
    setLoading(true);
    setError(null);
    setGetResult([]);
    try {
      if (!email) {
        throw new Error("Email parameter is missing.");
      }

      const response = await fetch(`https://backend-mzfh.onrender.com/task/${email}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`GET failed: ${response.statusText}`);
      }

      const data = await response.json();
      setGetResult(Array.isArray(data) ? data : [data]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "GET failed");
    } finally {
      setLoading(false);
    }
  }

  const filteredResults = getResult.filter(
    (item) => item.email && item.email.toLowerCase() === email.toLowerCase()
  );

  // Helper function to aggregate data
  const aggregateResults = (data: any[]) => {
    const groupedData: Record<string, any> = {};

    // Filter records that have both percentage and rating
    const validData = data.filter((item) => item.percentage !== undefined && item.rating !== undefined);

    validData.forEach((item) => {
      const key = `${item.partnerName}-${item.position}`;
      if (!groupedData[key]) {
        groupedData[key] = {
          partnerName: item.partnerName,
          position: item.position,
          totalPercentage: 0,
          totalRating: 0,
          count: 0,
          statuses: [],
        };
      }
      groupedData[key].totalPercentage += item.percentage || 0;
      groupedData[key].totalRating += parseFloat(item.rating || "0");
      groupedData[key].count += 1;
      groupedData[key].statuses.push(item.isCompleted || "InProgress");

    });

    return Object.values(groupedData).map((group) => ({
      partnerName: group.partnerName,
      position: group.position,
      averagePercentage: Math.round(group.totalPercentage / group.count), // Average percentage
      averageRating: (group.totalRating / group.count).toFixed(1), // Average rating (1 decimal place)
      status: group.statuses.includes("completed") ? "Completed" : "InProgress", // Check if any status is "completed"
    }));
  };

  const aggregatedResults = aggregateResults(filteredResults);

  return (
    <>
      <SuperAdminHeader />
      <div className="min-h-screen bg-gradient-to-b from-white to-slate-100">
        <main className="container mx-auto px-6 py-10">
          <div className="flex flex-col lg:flex-row justify-between items-center mb-8">
            <div className="text-center lg:text-left">
              <h1 className="text-3xl font-extrabold">Employee Evaluation</h1>
              <p className="text-sm mt-2">Submit and review employee performance evaluations</p>
            </div>
            <div className="flex space-x-4 mt-4 lg:mt-0">
              <Button variant="outline" className="bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-md hover:shadow-lg" onClick={handleDownloadExcel}>
                Download Excel
              </Button>
              <Button variant="outline" className="bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-md hover:shadow-lg" onClick={handleDownloadPDF}>
                Download PDF
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-9">
              <Card className="shadow-lg border border-gray-200 rounded-lg">
                <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-t-lg p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle className="text-lg font-semibold">Evaluation Records</CardTitle>
                      <CardDescription className="text-sm">View all submitted performance evaluations</CardDescription>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleGet}
                      disabled={loading}
                      className="text-xs bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow hover:shadow-md"
                    >
                      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Refresh"}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="overflow-x-auto">
                    <Table className="min-w-full">
                      <TableHeader className="bg-gray-100">
                        <TableRow>
                          <TableHead className="font-medium">Partner</TableHead>
                          <TableHead className="font-medium">Position</TableHead>
                          <TableHead className="font-medium text-right">Average Percentage</TableHead>
                          <TableHead className="font-medium text-right">Average Rating</TableHead>
                          <TableHead className="font-medium text-right">Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {loading && !aggregatedResults.length ? (
                          <TableRow>
                            <TableCell colSpan={5} className="h-24 text-center">
                              <Loader2 className="h-6 w-6 animate-spin mx-auto" />
                              <span className="text-sm mt-2 block">Loading evaluation data...</span>
                            </TableCell>
                          </TableRow>
                        ) : aggregatedResults.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={5} className="h-24 text-center">
                              <p className="text-sm">No evaluations found.</p>
                              <p className="text-xs mt-1">Submit an evaluation to see it here.</p>
                            </TableCell>
                          </TableRow>
                        ) : (
                          aggregatedResults.map((item, index) => (
                            <TableRow key={index} className="hover:bg-gray-50">
                              <TableCell>{item.partnerName}</TableCell>
                              <TableCell>{item.position}</TableCell>
                              <TableCell className="text-right">{item.averagePercentage}%</TableCell>
                              <TableCell className="text-right">{item.averageRating}</TableCell>
                              <TableCell className="text-right">{item.status}</TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
        <footer className="bg-gray-100 py-4">
          <div className="container mx-auto text-center text-xs">
            © {new Date().getFullYear()} The Scalers. All rights reserved.
          </div>
        </footer>
      </div>
    </>
  );
}