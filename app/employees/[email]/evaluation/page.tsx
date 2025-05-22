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
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-semibold text-slate-800">Performance Management</h1>
          </div>
          <div className="text-sm text-slate-500">
            {username && <span className="font-medium">{username}</span>}
          </div>
        </div>
      </header>

  
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Employee Evaluation</h1>
            <p className="text-slate-500 mt-1">Submit and review employee performance evaluations</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={handleDownloadExcel}>
              Download Excel
            </Button>
            <Button variant="outline" onClick={handleDownloadPDF}>
              Download PDF
            </Button>
          </div>
        </div>


        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Table Section */}
          <div className="lg:col-span-9">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Evaluation Records</CardTitle>
                    <CardDescription>View all submitted performance evaluations</CardDescription>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleGet}
                    disabled={loading}
                    className="text-xs"
                  >
                    {loading ? <Loader2 className="h-3 w-3 animate-spin" /> : "Refresh"}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader className="bg-slate-50">
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
                          <TableCell colSpan={4} className="h-24 text-center">
                            <Loader2 className="h-5 w-5 animate-spin mx-auto" />
                            <span className="text-sm text-slate-500 mt-2 block">Loading evaluation data...</span>
                          </TableCell>
                        </TableRow>
                      ) : aggregatedResults.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={4} className="h-24 text-center">
                            <p className="text-sm text-slate-500">No evaluations found.</p>
                            <p className="text-xs text-slate-400 mt-1">Submit an evaluation to see it here.</p>
                          </TableCell>
                        </TableRow>
                      ) : (
                        aggregatedResults.map((item, index) => (
                          <TableRow key={index} className="hover:bg-slate-50">
                            <TableCell className="font-medium">{item.partnerName}</TableCell>
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

      <footer className="mt-auto border-t border-slate-200 py-4">
        <div className="container mx-auto px-4">
          <div className="text-center text-xs text-slate-500">
            © {new Date().getFullYear()}  The Scalers. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}