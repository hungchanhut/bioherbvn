"use client"

import { useMemo, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { UploadCloud, FileText, Users } from "lucide-react"

type Employee = {
  id: string
  name: string
  role: string
  joinDate: string
}

const mockEmployees: Employee[] = [
  { id: "E-001", name: "Nguyễn Văn A", role: "Quản lý trang trại", joinDate: "2023-02-10" },
  { id: "E-002", name: "Trần Thị B", role: "Kỹ thuật viên", joinDate: "2023-05-18" },
  { id: "E-003", name: "Lê Văn C", role: "Nhân công", joinDate: "2024-01-03" },
]

export default function PersonnelManagementPage() {
  const [selectedTab, setSelectedTab] = useState("employees")
  const [healthFiles, setHealthFiles] = useState<File[]>([])
  const [trainingFiles, setTrainingFiles] = useState<Array<{ file: File; employeeId: string }>>([])
  const employeeOptions = useMemo(() => mockEmployees.map((e) => ({ label: `${e.id} - ${e.name}`, value: e.id })), [])
  const [selectedEmployeeForTraining, setSelectedEmployeeForTraining] = useState<string | undefined>(undefined)

  return (
    <div className="p-6">
      <div className="container mx-auto">
        <div className="mb-6">
          <h1 className="text-4xl font-bold gradient-text mb-2 flex items-center gap-2">
            <Users className="h-7 w-7 text-accent" /> Quản lý nhân sự
          </h1>
          <p className="text-muted-foreground">Quản lý danh sách nhân sự, hồ sơ sức khỏe định kỳ và chứng chỉ đào tạo GACP.</p>
        </div>

        <Card className="glass-card">
          <CardContent className="pt-6">
            <Tabs value={selectedTab} onValueChange={setSelectedTab}>
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="employees">Danh sách nhân sự</TabsTrigger>
                <TabsTrigger value="health">Hồ sơ sức khỏe</TabsTrigger>
                <TabsTrigger value="training">Chứng chỉ đào tạo</TabsTrigger>
              </TabsList>

              {/* Employee List */}
              <TabsContent value="employees" className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    <span>Danh sách nhân sự hiện tại</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline">
                      <UploadCloud className="w-4 h-4 mr-2" />
                      Nhập từ Excel
                    </Button>
                  </div>
                </div>
                <div className="rounded-lg border border-white/10">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-white/10">
                        <TableHead className="text-white">Mã NV</TableHead>
                        <TableHead className="text-white">Họ tên</TableHead>
                        <TableHead className="text-white">Chức vụ</TableHead>
                        <TableHead className="text-white">Ngày vào</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockEmployees.map((e) => (
                        <TableRow key={e.id} className="border-white/10 hover:bg-white/5">
                          <TableCell className="text-foreground">{e.id}</TableCell>
                          <TableCell className="text-foreground">{e.name}</TableCell>
                          <TableCell className="text-muted-foreground">{e.role}</TableCell>
                          <TableCell className="text-muted-foreground">{e.joinDate}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>

              {/* Health Records */}
              <TabsContent value="health" className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    <span>Hồ sơ sức khỏe định kỳ</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Input
                      type="file"
                      multiple
                      accept=".pdf,.jpg,.png"
                      onChange={(e) => {
                        const files = Array.from(e.target.files ?? [])
                        setHealthFiles((prev) => [...prev, ...files])
                      }}
                    />
                  </div>
                </div>
                <div className="rounded-lg border border-white/10">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-white/10">
                        <TableHead className="text-white">Tên tệp</TableHead>
                        <TableHead className="text-white">Kích thước</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {healthFiles.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={2} className="text-muted-foreground">Chưa có tệp nào được tải lên.</TableCell>
                        </TableRow>
                      ) : (
                        healthFiles.map((f, idx) => (
                          <TableRow key={`${f.name}-${idx}`} className="border-white/10 hover:bg-white/5">
                            <TableCell className="text-foreground">{f.name}</TableCell>
                            <TableCell className="text-muted-foreground">{Math.round(f.size / 1024)} KB</TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>

              {/* Training Certificates */}
              <TabsContent value="training" className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    <span>Chứng chỉ đào tạo GACP</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Select onValueChange={setSelectedEmployeeForTraining}>
                      <SelectTrigger className="w-[260px]">
                        <SelectValue placeholder="Chọn nhân viên" />
                      </SelectTrigger>
                      <SelectContent>
                        {employeeOptions.map((opt) => (
                          <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Input
                      type="file"
                      accept=".pdf,.jpg,.png"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file && selectedEmployeeForTraining) {
                          setTrainingFiles((prev) => [...prev, { file, employeeId: selectedEmployeeForTraining }])
                        }
                      }}
                    />
                  </div>
                </div>
                <div className="rounded-lg border border-white/10">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-white/10">
                        <TableHead className="text-white">Nhân viên</TableHead>
                        <TableHead className="text-white">Tên tệp</TableHead>
                        <TableHead className="text-white">Kích thước</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {trainingFiles.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={3} className="text-muted-foreground">Chưa có chứng chỉ nào được tải lên.</TableCell>
                        </TableRow>
                      ) : (
                        trainingFiles.map((t, idx) => {
                          const emp = mockEmployees.find((e) => e.id === t.employeeId)
                          return (
                            <TableRow key={`${t.employeeId}-${t.file.name}-${idx}`} className="border-white/10 hover:bg-white/5">
                              <TableCell className="text-foreground">{emp ? `${emp.id} - ${emp.name}` : t.employeeId}</TableCell>
                              <TableCell className="text-foreground">{t.file.name}</TableCell>
                              <TableCell className="text-muted-foreground">{Math.round(t.file.size / 1024)} KB</TableCell>
                            </TableRow>
                          )
                        })
                      )}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
