"use client"

import React, { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { CalendarIcon, Upload } from "lucide-react"
import { cn } from "@/lib/utils"

type Certification = "GACP" | "Organic" | "OCOP"

type InputKind =
  | { type: "text"; placeholder?: string }
  | { type: "number"; min?: number; max?: number }
  | { type: "file"; accept?: string }
  | { type: "select"; options: string[] }
  | { type: "date" }
  | { type: "radio"; options: string[] }
  | { type: "textarea"; placeholder?: string; rows?: number }

interface ChecklistItemDef {
  id: string
  label: string
  certifications: Certification[]
  input: InputKind
}

interface SectionDef {
  id: string
  title: string
  items: ChecklistItemDef[]
}

const sections: SectionDef[] = [
  {
    id: "general",
    title: "1. Thông tin chung về trang trại",
    items: [
      { id: "coop-name", label: "Tên hợp tác xã / doanh nghiệp", certifications: ["GACP", "Organic", "OCOP"], input: { type: "text", placeholder: "Ví dụ: HTX Dược liệu Xanh" } },
      { id: "biz-license", label: "Giấy phép kinh doanh (PDF)", certifications: ["GACP", "OCOP"], input: { type: "file", accept: ".pdf" } },
      { id: "address-gps", label: "Địa chỉ + Tọa độ GPS", certifications: ["GACP", "Organic", "OCOP"], input: { type: "text", placeholder: "Nhập địa chỉ & GPS" } },
      { id: "total-area", label: "Tổng diện tích (ha)", certifications: ["GACP", "Organic"], input: { type: "number", min: 0 } },
    ],
  },
  {
    id: "land-env",
    title: "2. Hồ sơ đất & môi trường",
    items: [
      { id: "land-history", label: "Lịch sử sử dụng đất 5 năm", certifications: ["GACP", "Organic"], input: { type: "file", accept: ".pdf" } },
      { id: "soil-test", label: "Kết quả kiểm nghiệm đất", certifications: ["GACP", "Organic"], input: { type: "file", accept: ".pdf" } },
      { id: "water-source", label: "Nguồn nước tưới", certifications: ["GACP", "Organic"], input: { type: "select", options: ["Giếng khoan", "Suối", "Nước máy"] } },
      { id: "water-test", label: "Kết quả kiểm nghiệm nước", certifications: ["GACP", "Organic"], input: { type: "file", accept: ".pdf" } },
      { id: "buffer-zone", label: "Vùng đệm bảo vệ (Có/Không)", certifications: ["Organic"], input: { type: "radio", options: ["Có", "Không"] } },
    ],
  },
  {
    id: "seed-input",
    title: "3. Giống và vật tư đầu vào",
    items: [
      { id: "seed-used", label: "Giống sử dụng", certifications: ["GACP", "Organic"], input: { type: "text", placeholder: "Tên giống hoặc chọn" } },
      { id: "seed-profile", label: "Hồ sơ nguồn giống (PDF/Ảnh)", certifications: ["GACP", "Organic"], input: { type: "file", accept: ".pdf,.jpg,.png" } },
      { id: "seed-gmo", label: "Có sử dụng giống GMO không?", certifications: ["Organic"], input: { type: "radio", options: ["Có", "Không"] } },
      { id: "sowing-date", label: "Ngày gieo/trồng", certifications: ["GACP", "Organic"], input: { type: "date" } },
      { id: "input-type", label: "Vật tư đầu vào - Loại", certifications: ["GACP", "Organic"], input: { type: "select", options: ["Phân hữu cơ", "Chế phẩm sinh học", "Khác"] } },
      { id: "input-qty", label: "Vật tư đầu vào - Số lượng", certifications: ["GACP", "Organic"], input: { type: "text", placeholder: "VD: 25 kg" } },
      { id: "input-cert", label: "Giấy chứng nhận/nhãn (ảnh)", certifications: ["GACP", "Organic"], input: { type: "file", accept: ".jpg,.png,.webp" } },
    ],
  },
  {
    id: "cultivation-log",
    title: "4. Nhật ký canh tác",
    items: [
      { id: "watering-date", label: "Ngày tưới nước (camera AI auto-capture)", certifications: ["GACP", "Organic"], input: { type: "date" } },
      { id: "fertilize-date", label: "Ngày bón phân (camera AI auto-capture)", certifications: ["GACP", "Organic"], input: { type: "date" } },
      { id: "fertilizer-type", label: "Loại phân bón sử dụng", certifications: ["Organic"], input: { type: "select", options: ["Hữu cơ", "Sinh học", "Khác"] } },
      { id: "weeding-date", label: "Ngày làm cỏ (calendar)", certifications: [], input: { type: "date" } },
      { id: "weeding-photo", label: "Ảnh làm cỏ (upload)", certifications: [], input: { type: "file", accept: ".jpg,.png" } },
      { id: "biopesticide-type", label: "Thuốc BVTV sinh học - Loại", certifications: ["GACP", "Organic"], input: { type: "select", options: ["Chế phẩm A", "Chế phẩm B", "Khác"] } },
      { id: "biopesticide-qty", label: "Thuốc BVTV sinh học - Lượng", certifications: ["GACP", "Organic"], input: { type: "text", placeholder: "VD: 2 lít" } },
      { id: "biopesticide-package", label: "Bao bì thuốc BVTV sinh học", certifications: ["GACP", "Organic"], input: { type: "file", accept: ".jpg,.png" } },
      { id: "abnormal-events", label: "Sự kiện bất thường (mưa bão, sâu bệnh)", certifications: [], input: { type: "textarea", placeholder: "Mô tả sự kiện" } },
      { id: "abnormal-events-photo", label: "Ảnh sự kiện bất thường", certifications: [], input: { type: "file", accept: ".jpg,.png" } },
      { id: "worker-person", label: "Người phụ trách công việc", certifications: ["GACP"], input: { type: "text", placeholder: "Chọn hoặc nhập tên" } },
    ],
  },
  {
    id: "harvest-post",
    title: "5. Thu hoạch & sau thu hoạch",
    items: [
      { id: "harvest-date", label: "Ngày thu hoạch", certifications: ["GACP", "Organic"], input: { type: "date" } },
      { id: "harvest-yield", label: "Sản lượng (kg)", certifications: [], input: { type: "number", min: 0 } },
      { id: "harvest-method", label: "Phương pháp thu hái", certifications: [], input: { type: "select", options: ["Thủ công", "Máy"] } },
      { id: "harvest-photos", label: "Ảnh minh chứng thu hoạch", certifications: [], input: { type: "file", accept: ".jpg,.png" } },
      { id: "processing-method", label: "Phương pháp sơ chế", certifications: ["GACP", "OCOP"], input: { type: "select", options: ["Rửa", "Sấy", "Phơi", "Đóng gói"] } },
      { id: "storage-cond", label: "Điều kiện bảo quản (nhiệt độ/độ ẩm)", certifications: ["GACP", "Organic"], input: { type: "text", placeholder: "VD: 15°C / 55% RH" } },
      { id: "retention-file", label: "Hồ sơ lưu mẫu", certifications: ["GACP"], input: { type: "file", accept: ".pdf,.jpg,.png" } },
    ],
  },
  {
    id: "testing-quality",
    title: "6. Kiểm nghiệm & chất lượng",
    items: [
      { id: "final-test-results", label: "Kết quả kiểm nghiệm thành phẩm", certifications: ["Organic"], input: { type: "file", accept: ".pdf" } },
      { id: "gov-inspection", label: "Biên bản kiểm tra của cơ quan quản lý", certifications: ["GACP"], input: { type: "file", accept: ".pdf" } },
      { id: "quality-standard-cert", label: "Giấy chứng nhận tiêu chuẩn chất lượng", certifications: ["OCOP"], input: { type: "file", accept: ".pdf" } },
    ],
  },
  {
    id: "personnel",
    title: "7. Nhân sự",
    items: [
      { id: "labor-list", label: "Danh sách lao động (import Excel)", certifications: ["GACP", "OCOP"], input: { type: "file", accept: ".xlsx,.xls,.csv" } },
      { id: "health-records", label: "Hồ sơ sức khỏe định kỳ", certifications: ["GACP", "OCOP"], input: { type: "file", accept: ".pdf,.jpg,.png" } },
      { id: "gacp-training", label: "Giấy chứng nhận đào tạo GACP", certifications: ["GACP", "OCOP"], input: { type: "file", accept: ".pdf" } },
    ],
  },
  {
    id: "packaging-label",
    title: "8. Bao bì & nhãn mác",
    items: [
      { id: "packaging-design", label: "Thiết kế bao bì", certifications: ["OCOP"], input: { type: "file", accept: ".jpg,.png,.pdf" } },
      { id: "label-content", label: "Nội dung nhãn sản phẩm", certifications: ["OCOP"], input: { type: "textarea", placeholder: "Tên sản phẩm, địa chỉ, NSX, HSD, tiêu chuẩn công bố" } },
      { id: "anti-counterfeit", label: "Tem chống giả / QR code (ảnh)", certifications: ["OCOP"], input: { type: "file", accept: ".jpg,.png" } },
      { id: "qr-link", label: "Link QR truy xuất", certifications: ["OCOP"], input: { type: "text", placeholder: "https://..." } },
    ],
  },
  {
    id: "market-evidence",
    title: "9. Minh chứng thị trường",
    items: [
      { id: "contract", label: "Hợp đồng bao tiêu", certifications: ["OCOP"], input: { type: "file", accept: ".pdf" } },
      { id: "sales-records", label: "Hồ sơ bán hàng (hóa đơn)", certifications: ["OCOP"], input: { type: "file", accept: ".pdf,.jpg,.png" } },
      { id: "distribution-channels", label: "Kênh phân phối", certifications: ["OCOP"], input: { type: "select", options: ["Siêu thị", "Cửa hàng", "Online", "Xuất khẩu"] } },
    ],
  },
]

// Track which checklist items are checked
const CertificationComplianceChecklist = () => {
  const [checked, setChecked] = useState<Record<string, boolean>>({})
  const [dates, setDates] = useState<Record<string, Date | undefined>>({})

  const toggle = (id: string, value: boolean | string) => {
    setChecked((prev) => ({ ...prev, [id]: typeof value === "string" ? value === "true" : value }))
  }
  // Derive certification completion
  const certificationStatus = useMemo(() => {
    const map: Record<Certification, { total: number; done: number }> = {
      GACP: { total: 0, done: 0 },
      Organic: { total: 0, done: 0 },
      OCOP: { total: 0, done: 0 },
    }
    sections.forEach((s) =>
      s.items.forEach((it: ChecklistItemDef) => {
        it.certifications.forEach((c: Certification) => {
          map[c].total += 1
          if (checked[it.id]) map[c].done += 1
        })
      }),
    )
    return map
  }, [checked])

  const isCompliant = (c: Certification) => certificationStatus[c].total > 0 && certificationStatus[c].done === certificationStatus[c].total

  const renderInput = (item: ChecklistItemDef) => {
    switch (item.input.type) {
      case "text":
        return <Input placeholder={item.input.placeholder} className="w-64" />
      case "number":
        return <Input type="number" min={item.input.min} max={item.input.max} className="w-40" />
      case "file":
        return (
          <div className="flex items-center gap-2">
            <Input type="file" accept={item.input.accept} className="w-64" />
            <Upload className="h-4 w-4 text-muted-foreground" />
          </div>
        )
      case "select":
        return (
          <Select>
            <SelectTrigger className="w-48"><SelectValue placeholder="Chọn" /></SelectTrigger>
            <SelectContent>
              {item.input.options.map((o: string) => (
                <SelectItem key={o} value={o}>{o}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        )
      case "date":
        return (
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className={cn("w-48 justify-start text-left font-normal", !dates[item.id] && "text-muted-foreground")}> 
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dates[item.id] ? dates[item.id]?.toLocaleDateString("vi-VN") : "Chọn ngày"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0" align="start">
              <Calendar mode="single" selected={dates[item.id]} onSelect={(d) => setDates((p) => ({ ...p, [item.id]: d }))} initialFocus />
            </PopoverContent>
          </Popover>
        )
      case "radio":
        return (
          <RadioGroup className="flex" defaultValue={item.input.options[1]}> 
            {item.input.options.map((o: string) => (
              <div key={o} className="flex items-center space-x-2 mr-4">
                <RadioGroupItem value={o} id={`${item.id}-${o}`} />
                <Label htmlFor={`${item.id}-${o}`}>{o}</Label>
              </div>
            ))}
          </RadioGroup>
        )
      case "textarea":
        return <textarea rows={item.input.rows ?? 3} placeholder={item.input.placeholder} className="w-72 rounded-md border border-white/10 bg-white/5 p-2 text-sm outline-none focus:ring-2 focus:ring-primary/40" />
      default:
        return null
    }
  }

  return (
    <div className="p-6 space-y-8">
      <header className="space-y-2">
        <h1 className="text-4xl font-bold gradient-text">Certification Compliance Checklist</h1>
        <p className="text-muted-foreground max-w-2xl">Theo dõi & hoàn thiện các yêu cầu để đủ điều kiện đạt chứng nhận quốc tế.</p>
      </header>

      {/* Certification Status */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Certification Status</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {["GACP", "Organic", "OCOP"].map((c) => {
            const cert = c as Certification
            const compliant = isCompliant(cert)
            return (
              <Card key={cert} className="glass-card">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center justify-between text-base">
                    <span>{cert}</span>
                    {compliant ? (
                      <Badge className="bg-emerald-400 text-emerald-950">Compliant</Badge>
                    ) : (
                      <Badge variant="destructive">Incomplete</Badge>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  {compliant ? (
                    <p>Nông trại của bạn đã đáp ứng đầy đủ yêu cầu {cert}.</p>
                  ) : (
                    <p>
                      Hoàn thành {certificationStatus[cert].done}/{certificationStatus[cert].total} mục để đạt chứng nhận {cert}.
                    </p>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>
      </section>

      {/* Checklist Accordion */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Checklist chi tiết</h2>
          <Button variant="outline" size="sm">Xuất báo cáo (PDF)</Button>
        </div>
        <Accordion type="multiple" className="space-y-3">
          {sections.map((section) => (
            <AccordionItem key={section.id} value={section.id} className="border rounded-lg px-2">
              <AccordionTrigger className="text-left">{section.title}</AccordionTrigger>
              <AccordionContent className="space-y-1">
                {section.items.map((item) => {
                  const checkedVal = !!checked[item.id]
                  return (
                    <div
                      key={item.id}
                      className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 py-3 border-b last:border-none border-white/10"
                    >
                      <div className="flex items-start gap-3 md:max-w-xl">
                        <Checkbox id={item.id} checked={checkedVal} onCheckedChange={(v) => toggle(item.id, Boolean(v))} />
                        <div className="space-y-1">
                          <Label htmlFor={item.id} className="font-medium leading-snug">
                            {item.label}
                          </Label>
                          <div className="flex flex-wrap gap-2">
                            {item.certifications.map((c: Certification) => (
                              <Badge key={c} variant="outline" className="text-xs px-2 py-0">
                                {c}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center flex-wrap gap-4">{renderInput(item)}</div>
                    </div>
                  )
                })}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </div>
  )
}

export default CertificationComplianceChecklist
