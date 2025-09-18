"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sprout, Wifi, Activity, AlertTriangle, MapPin, Droplet, Leaf, Shovel, Bug } from "lucide-react"
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import type { FarmProfile } from "@/lib/farm-profile"

// Sample data for charts
const temperatureData = [
  { time: "00:00", temperature: 18.5 },
  { time: "04:00", temperature: 16.2 },
  { time: "08:00", temperature: 22.1 },
  { time: "12:00", temperature: 28.4 },
  { time: "16:00", temperature: 31.2 },
  { time: "20:00", temperature: 25.8 },
  { time: "24:00", temperature: 20.3 },
]

const soilMoistureData = [
  { plot: "Plot A", moisture: 78 },
  { plot: "Plot B", moisture: 65 },
  { plot: "Plot C", moisture: 82 },
  { plot: "Plot D", moisture: 45 },
  { plot: "Plot E", moisture: 71 },
  { plot: "Plot F", moisture: 88 },
]

// Dữ liệu cho hoạt động gần đây
const recentActivities = [
  {
    id: 1,
    icon: Droplet,
    description: "Tưới nước hoàn thành",
    plot: "Lô A3",
    timeAgo: "3 giờ trước",
  },
  {
    id: 2,
    icon: Leaf,
    description: "Bón phân hữu cơ",
    plot: "Lô C1",
    timeAgo: "5 giờ trước",
  },
  {
    id: 3,
    icon: Wifi,
    description: "Hiệu chuẩn cảm biến độ ẩm",
    plot: "Lô B2",
    timeAgo: "1 giờ trước",
  },
  {
    id: 4,
    icon: Shovel,
    description: "Cấy trồng bổ sung",
    plot: "Lô D4",
    timeAgo: "1 ngày trước",
  },
]

// Dữ liệu cho sự cố đang hoạt động
const activeIssues = [
  {
    id: "A3",
    type: "Nhiễm sâu bệnh",
    severity: "Cao",
    reportedOn: "2025-09-16",
  },
  {
    id: "B2",
    type: "Sự cố tưới",
    severity: "Trung bình",
    reportedOn: "2025-09-17",
  },
  {
    id: "D4",
    type: "Thiếu dinh dưỡng",
    severity: "Trung bình",
    reportedOn: "2025-09-15",
  },
]

export default function DashboardPage() {
  const [profile, setProfile] = useState<FarmProfile | null>(null)

  useEffect(() => {
    let ignore = false
    const load = async () => {
      try {
        const res = await fetch("/api/farm-profile", { cache: "no-store" })
        if (!res.ok) return
        const data = (await res.json()) as FarmProfile
        if (!ignore) setProfile(data)
      } catch (e) {
        // ignore fetch errors for now
      }
    }
    load()
    return () => {
      ignore = true
    }
  }, [])

  return (
    <div className="p-6">
      <div className="container mx-auto">
  <h1 className="text-4xl font-bold gradient-text mb-8">Bảng điều khiển BioHerb</h1>

        {/* Farm Profile Summary */}
        <Card className="glass-card glow-primary mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Leaf className="h-5 w-5 text-accent" />
              Thông tin hồ sơ trang trại
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-muted-foreground">Tên HTX/Doanh nghiệp</label>
                <Input value={profile?.name ?? "—"} readOnly className="mt-1" />
              </div>
              <div>
                <label className="text-sm text-muted-foreground">Địa chỉ</label>
                <Input value={profile?.address ?? "—"} readOnly className="mt-1" />
              </div>
              <div>
                <label className="text-sm text-muted-foreground">Tổng diện tích (ha)</label>
                <Input value={profile ? String(profile.totalAreaHa) : "—"} readOnly className="mt-1" />
              </div>
              <div>
                <label className="text-sm text-muted-foreground">Tình trạng giấy phép kinh doanh</label>
                <div className="mt-1">
                  {profile?.businessLicenseStatus === "Verified" ? (
                    <Badge className="bg-emerald-500 text-emerald-950 border-transparent">Đã xác minh</Badge>
                  ) : profile?.businessLicenseStatus === "Pending" ? (
                    <Badge className="bg-yellow-400 text-black border-transparent">Đang chờ</Badge>
                  ) : profile?.businessLicenseStatus === "Expired" ? (
                    <Badge variant="destructive">Hết hạn</Badge>
                  ) : (
                    <Badge variant="outline">—</Badge>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 2x2 Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Row - 4 Metric Cards */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {/* Total Plots Card */}
              <Card className="glass-card glow-primary hover:glow-accent transition-all duration-300 group">
                <CardContent className="p-6 text-center">
                  <div className="mb-4 p-3 rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20 w-fit mx-auto group-hover:scale-110 transition-transform">
                    <Sprout className="h-8 w-8 text-accent" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Tổng số vườn</h3>
                  <p className="text-3xl font-bold text-foreground">24</p>
                </CardContent>
              </Card>

              {/* Active Sensors Card */}
              <Card className="glass-card glow-primary hover:glow-accent transition-all duration-300 group">
                <CardContent className="p-6 text-center">
                  <div className="mb-4 p-3 rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20 w-fit mx-auto group-hover:scale-110 transition-transform">
                    <Wifi className="h-8 w-8 text-accent" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Cảm biến hoạt động</h3>
                  <p className="text-3xl font-bold text-foreground">156</p>
                </CardContent>
              </Card>

              {/* System Health Card */}
              <Card className="glass-card glow-primary hover:glow-accent transition-all duration-300 group">
                <CardContent className="p-6 text-center">
                  <div className="mb-4 p-3 rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20 w-fit mx-auto group-hover:scale-110 transition-transform">
                    <Activity className="h-8 w-8 text-accent" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Tình trạng hệ thống</h3>
                  <p className="text-3xl font-bold text-green-400">98%</p>
                </CardContent>
              </Card>

              {/* Active Alerts Card */}
              <Card className="glass-card glow-primary hover:glow-accent transition-all duration-300 group">
                <CardContent className="p-6 text-center">
                  <div className="mb-4 p-3 rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20 w-fit mx-auto group-hover:scale-110 transition-transform">
                    <AlertTriangle className="h-8 w-8 text-accent" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Cảnh báo đang hoạt động</h3>
                  <p className="text-3xl font-bold text-yellow-400">3</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Full-width Activities & Issues Card */}
          <div className="lg:col-span-2">
            <Card className="glass-card glow-primary">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-accent" />
                  Hoạt động gần đây & Sự cố
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="activities" className="w-full">
                  <TabsList>
                    <TabsTrigger value="activities">Hoạt động gần đây</TabsTrigger>
                    <TabsTrigger value="issues">Sự cố đang hoạt động</TabsTrigger>
                  </TabsList>

                  {/* Tab: Hoạt động gần đây */}
                  <TabsContent value="activities" className="mt-4">
                    <div className="max-h-64 overflow-y-auto pr-2 space-y-3">
                      {recentActivities.map((item) => {
                        const Icon = item.icon
                        return (
                          <div
                            key={item.id}
                            className="flex items-start gap-3 rounded-lg border border-white/10 bg-white/5 dark:bg-black/20 p-3"
                          >
                            <div className="p-2 rounded-md bg-accent/20">
                              <Icon className="h-4 w-4 text-accent" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-foreground">
                                {item.description}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {item.plot} • {item.timeAgo}
                              </p>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </TabsContent>

                  {/* Tab: Sự cố đang hoạt động */}
                  <TabsContent value="issues" className="mt-4">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Mã lô</TableHead>
                          <TableHead>Loại sự cố</TableHead>
                          <TableHead>Mức độ</TableHead>
                          <TableHead>Ngày báo cáo</TableHead>
                          <TableHead className="text-right">Hành động</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {activeIssues.map((issue) => (
                          <TableRow key={issue.id}>
                            <TableCell>{issue.id}</TableCell>
                            <TableCell className="max-w-[16rem] truncate">
                              <div className="flex items-center gap-2 truncate">
                                <Bug className="h-4 w-4 text-destructive" />
                                <span className="truncate">{issue.type}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              {issue.severity === "Cao" ? (
                                <Badge variant="destructive">Cao</Badge>
                              ) : (
                                <Badge className="bg-yellow-400 text-black border-transparent">Trung bình</Badge>
                              )}
                            </TableCell>
                            <TableCell>{issue.reportedOn}</TableCell>
                            <TableCell className="text-right">
                              <Button variant="outline" size="sm">Xem chi tiết</Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Bottom-Left - Farm Overview */}
          <Card className="glass-card glow-primary">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-accent" />
                Tổng quan trang trại
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Map Placeholder */}
              <div className="aspect-video bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-lg border border-white/10 flex items-center justify-center mb-4">
                <div className="text-center text-muted-foreground">
                  <MapPin className="h-12 w-12 mx-auto mb-2 text-accent" />
                  <p className="text-lg font-medium">Bản đồ trang trại tương tác</p>
                  <p className="text-sm">Giám sát thửa đất theo thời gian thực</p>
                </div>
              </div>

              {/* Legend */}
              <div className="flex items-center justify-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-cyan-400"></div>
                  <span className="text-sm text-muted-foreground">Khỏe mạnh</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <span className="text-sm text-muted-foreground">Cảnh báo</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-pink-400"></div>
                  <span className="text-sm text-muted-foreground">Báo động</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Bottom-Right - Real-time Analytics */}
          <Card className="glass-card glow-primary">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-accent" />
                Phân tích thời gian thực
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Temperature Line Chart */}
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-3">Nhiệt độ (°C) theo thời gian</h4>
                <div className="h-32">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={temperatureData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                      <XAxis
                        dataKey="time"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: "rgba(255,255,255,0.6)", fontSize: 12 }}
                      />
                      <YAxis axisLine={false} tickLine={false} tick={{ fill: "rgba(255,255,255,0.6)", fontSize: 12 }} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "rgba(0,0,0,0.8)",
                          border: "1px solid rgba(255,255,255,0.1)",
                          borderRadius: "8px",
                        }}
                      />
                      <defs>
                        <linearGradient id="temperatureGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#bbf7d0" stopOpacity="1" />
                          <stop offset="100%" stopColor="#bbf7d0" stopOpacity="0.2" />
                        </linearGradient>
                      </defs>
                      <Line
                        type="monotone"
                        dataKey="temperature"
                        stroke="#bbf7d0"
                        strokeWidth={3}
                        dot={{ fill: "#bbf7d0", strokeWidth: 2, r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Soil Moisture Bar Chart */}
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-3">Độ ẩm đất (%)</h4>
                <div className="h-32">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={soilMoistureData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                      <XAxis
                        dataKey="plot"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: "rgba(255,255,255,0.6)", fontSize: 12 }}
                      />
                      <YAxis axisLine={false} tickLine={false} tick={{ fill: "rgba(255,255,255,0.6)", fontSize: 12 }} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "rgba(0,0,0,0.8)",
                          border: "1px solid rgba(255,255,255,0.1)",
                          borderRadius: "8px",
                        }}
                      />
                      <defs>
                        <linearGradient id="moistureGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#bbf7d0" stopOpacity="1" />
                          <stop offset="100%" stopColor="#bbf7d0" stopOpacity="0.15" />
                        </linearGradient>
                      </defs>
                      <Bar dataKey="moisture" fill="#bbf7d0" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
