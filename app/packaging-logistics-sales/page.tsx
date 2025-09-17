"use client"

import Image from "next/image"
import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { QrCode, Printer, Download } from "lucide-react"

// Mock data
const packagingEvents = [
  { lotId: "LOT-2025-001", type: "Hút chân không", date: "2025-09-01", person: "Trần B" },
  { lotId: "LOT-2025-002", type: "Túi giấy", date: "2025-09-03", person: "Phạm C" },
]

const shipments = [
  { id: "SHIP-1001", partner: "VN Post Logistics", departure: "2025-09-05", vehicle: "Xe tải 29A-123.45" },
  { id: "SHIP-1002", partner: "DHL", departure: "2025-09-07", vehicle: "Xe van 30B-678.90" },
]

const sales = [
  { orderId: "ORD-9001", market: "Nội địa", contract: "https://example.com/contracts/9001", invoice: "Đã thanh toán" },
  { orderId: "ORD-9002", market: "Xuất khẩu", contract: "https://example.com/contracts/9002", invoice: "Chờ thanh toán" },
]

export default function PackagingLogisticsSalesPage() {
  const [selectedLot, setSelectedLot] = useState<string>("LOT-2025-001")
  const [qrOpen, setQrOpen] = useState(false)

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print()
    }
  }

  const handleDownload = () => {
    // Download placeholder QR as SVG with lot-based filename
    const link = document.createElement("a")
    link.href = "/placeholder.svg"
    link.download = `QR-${selectedLot}.svg`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto max-w-7xl space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold gradient-text">Đóng gói, Giao vận & Bán hàng</h1>
        </div>

        {/* QR Code Generation Section */}
        <div className="glass-card rounded-lg border border-white/10 p-6 glow-primary">
          <div className="flex flex-col md:flex-row md:items-end gap-4 md:gap-6">
            <div className="flex-1">
              <label className="text-sm font-medium text-foreground">Lô sản phẩm</label>
              <Select value={selectedLot} onValueChange={setSelectedLot}>
                <SelectTrigger className="w-full mt-1">
                  <SelectValue placeholder="Chọn lô" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="LOT-2025-001">LOT-2025-001</SelectItem>
                  <SelectItem value="LOT-2025-002">LOT-2025-002</SelectItem>
                  <SelectItem value="LOT-2025-003">LOT-2025-003</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Dialog open={qrOpen} onOpenChange={setQrOpen}>
              <DialogTrigger asChild>
                <Button className="gradient-primary text-white">
                  <QrCode className="w-4 h-4 mr-2" /> Sinh mã QR
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Mã QR cho {selectedLot}</DialogTitle>
                </DialogHeader>
                <div className="w-full flex items-center justify-center py-4">
                  <div className="relative w-64 h-64 rounded-lg overflow-hidden border border-white/10 bg-white">
                    <Image src="/placeholder.svg" alt="QR Code" fill className="object-contain p-4" />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={handlePrint}>
                    <Printer className="w-4 h-4 mr-2" /> In
                  </Button>
                  <Button variant="outline" onClick={handleDownload}>
                    <Download className="w-4 h-4 mr-2" /> Tải xuống
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <Tabs defaultValue="packaging" className="h-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="packaging">Đóng gói</TabsTrigger>
            <TabsTrigger value="logistics">Giao vận</TabsTrigger>
            <TabsTrigger value="sales">Bán hàng</TabsTrigger>
          </TabsList>

          <TabsContent value="packaging">
            <div className="glass-card rounded-lg border border-white/10">
              <Table>
                <TableHeader>
                  <TableRow className="border-white/10">
                    <TableHead className="text-foreground font-semibold">Mã lô</TableHead>
                    <TableHead className="text-foreground font-semibold">Hình thức đóng gói</TableHead>
                    <TableHead className="text-foreground font-semibold">Ngày</TableHead>
                    <TableHead className="text-foreground font-semibold">Phụ trách</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {packagingEvents.map((e) => (
                    <TableRow key={`${e.lotId}-${e.date}`} className="border-white/10 hover:bg-white/5">
                      <TableCell className="text-foreground font-medium">{e.lotId}</TableCell>
                      <TableCell className="text-muted-foreground">{e.type}</TableCell>
                      <TableCell className="text-muted-foreground">{e.date}</TableCell>
                      <TableCell className="text-foreground">{e.person}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="logistics">
            <div className="glass-card rounded-lg border border-white/10">
              <Table>
                <TableHeader>
                  <TableRow className="border-white/10">
                    <TableHead className="text-foreground font-semibold">Mã chuyến</TableHead>
                    <TableHead className="text-foreground font-semibold">Đối tác logistics</TableHead>
                    <TableHead className="text-foreground font-semibold">Ngày khởi hành</TableHead>
                    <TableHead className="text-foreground font-semibold">Phương tiện</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {shipments.map((s) => (
                    <TableRow key={s.id} className="border-white/10 hover:bg-white/5">
                      <TableCell className="text-foreground font-medium">{s.id}</TableCell>
                      <TableCell className="text-muted-foreground">{s.partner}</TableCell>
                      <TableCell className="text-muted-foreground">{s.departure}</TableCell>
                      <TableCell className="text-foreground">{s.vehicle}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="sales">
            <div className="glass-card rounded-lg border border-white/10">
              <Table>
                <TableHeader>
                  <TableRow className="border-white/10">
                    <TableHead className="text-foreground font-semibold">Mã đơn hàng</TableHead>
                    <TableHead className="text-foreground font-semibold">Thị trường</TableHead>
                    <TableHead className="text-foreground font-semibold">Hợp đồng</TableHead>
                    <TableHead className="text-foreground font-semibold">Trạng thái hóa đơn</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sales.map((r) => (
                    <TableRow key={r.orderId} className="border-white/10 hover:bg-white/5">
                      <TableCell className="text-foreground font-medium">{r.orderId}</TableCell>
                      <TableCell className="text-muted-foreground">{r.market}</TableCell>
                      <TableCell className="text-foreground">
                        <a href={r.contract} target="_blank" rel="noreferrer" className="underline text-accent">
                          Xem hợp đồng
                        </a>
                      </TableCell>
                      <TableCell className="text-foreground">{r.invoice}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
