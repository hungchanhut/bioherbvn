"use client"

import { useMemo, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, ResponsiveContainer } from "recharts"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

// Mock sensor data
const sensors = [
  {
    id: "T-01",
    name: "Temperature Sensor T-01",
    location: "Plot A",
    manufacturer: "AgriTech",
    type: "Temperature",
    currentReading: "28.5°C",
    status: "normal",
    data: [
      { time: "00:00", value: 22 },
      { time: "04:00", value: 20 },
      { time: "08:00", value: 25 },
      { time: "12:00", value: 28.5 },
      { time: "16:00", value: 30 },
      { time: "20:00", value: 26 },
      { time: "24:00", value: 24 },
    ],
  },
  {
    id: "H-01",
    name: "Humidity Sensor H-01",
    location: "Plot A",
    manufacturer: "BioSense",
    type: "Humidity",
    currentReading: "65%",
    status: "normal",
    data: [
      { time: "00:00", value: 70 },
      { time: "04:00", value: 75 },
      { time: "08:00", value: 68 },
      { time: "12:00", value: 65 },
      { time: "16:00", value: 60 },
      { time: "20:00", value: 72 },
      { time: "24:00", value: 68 },
    ],
  },
  {
    id: "S-01",
    name: "Soil Moisture S-01",
    location: "Plot B",
    manufacturer: "TerraLabs",
    type: "Soil Moisture",
    currentReading: "45%",
    status: "alert",
    data: [
      { time: "00:00", value: 55 },
      { time: "04:00", value: 52 },
      { time: "08:00", value: 48 },
      { time: "12:00", value: 45 },
      { time: "16:00", value: 42 },
      { time: "20:00", value: 44 },
      { time: "24:00", value: 45 },
    ],
  },
  {
    id: "T-02",
    name: "Temperature Sensor T-02",
    location: "Plot B",
    manufacturer: "AgriTech",
    type: "Temperature",
    currentReading: "26.8°C",
    status: "normal",
    data: [
      { time: "00:00", value: 21 },
      { time: "04:00", value: 19 },
      { time: "08:00", value: 24 },
      { time: "12:00", value: 26.8 },
      { time: "16:00", value: 29 },
      { time: "20:00", value: 25 },
      { time: "24:00", value: 23 },
    ],
  },
  {
    id: "pH-01",
    name: "pH Sensor pH-01",
    location: "Plot C",
    manufacturer: "BioSense",
    type: "pH Level",
    currentReading: "6.8",
    status: "normal",
    data: [
      { time: "00:00", value: 6.5 },
      { time: "04:00", value: 6.6 },
      { time: "08:00", value: 6.7 },
      { time: "12:00", value: 6.8 },
      { time: "16:00", value: 6.9 },
      { time: "20:00", value: 6.7 },
      { time: "24:00", value: 6.8 },
    ],
  },
  {
    id: "L-01",
    name: "Light Sensor L-01",
    location: "Plot C",
    manufacturer: "TerraLabs",
    type: "Light Intensity",
    currentReading: "850 lux",
    status: "alert",
    data: [
      { time: "00:00", value: 0 },
      { time: "04:00", value: 0 },
      { time: "08:00", value: 400 },
      { time: "12:00", value: 850 },
      { time: "16:00", value: 920 },
      { time: "20:00", value: 200 },
      { time: "24:00", value: 0 },
    ],
  },
]

export default function SensorMonitoringPage() {
  // Filters state
  const [plotFilter, setPlotFilter] = useState<string>("all")
  const [manufacturerFilter, setManufacturerFilter] = useState<string>("all")
  const [searchId, setSearchId] = useState<string>("")

  // Unique lists
  const plots = useMemo(
    () => Array.from(new Set(sensors.map((s) => s.location))).sort(),
    [],
  )
  const manufacturers = useMemo(
    () => Array.from(new Set(sensors.map((s) => s.manufacturer))).sort(),
    [],
  )

  // Derived filtered sensors
  const filteredSensors = useMemo(() => {
    return sensors.filter((s) => {
      const plotOk = plotFilter === "all" || s.location === plotFilter
      const manuOk = manufacturerFilter === "all" || s.manufacturer === manufacturerFilter
      const searchOk = searchId.trim() === "" || s.id.toLowerCase().includes(searchId.trim().toLowerCase())
      return plotOk && manuOk && searchOk
    })
  }, [plotFilter, manufacturerFilter, searchId])
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold gradient-text mb-2">Giám sát cảm biến</h1>
          <p className="text-muted-foreground">Giám sát thời gian thực các cảm biến trên các thửa vườn của bạn</p>
        </div>

        {/* Filter Bar */}
        <div className="glass-card glow-primary mb-6 rounded-lg border border-white/10 p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            {/* Plot Filter */}
            <div className="flex flex-col gap-2">
              <label className="text-xs text-muted-foreground">Lọc theo vườn</label>
              <Select value={plotFilter} onValueChange={setPlotFilter}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Chọn vườn" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả vườn</SelectItem>
                  {plots.map((p) => (
                    <SelectItem key={p} value={p}>
                      {p}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Manufacturer Filter */}
            <div className="flex flex-col gap-2">
              <label className="text-xs text-muted-foreground">Lọc theo nhà sản xuất</label>
              <Select value={manufacturerFilter} onValueChange={setManufacturerFilter}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Chọn nhà sản xuất" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả NSX</SelectItem>
                  {manufacturers.map((m) => (
                    <SelectItem key={m} value={m}>
                      {m}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Search by Sensor ID */}
            <div className="flex flex-col gap-2">
              <label className="text-xs text-muted-foreground">Tìm theo mã cảm biến</label>
              <div className="relative">
                <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Nhập mã (ví dụ: T-01)"
                  value={searchId}
                  onChange={(e) => setSearchId(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSensors.map((sensor) => (
            <Card
              key={sensor.id}
              className={`glass-card transition-all duration-300 hover:scale-105 ${
                sensor.status === "normal"
                  ? "hover:shadow-cyan-500/20 hover:shadow-2xl border-cyan-500/20"
                  : "hover:shadow-magenta-500/20 hover:shadow-2xl border-magenta-500/20"
              }`}
            >
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {sensor.name} @ {sensor.location}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-4xl font-bold gradient-text mb-1">{sensor.currentReading}</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wide">{sensor.type}</div>
                </div>

                <div className="h-16 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={sensor.data}>
                      <defs>
                        <linearGradient id={`gradient-${sensor.id}`} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#bbf7d0" stopOpacity="1" />
                          <stop offset="100%" stopColor="#bbf7d0" stopOpacity="0.2" />
                        </linearGradient>
                      </defs>
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#bbf7d0"
                        strokeWidth={2}
                        dot={false}
                        activeDot={{ r: 3, fill: "#bbf7d0" }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                <div className="flex items-center justify-center">
                  <div
                    className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      sensor.status === "normal"
                        ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                        : "bg-magenta-500/20 text-magenta-400 border border-magenta-500/30"
                    }`}
                  >
                    <div
                      className={`w-2 h-2 rounded-full mr-2 ${
                        sensor.status === "normal" ? "bg-cyan-400" : "bg-magenta-400"
                      }`}
                    />
                    {sensor.status === "normal" ? "Bình thường" : "Cảnh báo"}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
