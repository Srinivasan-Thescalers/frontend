"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Code, BookOpen } from "lucide-react"

type Technology =
  | "java"
  | "react"
  | "node"
  | "python"
  | "qa"
  | "sql"
  | "ml"
  | "llms"
  | "pyspark"
  | "dataengineer"
  | "devops"
  | "cloud"
  | "frontend"
  | "backend"

interface Question {
  id: number
  question: string
  difficulty: "Easy" | "Medium" | "Hard"
}

interface TechQuestions {
  coding: Question[]
  theory: Question[]
}

const questionsData: Record<Technology, TechQuestions> = {
  java: {
    coding: [
      { id: 1, question: "Write a program to reverse a string without using built-in functions", difficulty: "Easy" },
      { id: 2, question: "Implement a binary search algorithm", difficulty: "Medium" },
      { id: 3, question: "Create a thread-safe singleton pattern", difficulty: "Hard" },
      { id: 4, question: "Find the first non-repeating character in a string", difficulty: "Medium" },
      { id: 5, question: "Implement a custom ArrayList with generic support", difficulty: "Hard" },
    ],
    theory: [
      { id: 1, question: "Explain the difference between == and equals() in Java", difficulty: "Easy" },
      { id: 2, question: "What is the difference between abstract class and interface?", difficulty: "Medium" },
      { id: 3, question: "Explain Java memory management and garbage collection", difficulty: "Hard" },
      { id: 4, question: "What are the principles of OOP and how does Java implement them?", difficulty: "Medium" },
      { id: 5, question: "Explain multithreading and synchronization in Java", difficulty: "Hard" },
    ],
  },
  react: {
    coding: [
      { id: 1, question: "Create a counter component with increment and decrement buttons", difficulty: "Easy" },
      { id: 2, question: "Build a todo list with add, delete, and toggle functionality", difficulty: "Medium" },
      { id: 3, question: "Implement a custom hook for API data fetching with loading states", difficulty: "Hard" },
      { id: 4, question: "Create a form with validation using controlled components", difficulty: "Medium" },
      { id: 5, question: "Build a reusable modal component with portal", difficulty: "Hard" },
    ],
    theory: [
      { id: 1, question: "What is the difference between state and props?", difficulty: "Easy" },
      { id: 2, question: "Explain the React component lifecycle methods", difficulty: "Medium" },
      { id: 3, question: "What is the Virtual DOM and how does it work?", difficulty: "Hard" },
      { id: 4, question: "Explain useEffect hook and its dependency array", difficulty: "Medium" },
      {
        id: 5,
        question: "What are React patterns like HOC, Render Props, and Compound Components?",
        difficulty: "Hard",
      },
    ],
  },
  node: {
    coding: [
      { id: 1, question: "Create a simple HTTP server that responds with 'Hello World'", difficulty: "Easy" },
      { id: 2, question: "Build a REST API with CRUD operations for a user resource", difficulty: "Medium" },
      { id: 3, question: "Implement JWT authentication middleware", difficulty: "Hard" },
      { id: 4, question: "Create a file upload endpoint with validation", difficulty: "Medium" },
      { id: 5, question: "Build a real-time chat application using WebSockets", difficulty: "Hard" },
    ],
    theory: [
      { id: 1, question: "What is the event loop in Node.js?", difficulty: "Easy" },
      {
        id: 2,
        question: "Explain the difference between synchronous and asynchronous operations",
        difficulty: "Medium",
      },
      { id: 3, question: "What are streams in Node.js and when would you use them?", difficulty: "Hard" },
      { id: 4, question: "Explain middleware in Express.js", difficulty: "Medium" },
      { id: 5, question: "How does Node.js handle concurrency without threads?", difficulty: "Hard" },
    ],
  },
  python: {
    coding: [
      { id: 1, question: "Write a function to check if a string is a palindrome", difficulty: "Easy" },
      { id: 2, question: "Implement a decorator that measures function execution time", difficulty: "Medium" },
      { id: 3, question: "Create a context manager for database connections", difficulty: "Hard" },
      { id: 4, question: "Build a class that implements the iterator protocol", difficulty: "Medium" },
      { id: 5, question: "Implement a metaclass that automatically adds logging to methods", difficulty: "Hard" },
    ],
    theory: [
      { id: 1, question: "What is the difference between list and tuple?", difficulty: "Easy" },
      { id: 2, question: "Explain Python's GIL (Global Interpreter Lock)", difficulty: "Medium" },
      { id: 3, question: "What are decorators and how do they work?", difficulty: "Hard" },
      { id: 4, question: "Explain the difference between deep copy and shallow copy", difficulty: "Medium" },
      { id: 5, question: "What are generators and when would you use them?", difficulty: "Hard" },
    ],
  },
  qa: {
    coding: [
      { id: 1, question: "Write a test case for a login functionality using Selenium", difficulty: "Easy" },
      { id: 2, question: "Create an automated test script for API testing using REST Assured", difficulty: "Medium" },
      { id: 3, question: "Implement a data-driven testing framework with TestNG", difficulty: "Hard" },
      { id: 4, question: "Write a performance test script using JMeter or similar tool", difficulty: "Medium" },
      { id: 5, question: "Create a cross-browser testing suite with Playwright", difficulty: "Hard" },
    ],
    theory: [
      { id: 1, question: "What is the difference between functional and non-functional testing?", difficulty: "Easy" },
      { id: 2, question: "Explain the testing pyramid and its importance", difficulty: "Medium" },
      { id: 3, question: "What are the different types of test automation frameworks?", difficulty: "Hard" },
      { id: 4, question: "Explain shift-left testing and its benefits", difficulty: "Medium" },
      { id: 5, question: "What is the difference between smoke, sanity, and regression testing?", difficulty: "Hard" },
    ],
  },
  sql: {
    coding: [
      { id: 1, question: "Write a query to find the second highest salary from an employee table", difficulty: "Easy" },
      { id: 2, question: "Create a query to find duplicate records in a table", difficulty: "Medium" },
      { id: 3, question: "Write a complex query with multiple JOINs and subqueries", difficulty: "Hard" },
      { id: 4, question: "Create a stored procedure with error handling", difficulty: "Medium" },
      { id: 5, question: "Optimize a slow-performing query with proper indexing strategy", difficulty: "Hard" },
    ],
    theory: [
      { id: 1, question: "What is the difference between INNER JOIN and LEFT JOIN?", difficulty: "Easy" },
      { id: 2, question: "Explain ACID properties in database transactions", difficulty: "Medium" },
      { id: 3, question: "What are database normalization forms and their purposes?", difficulty: "Hard" },
      { id: 4, question: "Explain the difference between clustered and non-clustered indexes", difficulty: "Medium" },
      { id: 5, question: "What are window functions and when would you use them?", difficulty: "Hard" },
    ],
  },
  ml: {
    coding: [
      { id: 1, question: "Implement a simple linear regression from scratch using NumPy", difficulty: "Easy" },
      {
        id: 2,
        question: "Create a classification model using scikit-learn with cross-validation",
        difficulty: "Medium",
      },
      {
        id: 3,
        question: "Build a neural network using TensorFlow/PyTorch for image classification",
        difficulty: "Hard",
      },
      { id: 4, question: "Implement k-means clustering algorithm from scratch", difficulty: "Medium" },
      { id: 5, question: "Create a recommendation system using collaborative filtering", difficulty: "Hard" },
    ],
    theory: [
      { id: 1, question: "What is the difference between supervised and unsupervised learning?", difficulty: "Easy" },
      { id: 2, question: "Explain bias-variance tradeoff in machine learning", difficulty: "Medium" },
      { id: 3, question: "What are the different types of gradient descent algorithms?", difficulty: "Hard" },
      { id: 4, question: "Explain overfitting and techniques to prevent it", difficulty: "Medium" },
      { id: 5, question: "What is the curse of dimensionality and how to handle it?", difficulty: "Hard" },
    ],
  },
  llms: {
    coding: [
      { id: 1, question: "Create a simple chatbot using OpenAI API", difficulty: "Easy" },
      { id: 2, question: "Implement RAG (Retrieval Augmented Generation) system", difficulty: "Medium" },
      { id: 3, question: "Fine-tune a pre-trained language model for specific domain", difficulty: "Hard" },
      { id: 4, question: "Build a prompt engineering framework with templates", difficulty: "Medium" },
      { id: 5, question: "Create a multi-agent system using LangChain", difficulty: "Hard" },
    ],
    theory: [
      { id: 1, question: "What is the transformer architecture and how does it work?", difficulty: "Easy" },
      { id: 2, question: "Explain the difference between GPT, BERT, and T5 models", difficulty: "Medium" },
      { id: 3, question: "What are the challenges in training large language models?", difficulty: "Hard" },
      { id: 4, question: "Explain prompt engineering techniques and best practices", difficulty: "Medium" },
      { id: 5, question: "What are the ethical considerations when deploying LLMs?", difficulty: "Hard" },
    ],
  },
  pyspark: {
    coding: [
      { id: 1, question: "Create a simple PySpark job to read and filter a CSV file", difficulty: "Easy" },
      { id: 2, question: "Implement data aggregation and grouping operations in PySpark", difficulty: "Medium" },
      { id: 3, question: "Build a streaming data pipeline using Spark Structured Streaming", difficulty: "Hard" },
      { id: 4, question: "Create a machine learning pipeline using Spark MLlib", difficulty: "Medium" },
      { id: 5, question: "Optimize PySpark job performance with partitioning and caching", difficulty: "Hard" },
    ],
    theory: [
      { id: 1, question: "What is the difference between RDD, DataFrame, and Dataset?", difficulty: "Easy" },
      { id: 2, question: "Explain Spark's lazy evaluation and its benefits", difficulty: "Medium" },
      { id: 3, question: "What are the different cluster managers supported by Spark?", difficulty: "Hard" },
      { id: 4, question: "Explain Spark's memory management and storage levels", difficulty: "Medium" },
      { id: 5, question: "What are the best practices for optimizing Spark applications?", difficulty: "Hard" },
    ],
  },
  dataengineer: {
    coding: [
      { id: 1, question: "Create an ETL pipeline using Python and pandas", difficulty: "Easy" },
      { id: 2, question: "Build a data pipeline using Apache Airflow", difficulty: "Medium" },
      { id: 3, question: "Implement real-time data streaming with Kafka and Spark", difficulty: "Hard" },
      { id: 4, question: "Create a data warehouse schema with fact and dimension tables", difficulty: "Medium" },
      { id: 5, question: "Build a data lake architecture with Delta Lake", difficulty: "Hard" },
    ],
    theory: [
      { id: 1, question: "What is the difference between ETL and ELT?", difficulty: "Easy" },
      { id: 2, question: "Explain data modeling concepts: star schema vs snowflake schema", difficulty: "Medium" },
      { id: 3, question: "What are the principles of data lake architecture?", difficulty: "Hard" },
      { id: 4, question: "Explain data lineage and its importance", difficulty: "Medium" },
      { id: 5, question: "What are the challenges in building scalable data pipelines?", difficulty: "Hard" },
    ],
  },
  devops: {
    coding: [
      { id: 1, question: "Write a Dockerfile for a Node.js application", difficulty: "Easy" },
      { id: 2, question: "Create a CI/CD pipeline using GitHub Actions", difficulty: "Medium" },
      { id: 3, question: "Implement Infrastructure as Code using Terraform", difficulty: "Hard" },
      { id: 4, question: "Set up monitoring and alerting with Prometheus and Grafana", difficulty: "Medium" },
      { id: 5, question: "Create a Kubernetes deployment with auto-scaling", difficulty: "Hard" },
    ],
    theory: [
      { id: 1, question: "What is the difference between containers and virtual machines?", difficulty: "Easy" },
      { id: 2, question: "Explain the principles of continuous integration and deployment", difficulty: "Medium" },
      { id: 3, question: "What are the benefits of microservices architecture?", difficulty: "Hard" },
      { id: 4, question: "Explain blue-green deployment and canary releases", difficulty: "Medium" },
      { id: 5, question: "What is observability and how is it different from monitoring?", difficulty: "Hard" },
    ],
  },
  cloud: {
    coding: [
      { id: 1, question: "Deploy a simple web application on AWS EC2", difficulty: "Easy" },
      { id: 2, question: "Create a serverless function using AWS Lambda", difficulty: "Medium" },
      { id: 3, question: "Implement auto-scaling architecture with load balancers", difficulty: "Hard" },
      { id: 4, question: "Set up a multi-region disaster recovery solution", difficulty: "Medium" },
      { id: 5, question: "Build a data pipeline using cloud-native services", difficulty: "Hard" },
    ],
    theory: [
      { id: 1, question: "What are the different cloud service models (IaaS, PaaS, SaaS)?", difficulty: "Easy" },
      { id: 2, question: "Explain the shared responsibility model in cloud computing", difficulty: "Medium" },
      { id: 3, question: "What are the benefits and challenges of multi-cloud strategy?", difficulty: "Hard" },
      { id: 4, question: "Explain cloud security best practices", difficulty: "Medium" },
      { id: 5, question: "What is cloud-native architecture and its principles?", difficulty: "Hard" },
    ],
  },
  frontend: {
    coding: [
      { id: 1, question: "Create a responsive navigation menu with CSS and JavaScript", difficulty: "Easy" },
      { id: 2, question: "Build a single-page application with routing", difficulty: "Medium" },
      { id: 3, question: "Implement state management using Redux or Zustand", difficulty: "Hard" },
      { id: 4, question: "Create a reusable component library with TypeScript", difficulty: "Medium" },
      { id: 5, question: "Optimize web performance with lazy loading and code splitting", difficulty: "Hard" },
    ],
    theory: [
      { id: 1, question: "What is the difference between let, const, and var in JavaScript?", difficulty: "Easy" },
      { id: 2, question: "Explain the CSS box model and flexbox layout", difficulty: "Medium" },
      { id: 3, question: "What are web accessibility standards and how to implement them?", difficulty: "Hard" },
      { id: 4, question: "Explain browser rendering process and critical rendering path", difficulty: "Medium" },
      { id: 5, question: "What are Progressive Web Apps and their benefits?", difficulty: "Hard" },
    ],
  },
  backend: {
    coding: [
      { id: 1, question: "Create a REST API with basic CRUD operations", difficulty: "Easy" },
      { id: 2, question: "Implement authentication and authorization middleware", difficulty: "Medium" },
      { id: 3, question: "Build a microservices architecture with API gateway", difficulty: "Hard" },
      { id: 4, question: "Create a caching layer using Redis", difficulty: "Medium" },
      { id: 5, question: "Implement event-driven architecture with message queues", difficulty: "Hard" },
    ],
    theory: [
      { id: 1, question: "What is the difference between REST and GraphQL?", difficulty: "Easy" },
      { id: 2, question: "Explain database indexing and query optimization", difficulty: "Medium" },
      { id: 3, question: "What are the CAP theorem and its implications?", difficulty: "Hard" },
      { id: 4, question: "Explain different caching strategies and their use cases", difficulty: "Medium" },
      { id: 5, question: "What are the principles of designing scalable backend systems?", difficulty: "Hard" },
    ],
  },
}

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case "Easy":
      return "bg-green-100 text-green-800 hover:bg-green-200"
    case "Medium":
      return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
    case "Hard":
      return "bg-red-100 text-red-800 hover:bg-red-200"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export default function QuestionsPage() {
  const [selectedTech, setSelectedTech] = useState<Technology>("react")

  const currentQuestions = selectedTech ? questionsData[selectedTech] : null

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Questions to Ask Candidates</h1>
          <p className="text-lg text-gray-600">Select a technology stack to view relevant interview questions</p>
        </div>

        <div className="mb-8">
          <Select value={selectedTech} onValueChange={(value: Technology) => setSelectedTech(value)}>
            <SelectTrigger className="w-full max-w-xs mx-auto">
              <SelectValue placeholder="Select Technology" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="java">Java</SelectItem>
              <SelectItem value="react">React</SelectItem>
              <SelectItem value="node">Node.js</SelectItem>
              <SelectItem value="python">Python</SelectItem>
              <SelectItem value="qa">QA Testing</SelectItem>
              <SelectItem value="sql">SQL</SelectItem>
              <SelectItem value="ml">Machine Learning</SelectItem>
              <SelectItem value="llms">LLMs</SelectItem>
              <SelectItem value="pyspark">PySpark</SelectItem>
              <SelectItem value="dataengineer">Data Engineering</SelectItem>
              <SelectItem value="devops">DevOps</SelectItem>
              <SelectItem value="cloud">Cloud Computing</SelectItem>
              <SelectItem value="frontend">Frontend Development</SelectItem>
              <SelectItem value="backend">Backend Development</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {currentQuestions && (
          <div className="grid gap-8 md:grid-cols-2">
            {/* Coding Questions */}
            <Card className="h-fit">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-5 w-5 text-blue-600" />
                  Coding Questions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {currentQuestions.coding.map((question) => (
                  <div key={question.id} className="p-4 border rounded-lg bg-white hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-sm font-medium text-gray-500">#{question.id}</span>
                      <Badge className={getDifficultyColor(question.difficulty)}>{question.difficulty}</Badge>
                    </div>
                    <p className="text-gray-800 leading-relaxed">{question.question}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Theory Questions */}
            <Card className="h-fit">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-green-600" />
                  Theory Questions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {currentQuestions.theory.map((question) => (
                  <div key={question.id} className="p-4 border rounded-lg bg-white hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-sm font-medium text-gray-500">#{question.id}</span>
                      <Badge className={getDifficultyColor(question.difficulty)}>{question.difficulty}</Badge>
                    </div>
                    <p className="text-gray-800 leading-relaxed">{question.question}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        )}

        {!selectedTech && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Code className="h-16 w-16 mx-auto" />
            </div>
            <p className="text-gray-500 text-lg">Please select a technology to view interview questions</p>
          </div>
        )}
      </div>
    </div>
  )
}
