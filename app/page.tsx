import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  ArrowRight,
  BarChart3,
  CheckCircle,
  Users,
  Code,
  Terminal,
  FileText,
  Zap,
  Shield,
  Database,
} from "lucide-react"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl">
            <img
              src="https://assets.cdnts.net/companies/logos/thescalers.png"
              alt="The Scalers Logo"
              className="h-8 w-auto"
            />
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="#features" className="text-sm font-medium hover:underline underline-offset-4">
              Features
            </Link>
            <Link href="#about" className="text-sm font-medium hover:underline underline-offset-4">
              About
            </Link>
            <Link href="#ide" className="text-sm font-medium hover:underline underline-offset-4">
              IDE
            </Link>
          </nav>
          <div>
            <Link href="/auth/login">
              <Button>Sign In</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Track Your Team&apos;s Progress
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    The SCALERS internal tool helps you monitor daily tasks, track call volumes, and measure team
                    productivity with our integrated development environment.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/auth/login">
                    <Button size="lg" className="gap-1.5">
                      Get Started <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
              <Image
                src="https://storage.googleapis.com/cdn-website-bolddesk/2024/06/bdcbab56-increase-team-productivity@2x-banner-compressed.jpg"
                width={550}
                height={550}
                alt="Dashboard Preview"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
              />
            </div>
          </div>
        </section>

        {/* IDE Launch Section */}
        <section
          id="ide"
          className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-primary/5 via-background to-secondary/5"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-8 text-center">
              <div className="space-y-4">
                <div className="inline-flex items-center rounded-full border px-4 py-2 text-sm font-medium">
                  <Terminal className="mr-2 h-4 w-4" />
                  Integrated Development Environment
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Launch Your Development Workspace
                </h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                  Access our powerful internal IDE to streamline your development workflow, collaborate with your team,
                  and build amazing applications.
                </p>
              </div>
              <div className="flex flex-col gap-4 min-[400px]:flex-row">
                <Link href="/ide">
                  <Button size="lg" className="gap-2 px-8">
                    <Code className="h-5 w-5" />
                    Launch IDE
                  </Button>
                </Link>
                {/* <Link href="/ide">
                  <Button variant="outline" size="lg" className="gap-2 px-8">
                    <FileText className="h-5 w-5" />
                    Launch IDE
                  </Button>
                </Link> */}
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Platform Features</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Comprehensive tools designed for internal team productivity and development excellence.
                </p>
              </div>
            </div>

            {/* Main Features Grid */}
            <div className="mx-auto grid max-w-6xl gap-8 py-12 lg:grid-cols-3">
              <div className="group relative overflow-hidden rounded-xl border bg-background p-8 shadow-sm transition-all hover:shadow-lg">
                <div className="flex items-center gap-4 mb-4">
                  <div className="rounded-lg bg-primary p-3 text-primary-foreground">
                    <CheckCircle className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold">Task Management</h3>
                </div>
                <p className="text-muted-foreground mb-6">
                  Advanced task tracking with real-time progress monitoring, deadline management, and team collaboration
                  features.
                </p>
                <div className="flex gap-2">
                  <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                    Real-time
                  </span>
                  <span className="inline-flex items-center rounded-full bg-secondary/10 px-2.5 py-0.5 text-xs font-medium text-secondary-foreground">
                    Collaborative
                  </span>
                </div>
              </div>

              <div className="group relative overflow-hidden rounded-xl border bg-background p-8 shadow-sm transition-all hover:shadow-lg">
                <div className="flex items-center gap-4 mb-4">
                  <div className="rounded-lg bg-primary p-3 text-primary-foreground">
                    <Code className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold">Development IDE</h3>
                </div>
                <p className="text-muted-foreground mb-6">
                  Full-featured integrated development environment with syntax highlighting, debugging, and version
                  control.
                </p>
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                      Code Editor
                    </span>
                    <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                      Debugging
                    </span>
                  </div>
                 
                </div>
              </div>

              <div className="group relative overflow-hidden rounded-xl border bg-background p-8 shadow-sm transition-all hover:shadow-lg">
                <div className="flex items-center gap-4 mb-4">
                  <div className="rounded-lg bg-primary p-3 text-primary-foreground">
                    <BarChart3 className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold">Analytics Dashboard</h3>
                </div>
                <p className="text-muted-foreground mb-6">
                  Comprehensive analytics with customizable dashboards, performance metrics, and detailed reporting.
                </p>
                <div className="flex gap-2">
                  <span className="inline-flex items-center rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-medium text-purple-800">
                    Metrics
                  </span>
                  <span className="inline-flex items-center rounded-full bg-orange-100 px-2.5 py-0.5 text-xs font-medium text-orange-800">
                    Reports
                  </span>
                </div>
              </div>
            </div>

            {/* Additional Features */}
            <div className="mx-auto grid max-w-4xl gap-6 lg:grid-cols-2">
              <div className="flex items-start gap-4 rounded-lg border p-6">
                <div className="rounded-md bg-primary/10 p-2">
                  <Zap className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Performance Optimization</h4>
                  <p className="text-sm text-muted-foreground">
                    Built-in performance monitoring and optimization tools to ensure your applications run efficiently.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-lg border p-6">
                <div className="rounded-md bg-primary/10 p-2">
                  <Shield className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Security & Compliance</h4>
                  <p className="text-sm text-muted-foreground">
                    Enterprise-grade security features with role-based access control and audit logging.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-lg border p-6">
                <div className="rounded-md bg-primary/10 p-2">
                  <Database className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Data Management</h4>
                  <p className="text-sm text-muted-foreground">
                    Integrated database tools with query builders, data visualization, and backup management.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-lg border p-6">
                <div className="rounded-md bg-primary/10 p-2">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Team Collaboration</h4>
                  <p className="text-sm text-muted-foreground">
                    Real-time collaboration features including shared workspaces, comments, and team chat.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
              <div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">About The SCALERS</h2>
                <p className="mt-4 text-muted-foreground md:text-xl/relaxed">
                  The SCALERS is dedicated to helping organizations scale their operations efficiently. Our internal
                  tools are designed to streamline workflows, improve productivity, and provide actionable insights for
                  team leaders.
                </p>
                <p className="mt-4 text-muted-foreground md:text-xl/relaxed">
                  Our integrated development environment empowers teams to build, test, and deploy applications
                  seamlessly while maintaining the highest standards of code quality and collaboration.
                </p>
                <div className="mt-6 flex gap-4">
                  <Link href="/ide">
                    <Button className="gap-2">
                      <Code className="h-4 w-4" />
                      Try Our IDE
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <Image
                  src="https://thescalers.com/wp-content/uploads/2024/03/the_scalers_header-d-1.webp"
                  width={800}
                  height={400}
                  alt="The SCALERS Team"
                  className="rounded-lg object-cover"
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full border-t py-6">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-2 font-semibold">
            <BarChart3 className="h-5 w-5" />
            <span>THE SCALERS</span>
          </div>
          <p className="text-center text-sm text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} The SCALERS. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="#" className="text-sm text-muted-foreground hover:underline underline-offset-4">
              Privacy Policy
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:underline underline-offset-4">
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
