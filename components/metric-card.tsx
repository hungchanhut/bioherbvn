"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface MetricCardProps {
  title: string
  value: string
  change: string
  changeType: "positive" | "negative" | "neutral"
  icon: LucideIcon
  className?: string
}

export function MetricCard({ title, value, change, changeType, icon: Icon, className }: MetricCardProps) {
  return (
    <Card className={cn("glass-card glow-primary hover:glow-accent transition-all duration-300", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <Icon className="h-4 w-4 text-accent" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground">{value}</div>
        <p
          className={cn(
            "text-xs",
            changeType === "positive" && "text-green-400",
            changeType === "negative" && "text-red-400",
            changeType === "neutral" && "text-muted-foreground",
          )}
        >
          {change}
        </p>
      </CardContent>
    </Card>
  )
}
