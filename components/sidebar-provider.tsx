"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import { useIsMobile } from "@/hooks/use-mobile"

type SidebarContext = {
  open: boolean
  setOpen: (open: boolean) => void
  isMobile: boolean
}

const SidebarContext = React.createContext<SidebarContext | undefined>(undefined)

export function SidebarProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [open, setOpen] = React.useState(true)
  const isMobile = useIsMobile()
  const pathname = usePathname()

  // Close sidebar on mobile when navigating
  React.useEffect(() => {
    if (isMobile) {
      setOpen(false)
    } else {
      setOpen(true)
    }
  }, [pathname, isMobile])

  return <SidebarContext.Provider value={{ open, setOpen, isMobile }}>{children}</SidebarContext.Provider>
}

export function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider")
  }
  return context
}

