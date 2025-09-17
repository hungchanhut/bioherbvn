"use client"

export const runtime = 'edge'

import Image from "next/image"
import { notFound } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Mock data lookup by ID
const lots = [
  {
    id: "LOT-2025-001",
    harvestDate: "2025-08-18",
    personInCharge: "Nguyễn Văn A",
    yieldKgPerHa: 1450,
    yieldPerPlotKg: {
      "Plot A": 500,
      "Plot B": 450,
      "Plot C": 500,
    },
    quality: {
      moisture: 12.5,
      activeIngredient: 2.4,
    },
    storage: {
      location: "Kho lạnh A",
      temperature: "4°C",
      humidity: "60%",
    },
    gallery: [
      { src: "/placeholder.jpg", alt: "Thu hoạch lô 001" },
      { src: "/placeholder.jpg", alt: "Sơ chế lô 001" },
      { src: "/placeholder.jpg", alt: "Đóng gói lô 001" },
    ],
    qualityStatus: "Passed",
  },
]

export default function HarvestLotDetailPage({ params }: { params: { id: string } }) {
  const lot = lots.find((l) => l.id === params.id)
  if (!lot) return notFound()

  const statusBadge = (status: string) => {
    if (status === "Passed") {
      return <Badge className="bg-[#bbf7d0] text-[#0f1e1a] border-[#86efac]/50">Đạt</Badge>
    }
    return <Badge variant="destructive">Cần khắc phục</Badge>
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto max-w-6xl space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold gradient-text">Chi tiết lô: {lot.id}</h1>
          {statusBadge(lot.qualityStatus)}
        </div>

        {/* Key Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Thông tin chính</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Ngày thu hoạch</span>
                <span className="text-foreground font-medium">{lot.harvestDate}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Người phụ trách</span>
                <span className="text-foreground font-medium">{lot.personInCharge}</span>
              </div>
            </CardContent>
          </Card>

          {/* Storage Records */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Ghi nhận lưu trữ</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Vị trí lưu trữ</span>
                <span className="text-foreground font-medium">{lot.storage.location}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Nhiệt độ</span>
                <span className="text-foreground font-medium">{lot.storage.temperature}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Độ ẩm</span>
                <span className="text-foreground font-medium">{lot.storage.humidity}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Yield Data */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Năng suất</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <div className="text-xs text-muted-foreground">Yield (kg/ha)</div>
                <div className="text-2xl font-semibold">{lot.yieldKgPerHa}</div>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4 md:col-span-2">
                <div className="text-xs text-muted-foreground mb-2">Yield per Plot (kg)</div>
                <Table>
                  <TableHeader>
                    <TableRow className="border-white/10">
                      <TableHead className="text-foreground">Plot</TableHead>
                      <TableHead className="text-foreground">Yield (kg)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {Object.entries(lot.yieldPerPlotKg).map(([plot, val]) => (
                      <TableRow key={plot} className="border-white/10">
                        <TableCell className="text-muted-foreground">{plot}</TableCell>
                        <TableCell className="text-foreground">{val}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quality Metrics */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Chỉ số chất lượng (Lab)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <div className="text-xs text-muted-foreground">Moisture (%)</div>
                <div className="text-2xl font-semibold">{lot.quality.moisture}%</div>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <div className="text-xs text-muted-foreground">Active Ingredient Content (%)</div>
                <div className="text-2xl font-semibold">{lot.quality.activeIngredient}%</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Gallery */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Thư viện ảnh</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {lot.gallery.map((img, idx) => (
                <div key={idx} className="relative aspect-video overflow-hidden rounded-lg border border-white/10">
                  <Image src={img.src} alt={img.alt} fill className="object-cover" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
