"use client"

import { useMemo, useState } from "react"
import type { DateRange } from "react-day-picker"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarIcon, Edit, Trash2, Plus, Download } from "lucide-react"

// Sample data for the activity logs
const activityLogs = [
  {
    id: 1,
    timestamp: "2025-01-15 14:30:25",
    plotId: "P-001",
    activityType: "Watering",
    user: "John Smith",
    status: "Completed",
  },
  {
    id: 2,
    timestamp: "2025-01-15 13:15:10",
    plotId: "P-003",
    activityType: "Fertilizing",
    user: "Sarah Johnson",
    status: "In Progress",
  },
  {
    id: 3,
    timestamp: "2025-01-15 11:45:33",
    plotId: "P-002",
    activityType: "Harvesting",
    user: "Mike Davis",
    status: "Failed",
  },
  {
    id: 4,
    timestamp: "2025-01-15 09:20:15",
    plotId: "P-004",
    activityType: "Soil Testing",
    user: "Emily Chen",
    status: "Completed",
  },
  {
    id: 5,
    timestamp: "2025-01-15 08:10:42",
    plotId: "P-001",
    activityType: "Pest Control",
    user: "David Wilson",
    status: "In Progress",
  },
]

export default function ActivityLogsPage() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined)
  const [plotFilter, setPlotFilter] = useState<string>("all")
  const [typeFilter, setTypeFilter] = useState<string>("all")

  const plots = useMemo(
    () => Array.from(new Set(activityLogs.map((l) => l.plotId))).sort(),
    [],
  )
  const activityTypes = useMemo(
    () => Array.from(new Set(activityLogs.map((l) => l.activityType))).sort(),
    [],
  )
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Completed":
        return <Badge className="bg-[#bbf7d0] text-[#0f1e1a] border-[#86efac]/50">Hoàn thành</Badge>
      case "In Progress":
        return <Badge className="bg-yellow-600/80 text-white border-yellow-500/50">Đang tiến hành</Badge>
      case "Failed":
        return <Badge className="bg-red-600/80 text-white border-red-500/50">Thất bại</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 gap-3">
          <h1 className="text-4xl font-bold gradient-text">Nhật ký hoạt động</h1>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="border-white/20">
              <Download className="h-4 w-4 mr-2" />
              Xuất báo cáo
            </Button>
            <Button className="gradient-primary glow-primary hover:glow-accent transition-all duration-300">
              <Plus className="h-4 w-4 mr-2" />
              Thêm nhật ký
            </Button>
          </div>
        </div>

        {/* Filter Section */}
        <div className="glass-card p-6 mb-8 glow-primary">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Date Range Picker */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Khoảng thời gian</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal bg-black/20 border-white/10">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateRange?.from && dateRange?.to ? (
                      <span>
                        {dateRange.from.toLocaleDateString()} - {dateRange.to.toLocaleDateString()}
                      </span>
                    ) : (
                      <span>Chọn khoảng ngày</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="p-2" align="start">
                  <Calendar
                    mode="range"
                    selected={dateRange}
                    onSelect={(range) => setDateRange(range)}
                    numberOfMonths={2}
                    buttonVariant="outline"
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Plot Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Thửa</label>
              <Select value={plotFilter} onValueChange={setPlotFilter}>
                <SelectTrigger className="bg-black/20 border-white/10 focus:border-accent">
                  <SelectValue placeholder="Chọn thửa" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả thửa</SelectItem>
                  {plots.map((p) => (
                    <SelectItem key={p} value={p}>
                      {p}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Activity Type Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Loại hoạt động</label>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="bg-black/20 border-white/10 focus:border-accent">
                  <SelectValue placeholder="Chọn loại" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả</SelectItem>
                  {activityTypes.map((t) => (
                    <SelectItem key={t} value={t}>
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Search */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Tìm kiếm</label>
              <Input
                placeholder="Tìm kiếm nhật ký hoạt động..."
                className="bg-black/20 border-white/10 focus:border-accent"
              />
            </div>
          </div>
        </div>

        {/* Activity Logs Table */}
        <div className="glass-card glow-primary">
          <Table>
            <TableHeader>
                <TableRow className="border-white/10">
                <TableHead className="text-foreground font-semibold">Thời gian</TableHead>
                <TableHead className="text-foreground font-semibold">Thửa</TableHead>
                <TableHead className="text-foreground font-semibold">Loại hoạt động</TableHead>
                <TableHead className="text-foreground font-semibold">Người</TableHead>
                <TableHead className="text-foreground font-semibold">Trạng thái</TableHead>
                <TableHead className="text-foreground font-semibold">Hành động</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {activityLogs.map((log) => (
                <TableRow key={log.id} className="border-white/10 hover:bg-white/5">
                  <TableCell className="text-muted-foreground">{log.timestamp}</TableCell>
                  <TableCell className="text-foreground font-medium">{log.plotId}</TableCell>
                  <TableCell className="text-foreground">{log.activityType}</TableCell>
                  <TableCell className="text-foreground">{log.user}</TableCell>
                  <TableCell>{getStatusBadge(log.status)}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-white/10 hover:text-accent">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-red-500/20 hover:text-red-400">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}
