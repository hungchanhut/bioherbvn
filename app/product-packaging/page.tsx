"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { UploadCloud, Box } from "lucide-react"

export default function ProductPackagingPage() {
  const [packagingFiles, setPackagingFiles] = useState<File[]>([])
  const [stampFiles, setStampFiles] = useState<File[]>([])

  return (
    <div className="p-6">
      <div className="container mx-auto space-y-6">
        <div>
          <h1 className="text-4xl font-bold gradient-text mb-2 flex items-center gap-2">
            <Box className="h-7 w-7 text-accent" /> Sản phẩm & đóng gói
          </h1>
          <p className="text-muted-foreground">Quản lý thiết kế bao bì, ghi nhãn sản phẩm và truy xuất nguồn gốc.</p>
        </div>

        {/* Packaging Design */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Thiết kế bao bì</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label>Tệp thiết kế bao bì (ảnh)</Label>
              <Input
                type="file"
                accept=".png,.jpg,.jpeg,.webp,.svg"
                multiple
                onChange={(e) => setPackagingFiles([...(e.target.files ? Array.from(e.target.files) : [])])}
              />
              {packagingFiles.length > 0 && (
                <p className="text-xs text-muted-foreground">Đã chọn {packagingFiles.length} tệp.</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Product Labeling */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Ghi nhãn sản phẩm</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="prod-name">Tên sản phẩm</Label>
                <Input id="prod-name" placeholder="VD: Trà thảo mộc BioHerb" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="address">Địa chỉ</Label>
                <Input id="address" placeholder="Địa chỉ cơ sở sản xuất" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="prod-date">Ngày sản xuất</Label>
                <Input id="prod-date" type="date" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="exp-date">Hạn sử dụng</Label>
                <Input id="exp-date" type="date" />
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <Label htmlFor="published-standard">Tiêu chuẩn công bố</Label>
                <Input id="published-standard" placeholder="VD: TCCS 01:2025/BioHerb" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Traceability */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Truy xuất nguồn gốc</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Thiết kế tem chống giả (ảnh)</Label>
                <Input
                  type="file"
                  accept=".png,.jpg,.jpeg,.webp,.svg"
                  multiple
                  onChange={(e) => setStampFiles([...(e.target.files ? Array.from(e.target.files) : [])])}
                />
                {stampFiles.length > 0 && (
                  <p className="text-xs text-muted-foreground">Đã chọn {stampFiles.length} tệp.</p>
                )}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="qr-link">Liên kết truy xuất QR</Label>
                <Input id="qr-link" placeholder="https://..." />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
