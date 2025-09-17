"use client"

import { Button } from "@/components/ui/button"
import { Bell, Search, User } from "lucide-react"

export function DashboardHeader() {
  return (
    <header className="glass-card border-b border-white/10 backdrop-blur-xl">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold gradient-text">Tổng quan trang trại</h1>
          <div className="text-sm text-muted-foreground">Cập nhật: {new Date().toLocaleTimeString()}</div>
        </div>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" className="glow-accent hover:glow-primary">
            <Search className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="glow-accent hover:glow-primary relative">
            <Bell className="h-4 w-4" />
            <span className="absolute -top-1 -right-1 h-3 w-3 bg-accent rounded-full animate-pulse"></span>
          </Button>
          <Button variant="ghost" size="sm" className="glow-accent hover:glow-primary">
            <User className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  )
}
