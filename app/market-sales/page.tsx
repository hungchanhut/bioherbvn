"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Landmark, FileText } from "lucide-react"

export default function MarketSalesPage() {
  const [contracts, setContracts] = useState<File[]>([])
  const [invoices, setInvoices] = useState<File[]>([])
  const [channel, setChannel] = useState<string | undefined>()

  return (
    <div className="p-6">
      <div className="container mx-auto space-y-6">
        <div>
          <h1 className="text-4xl font-bold gradient-text mb-2 flex items-center gap-2">
            <Landmark className="h-7 w-7 text-accent" /> Thị trường & bán hàng
          </h1>
          <p className="text-muted-foreground">Quản lý hợp đồng bán hàng, hóa đơn và kênh phân phối.</p>
        </div>

        {/* Distribution Channel */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Kênh phân phối</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="max-w-sm space-y-2">
              <Label>Phân loại kênh phân phối</Label>
              <Select value={channel} onValueChange={setChannel}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Chọn kênh" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="supermarket">Siêu thị</SelectItem>
                  <SelectItem value="local-store">Cửa hàng địa phương</SelectItem>
                  <SelectItem value="online">Online</SelectItem>
                  <SelectItem value="export">Xuất khẩu</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Sales Contracts */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Hợp đồng bán hàng (PDF)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Input
                type="file"
                accept=".pdf"
                multiple
                onChange={(e) => setContracts([...(e.target.files ? Array.from(e.target.files) : [])])}
              />
              <div className="rounded-lg border border-white/10">
                <Table>
                  <TableHeader>
                    <TableRow className="border-white/10">
                      <TableHead className="text-white">Tên tệp</TableHead>
                      <TableHead className="text-white">Kích thước</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {contracts.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={2} className="text-muted-foreground">Chưa có tệp nào.</TableCell>
                      </TableRow>
                    ) : (
                      contracts.map((f, idx) => (
                        <TableRow key={`${f.name}-${idx}`} className="border-white/10 hover:bg-white/5">
                          <TableCell className="text-foreground">{f.name}</TableCell>
                          <TableCell className="text-muted-foreground">{Math.round(f.size / 1024)} KB</TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sales Invoices */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Hóa đơn bán hàng</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Input
                type="file"
                accept=".pdf,.jpg,.png"
                multiple
                onChange={(e) => setInvoices([...(e.target.files ? Array.from(e.target.files) : [])])}
              />
              <div className="rounded-lg border border-white/10">
                <Table>
                  <TableHeader>
                    <TableRow className="border-white/10">
                      <TableHead className="text-white">Tên tệp</TableHead>
                      <TableHead className="text-white">Kích thước</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {invoices.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={2} className="text-muted-foreground">Chưa có tệp nào.</TableCell>
                      </TableRow>
                    ) : (
                      invoices.map((f, idx) => (
                        <TableRow key={`${f.name}-${idx}`} className="border-white/10 hover:bg-white/5">
                          <TableCell className="text-foreground">{f.name}</TableCell>
                          <TableCell className="text-muted-foreground">{Math.round(f.size / 1024)} KB</TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
