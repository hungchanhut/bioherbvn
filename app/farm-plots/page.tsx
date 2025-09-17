"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { MapPin, Droplets, Activity, Plus, Edit, Trash2, UploadCloud, FileText, Dna } from "lucide-react"
import dynamic from "next/dynamic"

// Dynamic import to ensure Leaflet only loads on client
const InteractiveMap = dynamic(() => import("@/components/map/interactive-map"), { ssr: false })

// Mock data for farm plots
const farmPlots = [
  { id: 1, name: "Plot A", herb: "Basil", area: "2.5 acres", soilType: "Loamy", plantDate: "2024-01-15" },
  { id: 2, name: "Plot B", herb: "Rosemary", area: "1.8 acres", soilType: "Sandy", plantDate: "2024-02-01" },
  { id: 3, name: "Plot C", herb: "Thyme", area: "3.2 acres", soilType: "Clay", plantDate: "2024-01-20" },
  { id: 4, name: "Plot D", herb: "Oregano", area: "2.1 acres", soilType: "Loamy", plantDate: "2024-02-10" },
  { id: 5, name: "Plot E", herb: "Mint", area: "1.5 acres", soilType: "Sandy", plantDate: "2024-01-25" },
]

// Mock sensor data
const sensorData = [
  { id: "T-01", type: "Temperature", location: "North Section", status: "Normal", lastReading: "24.5°C" },
  { id: "M-01", type: "Soil Moisture", location: "Center", status: "Normal", lastReading: "65%" },
  { id: "pH-01", type: "pH Sensor", location: "South Section", status: "Alert", lastReading: "6.8" },
  { id: "T-02", type: "Temperature", location: "East Section", status: "Normal", lastReading: "23.8°C" },
]

// Mock activity history
const activityHistory = [
  { timestamp: "2024-01-15 09:30", activityType: "Watering", user: "John Doe", status: "Completed" },
  { timestamp: "2024-01-14 14:15", activityType: "Fertilizing", user: "Jane Smith", status: "Completed" },
  { timestamp: "2024-01-13 11:45", activityType: "Pest Control", user: "Mike Johnson", status: "In Progress" },
  { timestamp: "2024-01-12 16:20", activityType: "Harvesting", user: "Sarah Wilson", status: "Failed" },
]

// Mock certifications for selected plot
const certifications = [
  { name: "GACP", status: "Active", expiry: "2026-03-12" },
  { name: "OCOP", status: "Active", expiry: "2025-12-01" },
  { name: "Organic", status: "Expired", expiry: "2024-08-20" },
]

// Mock health alerts for this plot
const healthAlerts = [
  { id: 1, name: "Pest Infestation", severity: "High" },
  { id: 2, name: "Leaf Blight", severity: "Medium" },
]

// Mock 5-year land history
const landHistory = [
  { year: 2025, crop: "Húng quế (Basil)", fertilizers: "Phân hữu cơ, NPK nhẹ" },
  { year: 2024, crop: "Hương thảo (Rosemary)", fertilizers: "Phân chuồng ủ, Kali" },
  { year: 2023, crop: "Húng tây (Thyme)", fertilizers: "Phân xanh, Lân" },
  { year: 2022, crop: "Kinh giới (Oregano)", fertilizers: "Phân hữu cơ, Vôi" },
  { year: 2021, crop: "Bạc hà (Mint)", fertilizers: "Hữu cơ vi sinh" },
]

// Mock ownership
const ownership = {
  ownerName: "Nguyễn Văn A",
  leasePeriod: "2023-01-01 đến 2028-12-31",
}

export default function FarmPlotsPage() {
  const [selectedPlot, setSelectedPlot] = useState(farmPlots[0])

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto">
        <div className="mb-6">
          <h1 className="text-4xl font-bold gradient-text mb-2">Quản lý vườn trồng</h1>
          <p className="text-muted-foreground">Quản lý và giám sát các thửa trồng rau thơm của bạn</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-200px)]">
          {/* Left Column - Plot List */}
          <div className="lg:col-span-1">
            <Card className="glass-card h-full flex flex-col">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Danh sách vườn</CardTitle>
                  <Button size="sm" className="gradient-primary text-white hover:glow-primary">
                    <Plus className="w-4 h-4 mr-2" />
                    Tạo vườn mới
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="flex-1 overflow-y-auto">
                <div className="space-y-3">
                  {farmPlots.map((plot) => (
                    <div
                      key={plot.id}
                      onClick={() => setSelectedPlot(plot)}
                      className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 hover:bg-white/5 ${
                        selectedPlot.id === plot.id
                          ? "border-l-4 border-l-primary bg-white/10 glow-primary"
                          : "border-white/10 hover:border-white/20"
                      }`}
                    >
                      <h3 className="font-semibold text-white">{plot.name}</h3>
                      <p className="text-sm text-muted-foreground">{plot.herb}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Plot Details */}
          <div className="lg:col-span-3">
            <Card className="glass-card h-full">
              <CardHeader>
                <CardTitle className="text-2xl gradient-text">
                  {selectedPlot.name} - {selectedPlot.herb}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1">
                <Tabs defaultValue="overview" className="h-full">
                  <TabsList className="grid w-full grid-cols-5 mb-6">
                    <TabsTrigger value="overview">Tổng quan</TabsTrigger>
                    <TabsTrigger value="sensors">Cảm biến</TabsTrigger>
                    <TabsTrigger value="activity">Lịch sử hoạt động</TabsTrigger>
                    <TabsTrigger value="certs">Chứng nhận</TabsTrigger>
                    <TabsTrigger value="dna-land">DNA & Đất</TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="space-y-6">
                    {/* Interactive Map */}
                    <div className="glass-card p-6 rounded-lg border border-white/10">
                      <div className="mb-3 flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-primary" />
                        <h3 className="font-semibold">Bản đồ thửa (thử nghiệm)</h3>
                      </div>
                      <InteractiveMap height="16rem" />
                      <p className="mt-2 text-xs text-muted-foreground">Khu vực mô phỏng miền Bắc Việt Nam - dữ liệu minh họa.</p>
                    </div>

                    {/* Plot Information */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="glass-card p-4 rounded-lg border border-white/10">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 rounded-lg bg-primary/20">
                            <MapPin className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Diện tích</p>
                            <p className="font-semibold text-white">{selectedPlot.area}</p>
                          </div>
                        </div>
                      </div>

                      <div className="glass-card p-4 rounded-lg border border-white/10">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 rounded-lg bg-accent/20">
                            <Droplets className="w-5 h-5 text-accent" />
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Loại đất</p>
                            <p className="font-semibold text-white">{selectedPlot.soilType}</p>
                          </div>
                        </div>
                      </div>

                      <div className="glass-card p-4 rounded-lg border border-white/10">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 rounded-lg bg-green-500/20">
                            <Activity className="w-5 h-5 text-green-400" />
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Ngày trồng</p>
                            <p className="font-semibold text-white">{selectedPlot.plantDate}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="sensors">
                    <div className="glass-card rounded-lg border border-white/10">
                      <Table>
                        <TableHeader>
                          <TableRow className="border-white/10">
                            <TableHead className="text-white">ID cảm biến</TableHead>
                            <TableHead className="text-white">Loại</TableHead>
                            <TableHead className="text-white">Vị trí</TableHead>
                            <TableHead className="text-white">Trạng thái</TableHead>
                            <TableHead className="text-white">Đọc gần nhất</TableHead>
                            <TableHead className="text-white">Hành động</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {sensorData.map((sensor) => (
                            <TableRow key={sensor.id} className="border-white/10 hover:bg-white/5">
                              <TableCell className="font-medium text-white">{sensor.id}</TableCell>
                              <TableCell className="text-muted-foreground">{sensor.type}</TableCell>
                              <TableCell className="text-muted-foreground">{sensor.location}</TableCell>
                              <TableCell>
                                <Badge
                                  className={
                                    sensor.status === "Normal"
                                      ? "bg-[#bbf7d0] text-[#0f1e1a] border-[#86efac]/50"
                                      : "bg-red-600/80 text-white border-red-500/50"
                                  }
                                >
                                  {sensor.status}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-muted-foreground">{sensor.lastReading}</TableCell>
                              <TableCell>
                                <div className="flex space-x-2">
                                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0 hover:bg-white/10">
                                    <Edit className="w-4 h-4" />
                                  </Button>
                                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0 hover:bg-white/10">
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </TabsContent>

                  <TabsContent value="activity">
                    <div className="glass-card rounded-lg border border-white/10">
                      <Table>
                        <TableHeader>
                          <TableRow className="border-white/10">
                            <TableHead className="text-white">Thời gian</TableHead>
                            <TableHead className="text-white">Loại hoạt động</TableHead>
                            <TableHead className="text-white">Người thực hiện</TableHead>
                            <TableHead className="text-white">Trạng thái</TableHead>
                            <TableHead className="text-white">Hành động</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {activityHistory.map((activity, index) => (
                            <TableRow key={index} className="border-white/10 hover:bg-white/5">
                              <TableCell className="font-medium text-white">{activity.timestamp}</TableCell>
                              <TableCell className="text-muted-foreground">{activity.activityType}</TableCell>
                              <TableCell className="text-muted-foreground">{activity.user}</TableCell>
                              <TableCell>
                                <Badge
                                  className={
                                    activity.status === "Completed"
                                      ? "bg-[#bbf7d0] text-[#0f1e1a] border-[#86efac]/50"
                                      : activity.status === "In Progress"
                                        ? "bg-yellow-600/80 text-white border-yellow-500/50"
                                        : "bg-red-600/80 text-white border-red-500/50"
                                  }
                                >
                                  {activity.status}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <div className="flex space-x-2">
                                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0 hover:bg-white/10">
                                    <Edit className="w-4 h-4" />
                                  </Button>
                                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0 hover:bg-white/10">
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </TabsContent>

                  {/* Certifications Tab */}
                  <TabsContent value="certs" className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <FileText className="w-4 h-4" />
                        <span>Danh sách chứng nhận hiện có</span>
                      </div>
                      <Button size="sm" className="gradient-primary text-white">
                        <UploadCloud className="w-4 h-4 mr-2" />
                        Tải lên chứng nhận mới
                      </Button>
                    </div>
                    <div className="glass-card rounded-lg border border-white/10">
                      <Table>
                        <TableHeader>
                          <TableRow className="border-white/10">
                            <TableHead className="text-white">Tên chứng nhận</TableHead>
                            <TableHead className="text-white">Trạng thái</TableHead>
                            <TableHead className="text-white">Ngày hết hạn</TableHead>
                            <TableHead className="text-white text-right">Hành động</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {certifications.map((c) => (
                            <TableRow key={c.name} className="border-white/10 hover:bg-white/5">
                              <TableCell className="text-foreground">{c.name}</TableCell>
                              <TableCell>
                                {c.status === "Active" ? (
                                  <Badge className="bg-[#bbf7d0] text-[#0f1e1a] border-[#86efac]/50">Hoạt động</Badge>
                                ) : (
                                  <Badge variant="destructive">Hết hạn</Badge>
                                )}
                              </TableCell>
                              <TableCell className="text-muted-foreground">{c.expiry}</TableCell>
                              <TableCell className="text-right">
                                <Button size="sm" variant="outline">
                                  <FileText className="w-4 h-4 mr-2" /> Xem PDF
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </TabsContent>

                  {/* DNA & Land Tab */}
                  <TabsContent value="dna-land" className="space-y-6">
                    {/* DNA Traceability */}
                    <div className="glass-card p-6 rounded-lg border border-white/10">
                      <div className="mb-4 flex items-center gap-2">
                        <Dna className="w-5 h-5 text-accent" />
                        <h3 className="font-semibold">Theo dõi dấu vết DNA</h3>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Left: DNA Profile */}
                        <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                          <h4 className="font-medium mb-3">Hồ sơ DNA</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center justify-between">
                              <span className="text-muted-foreground">Mã mẫu</span>
                              <span className="text-foreground font-medium">DNA-PL-{selectedPlot.id.toString().padStart(3, "0")}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-muted-foreground">Ngày thu thập</span>
                              <span className="text-foreground font-medium">2025-09-10</span>
                            </div>
                          </div>
                        </div>
                        {/* Right: Gene Bank Comparison */}
                        <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                          <h4 className="font-medium mb-3">So sánh Ngân hàng Gen</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center justify-between">
                              <span className="text-muted-foreground">Độ tin cậy khớp (%)</span>
                              <span className="text-foreground font-medium">97.4%</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-muted-foreground">Trạng thái</span>
                              <Badge className="bg-[#bbf7d0] text-[#0f1e1a] border-[#86efac]/50">Đã xác minh</Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Health Alerts */}
                    <div className="glass-card p-6 rounded-lg border border-white/10">
                      <h3 className="font-semibold mb-3">Cảnh báo sức khỏe cây trồng</h3>
                      <div className="space-y-2">
                        {healthAlerts.map((a) => (
                          <div key={a.id} className="flex items-center justify-between rounded-md border border-white/10 bg-white/5 p-3">
                            <span className="text-sm text-foreground">{a.name}</span>
                            {a.severity === "High" ? (
                              <Badge variant="destructive">Cao</Badge>
                            ) : a.severity === "Medium" ? (
                              <Badge className="bg-yellow-400 text-black border-transparent">Trung bình</Badge>
                            ) : (
                              <Badge className="bg-[#bbf7d0] text-[#0f1e1a] border-[#86efac]/50">Thấp</Badge>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 5-Year Land History */}
                    <div className="glass-card p-6 rounded-lg border border-white/10">
                      <h3 className="font-semibold mb-3">Lịch sử đất 5 năm</h3>
                      <div className="rounded-lg border border-white/10">
                        <Table>
                          <TableHeader>
                            <TableRow className="border-white/10">
                              <TableHead className="text-white">Năm</TableHead>
                              <TableHead className="text-white">Cây trồng</TableHead>
                              <TableHead className="text-white">Phân bón chính</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {landHistory.map((r) => (
                              <TableRow key={r.year} className="border-white/10 hover:bg-white/5">
                                <TableCell className="text-foreground">{r.year}</TableCell>
                                <TableCell className="text-muted-foreground">{r.crop}</TableCell>
                                <TableCell className="text-muted-foreground">{r.fertilizers}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </div>

                    {/* Ownership */}
                    <div className="glass-card p-6 rounded-lg border border-white/10">
                      <h3 className="font-semibold mb-3">Quyền sở hữu</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div className="rounded-md border border-white/10 bg-white/5 p-4">
                          <span className="text-muted-foreground">Chủ sở hữu</span>
                          <p className="text-foreground font-medium">{ownership.ownerName}</p>
                        </div>
                        <div className="rounded-md border border-white/10 bg-white/5 p-4">
                          <span className="text-muted-foreground">Thời hạn thuê</span>
                          <p className="text-foreground font-medium">{ownership.leasePeriod}</p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
