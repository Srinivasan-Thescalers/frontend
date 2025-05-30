"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileIcon, PlayIcon, SearchIcon, BrainIcon, Loader2 } from "lucide-react"

export default function Home() {
  const [code, setCode] = useState<string>('console.log("Hello, World!");')
  const [language, setLanguage] = useState<string>("javascript")
  const [output, setOutput] = useState<string>("")
  const [activeTab, setActiveTab] = useState<string>("output")
  const [plagiarismResult, setPlagiarismResult] = useState<string>("")
  const [aiResult, setAiResult] = useState<string>("")
  const [isRunning, setIsRunning] = useState<boolean>(false)

  const languages = [
    {
      value: "javascript",
      label: "JavaScript",
      sample: 'console.log("Hello, World!");',
    },
    {
      value: "python",
      label: "Python",
      sample: 'print("Hello, World!")',
    },
    {
      value: "java",
      label: "Java",
      sample: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,
    },
    {
      value: "csharp",
      label: "C#",
      sample: `using System;

class Program {
    static void Main() {
        Console.WriteLine("Hello, World!");
    }
}`,
    },
    {
      value: "cpp",
      label: "C++",
      sample: `#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    return 0;
}`,
    },
    {
      value: "c",
      label: "C",
      sample: `#include <stdio.h>

int main() {
    printf("Hello, World!\\n");
    return 0;
}`,
    },
    {
      value: "typescript",
      label: "TypeScript",
      sample: 'console.log("Hello, World!");',
    },
  ]
  const executeCode = async (lang: string, code: string): Promise<string> => {
    if (lang !== "javascript" && lang !== "typescript") {
      return `${lang} execution is not supported in this IDE.`;
    }
  
    let originalConsole = { ...console }; // Backup original console methods
    let result = "";
  
    try {
      // Override console methods to capture output
      console.log = (...args) => {
        result += args.join(" ") + "\n";
      };
      console.error = (...args) => {
        result += "Error: " + args.join(" ") + "\n";
      };
      console.warn = (...args) => {
        result += "Warning: " + args.join(" ") + "\n";
      };
  
      // Wrap the code in an async function to support async/await
      const asyncWrapper = `(async () => { ${code} })()`;
  
      // Use eval to execute the wrapped code
      await eval(asyncWrapper);
  
      // Wait for all macrotasks and microtasks to complete
      await new Promise((resolve) => setTimeout(resolve, 0));
  
      return result || "Code executed successfully with no output.";
    } catch (error) {
      if (error instanceof Error) {
        return `Error: ${error.message}`;
      }
      return "An unknown error occurred.";
    } finally {
      // Restore original console methods
      console = originalConsole;
    }
  };

  const handleRun = async () => {
    setIsRunning(true)
    setOutput("Executing code...")
    setActiveTab("output")

    try {
      const result = await executeCode(language, code)
      setOutput(result)
    } catch (error) {
      if (error instanceof Error) {
        setOutput(`Error: ${error.message}`)
      } else {
        setOutput("An unknown error occurred.")
      }
    } finally {
      setIsRunning(false)
    }
  }

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage)
    const langConfig = languages.find((l) => l.value === newLanguage)
    if (langConfig) {
      setCode(langConfig.sample)
    }
    setOutput("")
    setPlagiarismResult("")
    setAiResult("")
  }

  return (
    <main className="flex flex-col h-screen bg-gray-900 text-white">
      <header className="flex items-center justify-between p-4 bg-gray-800 border-b border-gray-700">
        <div className="flex items-center space-x-2">
          <FileIcon className="h-5 w-5 text-blue-400" />
          <h1 className="text-xl font-bold">Inbuilt IDE</h1>
        </div>
        <div className="flex items-center space-x-4">
          <Select value={language} onValueChange={handleLanguageChange}>
            <SelectTrigger className="w-[180px] bg-gray-700 border-gray-600">
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent className="bg-gray-700 border-gray-600">
              {languages.map((lang) => (
                <SelectItem key={lang.value} value={lang.value}>
                  {lang.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button onClick={handleRun} disabled={isRunning} className="bg-green-600 hover:bg-green-700">
            {isRunning ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <PlayIcon className="h-4 w-4 mr-2" />}
            {isRunning ? "Running..." : "Run"}
          </Button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <div className="w-1/2 border-r border-gray-700 flex flex-col">
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="flex-1 w-full bg-gray-900 text-white p-4 font-mono text-sm resize-none focus:outline-none"
            spellCheck="false"
            placeholder={`Write your ${language} code here...`}
          />
        </div>

        <div className="w-1/2">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
            <TabsList className="bg-gray-800 p-0 h-10">
              <TabsTrigger value="output" className="flex-1 data-[state=active]:bg-gray-700">
                Output
              </TabsTrigger>
            </TabsList>
            <TabsContent value="output" className="flex-1 p-0 m-0">
              <div className="h-full w-full bg-gray-950 p-4 font-mono text-sm overflow-auto">
                {output ? (
                  <pre className="whitespace-pre-wrap text-green-400">{output}</pre>
                ) : (
                  <div className="text-gray-500 h-full flex items-center justify-center">
                    Click "Run" to execute your {language} code
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <footer className="p-2 bg-gray-800 border-t border-gray-700 text-xs text-gray-400 text-center">
        Multi-Language IDE © {new Date().getFullYear()}
      </footer>
    </main>
  )
}