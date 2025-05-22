"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface ChartData {
  name: string;
  tasks: number;
  calls: number;
}

export function DashboardChart() {
  const { data: session } = useSession();
  const email = session?.user?.email;
  const [chartData, setChartData] = useState<ChartData[]>([]);

  useEffect(() => {
    if (email) {
      fetchChartData(email);
    }
  }, [email]);

  const fetchChartData = async (email: string) => {
    try {
      const response = await axios.get(`https://backend-mzfh.onrender.com/task/${email}`);
      const tasks = response.data;

      if (Array.isArray(tasks)) {
        // Group tasks by day and calculate metrics
        const groupedData = tasks.reduce((acc, task) => {
          const day = new Date(task.createdAt).toLocaleDateString("en-US", { weekday: "short" });
          if (!acc[day]) {
            acc[day] = { name: day, tasks: 0, calls: 0 };
          }
          acc[day].tasks += 1;
          acc[day].calls += task.callsShadowed || 0;
          return acc;
        }, {} as Record<string, ChartData>);

        // Convert grouped data to an array and cast to ChartData[]
        const formattedData = Object.values(groupedData) as ChartData[];
        setChartData(formattedData);
      } else {
        console.error("Expected an array of tasks, but received:", tasks);
      }
    } catch (error) {
      console.error("Failed to fetch chart data:", error);
    }
  };

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="tasks" fill="#8884d8" name="Tasks Completed" />
          <Bar dataKey="calls" fill="#82ca9d" name="Calls Made" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

