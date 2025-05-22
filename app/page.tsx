import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, BarChart3, CheckCircle, Clock, Users } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2 font-bold text-xl">
  <img src="https://assets.cdnts.net/companies/logos/thescalers.png" alt="The Scalers Logo" className="h-8 w-auto" />
</div>
          <nav className="hidden md:flex gap-6">
            <Link href="#features" className="text-sm font-medium hover:underline underline-offset-4">
              Features
            </Link>
            <Link href="#about" className="text-sm font-medium hover:underline underline-offset-4">
              About
            </Link>
            <Link href="#testimonials" className="text-sm font-medium hover:underline underline-offset-4">
              Testimonials
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
                    productivity.
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

        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Features</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our platform provides everything you need to track and improve team performance.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-4 rounded-lg border p-6">
                <div className="rounded-full bg-primary p-3 text-primary-foreground">
                  <CheckCircle className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Task Tracking</h3>
                <p className="text-center text-muted-foreground">
                  Log and monitor daily tasks with detailed completion metrics.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 rounded-lg border p-6">
                <div className="rounded-full bg-primary p-3 text-primary-foreground">
                  <Clock className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Time Management</h3>
                <p className="text-center text-muted-foreground">
                  Track time spent on various activities to optimize productivity.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 rounded-lg border p-6">
                <div className="rounded-full bg-primary p-3 text-primary-foreground">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Team Analytics</h3>
                <p className="text-center text-muted-foreground">
                  Visualize team performance with comprehensive analytics dashboards.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="w-full py-12 md:py-24 lg:py-32">
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
                  Founded with a mission to empower teams, we've helped hundreds of organizations transform their
                  internal processes and achieve remarkable growth.
                </p>
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

        <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter text-center sm:text-4xl md:text-5xl">
              What Our Users Say
            </h2>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-2">
              <div className="flex flex-col justify-between rounded-lg border bg-background p-6">
                <div>
                  <p className="mb-4 italic">
                    "The SCALERS internal tool has transformed how our team tracks daily tasks. The insights we've
                    gained have helped us optimize our workflow and increase productivity by 30%."
                  </p>
                </div>
                <div>
                  <p className="font-semibold">Sarah Johnson</p>
                  <p className="text-sm text-muted-foreground">Team Lead, TechCorp</p>
                </div>
              </div>
              <div className="flex flex-col justify-between rounded-lg border bg-background p-6">
                <div>
                  <p className="mb-4 italic">
                    "Since implementing The SCALERS, our call tracking has become seamless. The dashboard provides clear
                    visibility into team performance, making it easier to identify areas for improvement."
                  </p>
                </div>
                <div>
                  <p className="font-semibold">Michael Chen</p>
                  <p className="text-sm text-muted-foreground">Operations Manager, GlobalServe</p>
                </div>
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

