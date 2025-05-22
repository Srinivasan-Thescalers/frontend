"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import axios from "axios";
import { useSession } from "next-auth/react";

interface Task {
  _id: string;
  partnerName: string;
  position: string;
  callsShadowed: number;
  username: string;
  email: string;
  comments: string;
  createdAt?: string;
  updatedAt?: string;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const { data: session } = useSession();
  const email = session?.user?.email;

  useEffect(() => {
    if (email) {
      fetchTasks(email);
    }
  }, [email]);

  const fetchTasks = async (email: string) => {
    try {
      const response = await axios.get(`https://backend-mzfh.onrender.com/task/${email}`);
      if (Array.isArray(response.data)) {
        setTasks(response.data);
      } else {
        setTasks([]);
      }
    } catch (error) {
      setTasks([]);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {tasks.map((task) => (
        <Card key={task._id} className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle>{task.partnerName}</CardTitle>
            <CardDescription>{task.position}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                <span className="font-medium">Calls Shadowed:</span> {task.callsShadowed}
              </p>
              <p className="text-sm text-muted-foreground">
                <span className="font-medium">Username:</span> {task.username}
              </p>
              <p className="text-sm text-muted-foreground">
                <span className="font-medium">Email:</span> {task.email}
              </p>
              <p className="text-sm text-muted-foreground">
                <span className="font-medium">Comments:</span> {task.comments}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}