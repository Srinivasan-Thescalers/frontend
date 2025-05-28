"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut, useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useSidebar } from "@/components/sidebar-provider"
import { BarChart3, LayoutDashboard, LogOut, Menu, PhoneCall, Settings, CheckSquare, Paperclip, Newspaper } from "lucide-react"

export function DashboardSidebar() {
  const pathname = usePathname()
  const { open, setOpen, isMobile } = useSidebar()
  const { data: session } = useSession()

  const routes = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Tasks",
      href: "/dashboard/tasks",
      icon: CheckSquare,
    },
    // {
    //   name: "Calls",
    //   href: "/dashboard/calls",
    //   icon: PhoneCall,
    // },
    {
      name: "Settings",
      href: "/dashboard/settings",
      icon: Settings,
    },
    {
      name: "Questions",
      href: "/dashboard/questions",
      icon: Paperclip,
    },
    {
      name: "Tech News",
      href: "/dashboard/news",
      icon: Newspaper,
    },
    {
      name: "Login as Super Admin",
      href: "/auth/superadmin-login",
      icon: LogOut, // You can replace this with a more appropriate icon if needed
    },

  ]

  const handleSignOut = () => {
    signOut({ callbackUrl: "/" })
  }

  if (isMobile) {
    return (
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="absolute left-4 top-4 z-40 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0">
          <MobileSidebar routes={routes} pathname={pathname} user={session?.user} onSignOut={handleSignOut} />
        </SheetContent>
      </Sheet>
    )
  }

  return (
    <DesktopSidebar open={open} routes={routes} pathname={pathname} user={session?.user} onSignOut={handleSignOut} />
  )
}

function DesktopSidebar({
  open,
  routes,
  pathname,
  user,
  onSignOut,
}: {
  open: boolean
  routes: { name: string; href: string; icon: any }[]
  pathname: string
  user: any
  onSignOut: () => void
}) {
  return (
    <div
      className={`relative hidden h-screen border-r bg-background p-4 md:block ${
        open ? "w-64" : "w-16"
      } transition-all duration-300`}
    >
      <div className="flex h-full flex-col gap-4">
        <div className="flex h-14 items-center justify-center">
          {open ? (
            <div className="flex items-center gap-2 font-bold text-xl">
            <img src="https://assets.cdnts.net/companies/logos/thescalers.png" alt="The Scalers Logo" className="h-8 w-auto" />
          </div>
          ) : (
            <BarChart3 className="h-6 w-6" />
          )}
        </div>
        <ScrollArea className="flex-1 pt-4">
          <nav className="grid gap-2 px-2">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={{
                  pathname: route.href,
                  query: route.href === "/dashboard/tasks" && user ? { name: user.name, email: user.email } : undefined,
                }}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent ${
                  pathname === route.href ? "bg-accent text-accent-foreground" : "text-muted-foreground"
                }`}
              >
                <route.icon className="h-5 w-5" />
                {open && <span>{route.name}</span>}
              </Link>
            ))}
          </nav>
        </ScrollArea>
        <div className="mt-auto border-t pt-4">
          {open && user && (
            <div className="mb-4 flex items-center gap-2 px-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user.image || ""} alt={user.name || "User"} />
                <AvatarFallback>{user.name?.charAt(0) || "U"}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-medium">{user.name}</span>
                <span className="text-xs text-muted-foreground">{user.email}</span>
              </div>
            </div>
          )}
          <Button variant="ghost" className="w-full justify-start px-3" onClick={onSignOut}>
            <LogOut className="mr-2 h-5 w-5" />
            {open && <span>Logout</span>}
          </Button>
        </div>
      </div>
    </div>
  )
}

function MobileSidebar({
  routes,
  pathname,
  user,
  onSignOut,
}: {
  routes: { name: string; href: string; icon: any }[]
  pathname: string
  user: any
  onSignOut: () => void
}) {
  return (
    <div className="flex h-full flex-col gap-4 p-4">
      <div className="flex h-14 items-center">
      <div className="flex items-center gap-2 font-bold text-xl">
  <img src="https://assets.cdnts.net/companies/logos/thescalers.png" alt="The Scalers Logo" className="h-8 w-auto" />
</div>
      </div>
      {user && (
        <div className="flex items-center gap-2 px-2 py-2 border-b">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.image || ""} alt={user.name || "User"} />
            <AvatarFallback>{user.name?.charAt(0) || "U"}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-medium">{user.name}</span>
            <span className="text-xs text-muted-foreground">{user.email}</span>
          </div>
        </div>
      )}
      <ScrollArea className="flex-1">
        <nav className="grid gap-2">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={{
                pathname: route.href,
                query: route.href === "/dashboard/tasks" && user ? { name: user.name, email: user.email } : undefined,
              }}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent ${
                pathname === route.href ? "bg-accent text-accent-foreground" : "text-muted-foreground"
              }`}
            >
              <route.icon className="h-5 w-5" />
              <span>{route.name}</span>
            </Link>
          ))}
        </nav>
      </ScrollArea>
      <div className="mt-auto border-t pt-4">
        <Button variant="ghost" className="w-full justify-start" onClick={onSignOut}>
          <LogOut className="mr-2 h-5 w-5" />
          <span>Logout</span>
        </Button>
      </div>

 
    </div>
  )
}

