"use client"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Shield,
  LogOut,
  Settings,
  User,
  Bell,
  ChevronDown,
  Search,
  BarChart3,
  Users,
  Calendar,
  MessageSquare,
  Crown,
  Zap,
} from "lucide-react"

interface SuperAdminHeaderProps {
  onLogout?: () => void
}

export function SuperAdminHeader({ onLogout }: SuperAdminHeaderProps) {
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem("superadmin_token")
    if (onLogout) {
      onLogout()
    }
    router.push("/auth/superadmin-login")
  }

  return (
    <>
    <header className="relative bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 border-b border-purple-500/20 shadow-lg">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left side - Logo and Title */}
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="p-3 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-200">
                  <Crown className="h-8 w-8 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center">
                  <Zap className="h-2.5 w-2.5 text-yellow-900" />
                </div>
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                    Super Admin
                  </h1>
                  <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 shadow-md">
                    <Shield className="w-3 h-3 mr-1" />
                    MASTER
                  </Badge>
                </div>
                <p className="text-purple-200 text-sm font-medium">Employee Management System</p>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="hidden lg:flex items-center space-x-6 ml-8">
              <div className="flex items-center space-x-2 text-purple-200">
                <Users className="h-4 w-4" />
                <span className="text-sm font-medium">6 Employees</span>
              </div>
              <div className="flex items-center space-x-2 text-purple-200">
                <BarChart3 className="h-4 w-4" />
                <span className="text-sm font-medium">75% Active</span>
              </div>
              <div className="flex items-center space-x-2 text-purple-200">
                <Calendar className="h-4 w-4" />
                <span className="text-sm font-medium">Today</span>
              </div>
            </div>
          </div>

          {/* Center - Search */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-purple-300" />
              <Input 
                placeholder="Search employees, evaluations..." 
                className="pl-10 bg-white/10 border-purple-400/30 text-white placeholder:text-purple-300 focus:bg-white/20 focus:border-purple-400 transition-all duration-200"
              />
            </div>
          </div>

          {/* Right side - Actions and Profile */}
          <div className="flex items-center space-x-3">
            {/* Messages */}
            <Button variant="ghost" size="icon" className="relative text-purple-200 hover:text-white hover:bg-white/10 transition-colors duration-200">
              <MessageSquare className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-gradient-to-r from-pink-500 to-red-500 rounded-full text-xs text-white flex items-center justify-center animate-pulse">
                5
              </span>
            </Button>

            {/* Notifications */}
            <Button variant="ghost" size="icon" className="relative text-purple-200 hover:text-white hover:bg-white/10 transition-colors duration-200">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-full text-xs text-white flex items-center justify-center animate-bounce">
                12
              </span>
            </Button>

            {/* Settings */}
            <Button variant="ghost" size="icon" className="text-purple-200 hover:text-white hover:bg-white/10 transition-colors duration-200">
              <Settings className="h-5 w-5" />
            </Button>

            {/* Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-3 px-3 py-2 text-purple-200 hover:text-white hover:bg-white/10 transition-colors duration-200 rounded-xl">
                  <div className="relative">
                    <Avatar className="h-10 w-10 ring-2 ring-purple-400 ring-offset-2 ring-offset-transparent">
                      <AvatarFallback className="bg-gradient-to-br from-purple-500 to-blue-600 text-white font-bold text-lg">
                        SA
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-slate-900"></div>
                  </div>
                  <div className="hidden lg:block text-left">
                    <p className="text-sm font-semibold text-white">Super Admin</p>
                    <p className="text-xs text-purple-300">bharath.s@thescalers.com</p>
                  </div>
                  <ChevronDown className="h-4 w-4 text-purple-300" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64 bg-slate-800 border-purple-500/20 text-white">
                <DropdownMenuLabel className="text-purple-200">
                  <div className="flex items-center space-x-2">
                    <Crown className="h-4 w-4 text-yellow-400" />
                    <span>Master Account</span>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-purple-500/20" />
                <DropdownMenuItem className="hover:bg-purple-500/20 focus:bg-purple-500/20">
                  <User className="mr-2 h-4 w-4" />
                  Profile Settings
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-purple-500/20 focus:bg-purple-500/20">
                  <Settings className="mr-2 h-4 w-4" />
                  System Configuration
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-purple-500/20 focus:bg-purple-500/20">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Analytics Dashboard
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-purple-500/20" />
                <DropdownMenuItem 
                  onClick={handleLogout} 
                  className="text-red-400 hover:text-red-300 hover:bg-red-500/20 focus:bg-red-500/20"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Bottom gradient line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500"></div>
    </header>
    </>
  )
}
