"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { TaskList } from "@/components/task-list";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function TasksPage() {
  const searchParams = useSearchParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const queryName = searchParams.get("name");
    const queryEmail = searchParams.get("email");
    if (queryName) setName(queryName);
    if (queryEmail) setEmail(queryEmail);
  }, [searchParams]);

  // Dropdown options (replace with your actual data if needed)
  const partnerOptions = ["NEXTPOINT", "PEI", "Brevan Howard", "Mediolanum", "Seven West Media", "JHT", "MYCARGO GATE","ALLPAY"];
  const positionOptions = ["MCSJ", "MCMJ" ,"BHDB", "BHGT", "NESD","NEMD", "PEDA", "PEML", "PESC", "BHAI", "BHBO", "BHQF", "BHSB", "BHSH", "BHSP","MEDS", "MEOS","NEMR", "NESF", "PEDS", "PELM", "PEMQ", "PEQT", "PESB", "PESD", "PESS", "PEWD", "SWDE","JHSE", "APBS"];

  const positionMapping: Record<string, string> = {
    NEXTPOINT: "NE",
    PEI: "PE",
    "Brevan Howard": "BH",
    Mediolanum: "ME",
    "Seven West Media": "SW",
    JHT: "JH",
    "MYCARGO GATE": "MC",
    "ALLPAY": "AP",
  };

  const [partnerName, setPartnerName] = useState("");
  const [position, setPosition] = useState("");
  const [callsShadowed, setCallsShadowed] = useState(0);
  const [comments, setComments] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const filteredPositionOptions = positionOptions.filter((option) =>
    partnerName ? option.startsWith(positionMapping[partnerName]) : true
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      partnerName,
      position,
      callsShadowed,
      username: name,
      email: email,
      comments,
    };

    console.log("Payload being sent:", payload);

    try {
      const response = await axios.post("https://backend-mzfh.onrender.com/task", payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status !== 200) {
        throw new Error("Failed to add task");
      }

      alert("Task added successfully!");
      setPartnerName("");
      setPosition("");
      setCallsShadowed(0);
      setComments("");
    } catch (error: any) {
      alert(error.response?.data?.message || error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Task Management</h1>
        <p className="text-muted-foreground">Track and manage your daily tasks</p>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Tasks</TabsTrigger>
          <TabsTrigger value="add">Add New Task</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4">
          <TaskList />
        </TabsContent>
        <TabsContent value="add">
          <Card>
            <form onSubmit={handleSubmit}>
              <CardHeader>
                <CardTitle>Add New Task</CardTitle>
                <CardDescription>Create a new task to track your daily activities</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="partner-name">Partner Name</Label>
                  <Select value={partnerName} onValueChange={setPartnerName} required>
                    <SelectTrigger id="partner-name">
                      <SelectValue placeholder="Select partner name" />
                    </SelectTrigger>
                    <SelectContent>
                      {partnerOptions.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="position">Position</Label>
                  <Select value={position} onValueChange={setPosition} required>
                    <SelectTrigger id="position">
                      <SelectValue placeholder="Select position" />
                    </SelectTrigger>
                    <SelectContent>
                      {filteredPositionOptions.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="calls-shadowed">Calls Shadowed</Label>
                  <Input
                    id="calls-shadowed"
                    type="number"
                    placeholder="Enter number of calls shadowed"
                    value={callsShadowed}
                    onChange={(e) => setCallsShadowed(Number(e.target.value))}
                    required
                  />
                </div>
              
                <div className="space-y-2">
                  <Label htmlFor="comments">Description</Label>
                  <Textarea
                    id="comments"
                    placeholder="Enter description"
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    required
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
                      Saving...
                    </>
                  ) : (
                    "Add Task"
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}