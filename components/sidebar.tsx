"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Home, Leaf, Activity, Scissors as Sensors, Menu, X, Users, Box, Landmark, Clipboard, Plug, Wheat, Boxes, BadgeCheck, History } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"

const navigation = [
  { name: "Bảng điều khiển", href: "/dashboard", icon: Home },
  { name: "Vườn trồng", href: "/farm-plots", icon: Leaf },
  { name: "Thu hoạch & sau thu hoạch", href: "/harvest-post-harvest", icon: Wheat },
  { name: "Đóng gói, logistics & bán hàng", href: "/packaging-logistics-sales", icon: Boxes },
  { name: "Giám sát cảm biến", href: "/sensor-monitoring", icon: Sensors },
  { name: "Nhật ký hoạt động", href: "/activity-logs", icon: Activity },
  { name: "Thị trường & bán hàng", href: "/market-sales", icon: Landmark },
  { name: "Sản phẩm & đóng gói", href: "/product-packaging", icon: Box },
  { name: "Trung tâm chứng nhận", href: "/certifications-hub", icon: BadgeCheck },
  { name: "Lịch sử kiểm tra", href: "/inspection-history", icon: History },
  { name: "Quản lý nhân sự", href: "/personnel-management", icon: Users },
  { name: "Tích hợp", href: "/integrations", icon: Plug },
  { name: "Báo cáo & chứng nhận", href: "/reports-certifications", icon: Clipboard },
]

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()
  return (
    <div
      className={cn(
        "fixed left-0 top-0 z-40 h-screen transition-all duration-300 ease-in-out",
        collapsed ? "w-16" : "w-64",
      )}
    >
      <div className="glass-card h-full border-r border-white/10 backdrop-blur-xl">
        <div className="flex h-16 items-center justify-between px-4">
          {!collapsed && (
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg gradient-primary flex items-center justify-center">
                <Leaf className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text">BioHerb</span>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCollapsed(!collapsed)}
            className="glow-primary hover:glow-accent transition-all duration-300"
          >
            {collapsed ? <Menu className="h-4 w-4" /> : <X className="h-4 w-4" />}
          </Button>
        </div>

        <nav className="mt-8 px-3">
          <ul className="space-y-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={cn(
                      "group flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200",
                      isActive
                        ? "bg-primary/20 text-primary glow-primary"
                        : "text-muted-foreground hover:bg-white/5 hover:text-foreground hover:glow-accent",
                    )}
                  >
                    <item.icon className="h-5 w-5 shrink-0" />
                    {!collapsed && <span className="ml-3 truncate">{item.name}</span>}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>
    </div>
  )
}
