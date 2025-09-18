"use client"

import type React from "react"

import { usePathname } from "next/navigation"
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
} from "@/components/ui/sidebar"
import {
  Home,
  Leaf,
  Activity,
  Scissors as Sensors,
  Users,
  Box,
  Landmark,
  Clipboard,
  Plug,
  Wheat,
  Boxes,
  BadgeCheck,
  History,
} from "lucide-react"
import Link from "next/link"

const navigation = [
  { name: "Bảng điều khiển", href: "/dashboard", icon: Home },
  { name: "Vườn trồng", href: "/farm-plots", icon: Leaf },
  { name: "Giám sát cảm biến", href: "/sensor-monitoring", icon: Sensors },
  { name: "Nhật ký hoạt động", href: "/activity-logs", icon: Activity },
  { name: "Lịch sử kiểm tra", href: "/inspection-history", icon: History },
  { name: "Thu hoạch & sau thu hoạch", href: "/harvest-post-harvest", icon: Wheat },
  { name: "Trung tâm chứng nhận", href: "/certifications-hub", icon: BadgeCheck },
  { name: "Đóng gói, logistics & bán hàng", href: "/packaging-logistics-sales", icon: Boxes },
  { name: "Thị trường & bán hàng", href: "/market-sales", icon: Landmark },
  { name: "Sản phẩm & đóng gói", href: "/product-packaging", icon: Box },
  { name: "Quản lý nhân sự", href: "/personnel-management", icon: Users },
  { name: "Tích hợp", href: "/integrations", icon: Plug },
  { name: "Báo cáo & chứng nhận", href: "/reports-certifications", icon: Clipboard },
]

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  // Don't show sidebar on landing page
  const showSidebar = pathname !== "/"

  if (!showSidebar) {
    return <>{children}</>
  }

  return (
    <SidebarProvider>
      <Sidebar className="glass-card border-r border-white/10">
        <SidebarHeader className="p-4">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg gradient-primary flex items-center justify-center">
              <Leaf className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">BioHerb</span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive}
                    className="glow-primary hover:glow-accent transition-all duration-300"
                  >
                    <Link href={item.href}>
                      <item.icon className="h-5 w-5" />
                      <span>{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            })}
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  )
}
