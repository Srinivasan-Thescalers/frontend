// "use client";

// import { useState, useEffect } from "react";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import axios from "axios";
// import { useSession } from "next-auth/react";

// interface Task {
//   _id: string;
//   partnerName: string;
//   position: string;
//   callsShadowed: number;
//   username: string;
//   email: string;
//   comments: string;
//   createdAt?: string;
//   updatedAt?: string;
// }

// export function TaskList() {
//   const [tasks, setTasks] = useState<Task[]>([]);
//   const { data: session } = useSession();
//   const email = session?.user?.email;

//   useEffect(() => {
//     if (email) {
//       fetchTasks(email);
//     }
//   }, [email]);

//   const fetchTasks = async (email: string) => {
//     try {
//       const response = await axios.get(`https://backend-mzfh.onrender.com/task/${email}`);
//       if (Array.isArray(response.data)) {
//         setTasks(response.data);
//       } else {
//         setTasks([]);
//       }
//     } catch (error) {
//       setTasks([]);
//     }
//   };

//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
//       {tasks.map((task) => (
//         <Card key={task._id} className="hover:shadow-lg transition-shadow">
//           <CardHeader className="pb-2">
//             <CardTitle>{task.partnerName}</CardTitle>
//             <CardDescription>{task.position}</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-2">
//               <p className="text-sm text-muted-foreground">
//                 <span className="font-medium">Calls Shadowed:</span> {task.callsShadowed}
//               </p>
//               <p className="text-sm text-muted-foreground">
//                 <span className="font-medium">Username:</span> {task.username}
//               </p>
//               <p className="text-sm text-muted-foreground">
//                 <span className="font-medium">Email:</span> {task.email}
//               </p>
//               <p className="text-sm text-muted-foreground">
//                 <span className="font-medium">Comments:</span> {task.comments}
//               </p>
//             </div>
//           </CardContent>
//         </Card>
//       ))}
//     </div>
//   );
// }

"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { MessageSquare, Calendar, Hash } from "lucide-react"
import axios from "axios"
import { useSession } from "next-auth/react"

interface Task {
  _id: string
  partnerName: string
  position: string
  callsShadowed: number
  username: string
  email: string
  comments: string
  createdAt?: string
  updatedAt?: string
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([])
  const { data: session } = useSession()
  const email = session?.user?.email

  useEffect(() => {
    if (email) {
      fetchTasks(email)
    }
  }, [email])

  const fetchTasks = async (email: string) => {
    try {
      const response = await axios.get(`https://backend-mzfh.onrender.com/task/${email}`)
      if (Array.isArray(response.data)) {
        setTasks(response.data)
      } else {
        setTasks([])
      }
    } catch (error) {
      setTasks([])
    }
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A"
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const getCallsBadgeColor = (calls: number) => {
    if (calls >= 10) return "bg-emerald-100 text-emerald-800 border-emerald-200"
    if (calls >= 5) return "bg-amber-100 text-amber-800 border-amber-200"
    return "bg-slate-100 text-slate-800 border-slate-200"
  }

  return (
    <div className="h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
    {/* <div className="mb-6">
      <p className="text-slate-600">Track your call shadowing progress and observations</p>
      <div className="flex items-center gap-4 mt-4">
        <Badge variant="outline" className="bg-white">
          Total Tasks: {tasks.length}
        </Badge>
        <Badge variant="outline" className="bg-white">
          Total Calls: {tasks.reduce((sum, task) => sum + task.callsShadowed, 0)}
        </Badge>
      </div>
    </div> */}

    <div className="h-[calc(100vh-200px)] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-100">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 pb-6">
        {tasks.map((task, index) => (
          <Card
            key={task._id}
            className="group relative overflow-hidden bg-white border-0 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02]"
            style={{
              animationDelay: `${index * 50}ms`,
              animation: "fadeInUp 0.6s ease-out forwards",
            }}
          >
            {/* Gradient accent bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />

            <CardHeader className="pb-3 relative">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg font-semibold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                    {task.partnerName}
                  </CardTitle>
                  <CardDescription className="text-sm font-medium text-slate-600 mt-1">
                    {task.position}
                  </CardDescription>
                </div>
                <Badge className={`${getCallsBadgeColor(task.callsShadowed)} font-semibold border`}>
                  {task.callsShadowed} calls
                </Badge>
              </div>
            </CardHeader>

            <Separator className="mx-6" />

            <CardContent className="pt-4 space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-50 text-slate-600">
                    <Hash className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-slate-700">Task ID</p>
                    <p className="text-slate-600 truncate font-mono text-xs">{task._id}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-sm">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-50 text-purple-600 mt-0.5">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-slate-700 mb-1">Description</p>
                    <p className="text-slate-600 text-sm leading-relaxed line-clamp-4 bg-slate-50 p-4 rounded-md">
                      {task.comments || "No description available"}
                    </p>
                  </div>
                </div>

                {task.createdAt && (
                  <div className="flex items-center gap-3 text-sm pt-2 border-t border-slate-100">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-50 text-orange-600">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-slate-700">Created</p>
                      <p className="text-slate-600 text-xs">{formatDate(task.createdAt)}</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>

            {/* Hover effect overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          </Card>
        ))}
      </div>

      {tasks.length === 0 && (
        <div className="flex flex-col items-center justify-center h-64 text-center">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
            <MessageSquare className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">No tasks found</h3>
          <p className="text-slate-600">Your shadowing tasks will appear here once created.</p>
        </div>
      )}
    </div>

    <style jsx>{`
      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      .line-clamp-1 {
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }

      .line-clamp-4 {
        display: -webkit-box;
        -webkit-line-clamp: 4;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }

      .scrollbar-thin {
        scrollbar-width: thin;
      }

      .scrollbar-thumb-slate-300::-webkit-scrollbar-thumb {
        background-color: rgb(203 213 225);
        border-radius: 6px;
      }

      .scrollbar-track-slate-100::-webkit-scrollbar-track {
        background-color: rgb(241 245 249);
      }

      ::-webkit-scrollbar {
        width: 6px;
      }
    `}</style>
  </div>
)
}
