import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import { NextAuthProvider } from "@/components/auth-provider"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "The SCALERS - Internal Tool",
  description: "Track your team's daily tasks and performance",
    generator: 'Next.js',
  applicationName: 'The SCALERS Internal Tool',
  keywords: ['Next.js', 'React', 'Internal Tool', 'Task Management', 'Performance Tracking'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
          <link rel="icon" href="https://www.ciowatercooler.co.uk/wp-content/uploads/2022/10/Partner-Logos-11.png" type="image/png" />
      </head>
      <body className={inter.className}>
        <NextAuthProvider>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
            {children}
          </ThemeProvider>
        </NextAuthProvider>
      </body>
    </html>
  )
}



import './globals.css'