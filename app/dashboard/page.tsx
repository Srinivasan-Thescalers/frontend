"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, PhoneCall, Star } from "lucide-react";
import { DashboardChart } from "@/components/dashboard-chart";

interface Feedback {
  feedback: string | null;
  position: string;
  partnerName: string;
}

export default function DashboardPage() {
  const { data: session } = useSession();
  const email = session?.user?.email;
  const [metrics, setMetrics] = useState({
    totalTasks: 0,
    averageMarks: 0,
    averageRating: 0,
    totalCalls: 0,
  });
  const [feedbackList, setFeedbackList] = useState<Feedback[]>([]);

  useEffect(() => {
    if (email) {
      fetchMetrics(email);
      fetchFeedback(email);
    }
  }, [email]);

  const fetchMetrics = async (email: string) => {
    try {
      const response = await axios.get(`https://backend-mzfh.onrender.com/task/${email}`);
      const tasks = response.data;

      if (Array.isArray(tasks)) {
        const totalTasks = tasks.length;
        const totalMarks = tasks.reduce((sum, task) => sum + (task.marks || 0), 0);
        const totalRatings = tasks.reduce((sum, task) => sum + (task.rating || 0), 0);
        const totalCalls = tasks.reduce((sum, task) => sum + task.callsShadowed, 0);

        const averageMarks = totalTasks > 0 ? parseFloat((totalMarks / totalTasks).toFixed(2)) : 0;
        const averageRating = totalTasks > 0 ? parseFloat((totalRatings / totalTasks).toFixed(2)) : 0;

        setMetrics({ totalTasks, averageMarks, averageRating, totalCalls });
      } else {
        console.error("Expected an array of tasks, but received:", tasks);
      }
    } catch (error) {
      console.error("Failed to fetch metrics:", error);
    }
  };

  const fetchFeedback = async (email: string) => {
    try {
      const response = await axios.get(`https://backend-mzfh.onrender.com/task/${email}`);
      const tasks = response.data;

      if (Array.isArray(tasks)) {
        const feedbackData = tasks
          .map((task) => ({
            feedback: task.feedback || null,
            position: task.position || "N/A",
            partnerName: task.partnerName || "N/A",
          }))
          .filter((feedback) => feedback.feedback && feedback.feedback !== "N/A"); // Filter out empty or "N/A" feedback

        setFeedbackList(feedbackData);
      } else {
        console.error("Expected an array of tasks, but received:", tasks);
      }
    } catch (error) {
      console.error("Failed to fetch feedback:", error);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's an overview of your performance.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.totalTasks}</div>
            <p className="text-xs text-muted-foreground"></p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Calls</CardTitle>
            <PhoneCall className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.totalCalls}</div>
            <p className="text-xs text-muted-foreground"></p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Performance Overview</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <DashboardChart />
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Feedback from Supervisors</CardTitle>
                <CardDescription>Here's your feedback from supervisors.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 h-64 overflow-y-auto">
                  {feedbackList.map((feedback, index) => (
                    <div key={index} className="border-b pb-3 last:pb-0 last:border-0">
                      <p className="text-sm">
                        <span className="font-medium">Position:</span> <b>{feedback.position}</b>
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Partner Name:</span> <b>{feedback.partnerName}</b>
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Feedback:</span> {feedback.feedback ?? "N/A"}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="tasks" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Task Completion Rate</CardTitle>
              <CardDescription>Task completion over the past 30 days</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <DashboardChart />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="calls" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Call Volume</CardTitle>
              <CardDescription>Call volume over the past 30 days</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <DashboardChart />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

