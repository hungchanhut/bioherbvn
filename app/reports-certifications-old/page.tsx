"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Circle } from "lucide-react"
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

type ChecklistItem = { label: string; fulfilled: boolean }
type CertificationCard = {
  title: string
  items: ChecklistItem[]
}

const certifications: CertificationCard[] = [
  {
    title: "GACP-WHO",
    items: [
      { label: "Lịch sử sử dụng đất 5 năm gần nhất", fulfilled: true },
      { label: "Kết quả kiểm nghiệm đất ", fulfilled: true },
      { label: "Kết quả kiểm nghiệm nước định kỳ ", fulfilled: false },
      { label: "Đào tạo nhân sự định kỳ", fulfilled: true },
      { label: "Lịch sử sử dụng đất 5 năm gần nhất", fulfilled: true },
      { label: "Báo cáo tuân thủ GACP-WHO", fulfilled: false },
    ],
  },
  {
    title: "Organic",
    items: [
      { label: "Không sử dụng hóa chất tổng hợp", fulfilled: true },
      { label: "Chứng nhận nguồn giống hữu cơ", fulfilled: false },
      { label: "Kiểm tra đất & nước định kỳ", fulfilled: true },
    ],
  },
  {
    title: "OCOP",
    items: [
      { label: "Hồ sơ công bố chất lượng sản phẩm", fulfilled: true },
      { label: "Minh chứng truy xuất nguồn gốc", fulfilled: true },
      { label: "Đánh giá cảm quan & bao bì", fulfilled: true },
    ],
  },
]

const yieldCostData = [
  { year: "2021", yield: 12, cost: 8 },
  { year: "2022", yield: 15, cost: 9 },
  { year: "2023", yield: 14, cost: 10 },
  { year: "2024", yield: 18, cost: 12 },
  { year: "2025", yield: 20, cost: 13 },
]

const pestDiseaseData = [
  { month: "01", incidents: 5 },
  { month: "02", incidents: 3 },
  { month: "03", incidents: 6 },
  { month: "04", incidents: 4 },
  { month: "05", incidents: 7 },
  { month: "06", incidents: 2 },
]

export default function ReportsCertificationsPage() {
  return (
    <div className="p-6">
      <div className="container mx-auto space-y-6">
        <div>
          <h1 className="text-4xl font-bold gradient-text mb-2">Báo cáo & chứng nhận</h1>
          <p className="text-muted-foreground">Theo dõi trạng thái chứng nhận và xuất báo cáo tuân thủ.</p>
        </div>

        {/* Certification Status */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Trạng thái chứng nhận</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {certifications.map((cert) => {
                const compliant = cert.items.every((i) => i.fulfilled)
                return (
                  <div key={cert.title} className="rounded-lg border border-white/10 bg-white/5 p-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">{cert.title}</h3>
                      {compliant ? (
                        <Badge className="bg-[#bbf7d0] text-[#0f1e1a] border-[#86efac]/50">Phù hợp</Badge>
                      ) : (
                        <Badge variant="destructive">Chưa đủ</Badge>
                      )}
                    </div>
                    <ul className="mt-3 space-y-2 text-sm">
                      {cert.items.map((item) => (
                        <li key={item.label} className="flex items-center gap-2">
                          {item.fulfilled ? (
                            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                          ) : (
                            <Circle className="h-4 w-4 text-muted-foreground" />
                          )}
                          <span className="text-foreground">{item.label}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Reporting */}
        <Card className="glass-card">
          <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <CardTitle>Báo cáo</CardTitle>
            <Button className="mt-2 sm:mt-0">Xuất báo cáo tuân thủ (PDF)</Button>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-semibold mb-3">Phân tích</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Yield and Cost Comparison */}
                <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                  <h4 className="text-sm font-medium text-muted-foreground mb-3">So sánh sản lượng và chi phí (theo năm)</h4>
                  <div className="h-48">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={yieldCostData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                        <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fill: "rgba(255,255,255,0.6)", fontSize: 12 }} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fill: "rgba(255,255,255,0.6)", fontSize: 12 }} />
                        <Tooltip contentStyle={{ backgroundColor: "rgba(0,0,0,0.8)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px" }} />
                        <defs>
                          <linearGradient id="yieldGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#bbf7d0" stopOpacity="1" />
                            <stop offset="100%" stopColor="#bbf7d0" stopOpacity="0.15" />
                          </linearGradient>
                          <linearGradient id="costGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#93c5fd" stopOpacity="1" />
                            <stop offset="100%" stopColor="#93c5fd" stopOpacity="0.15" />
                          </linearGradient>
                        </defs>
                        <Bar dataKey="yield" fill="url(#yieldGradient)" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="cost" fill="url(#costGradient)" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Pest & Disease Incidents */}
                <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                  <h4 className="text-sm font-medium text-muted-foreground mb-3">Sâu bệnh & dịch hại theo thời gian</h4>
                  <div className="h-48">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={pestDiseaseData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                        <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "rgba(255,255,255,0.6)", fontSize: 12 }} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fill: "rgba(255,255,255,0.6)", fontSize: 12 }} />
                        <Tooltip contentStyle={{ backgroundColor: "rgba(0,0,0,0.8)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px" }} />
                        <defs>
                          <linearGradient id="incidentGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#fca5a5" stopOpacity="1" />
                            <stop offset="100%" stopColor="#fca5a5" stopOpacity="0.2" />
                          </linearGradient>
                        </defs>
                        <Line type="monotone" dataKey="incidents" stroke="#fca5a5" strokeWidth={3} dot={{ fill: "#fca5a5", strokeWidth: 2, r: 3 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
