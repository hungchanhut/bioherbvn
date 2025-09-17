"use client"

import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { FileText, Plus } from "lucide-react"

// Mock inspection data
const inspections = [
  {
    id: 1,
    date: "2025-08-20",
    agency: "GreenCert Co.",
    purpose: "GACP Annual Audit",
    outcome: "Passed",
  },
  {
    id: 2,
    date: "2025-06-12",
    agency: "AgriSafe Vietnam",
    purpose: "Organic Compliance Review",
    outcome: "Corrective Action Required",
  },
  {
    id: 3,
    date: "2024-11-05",
    agency: "OCOP Committee",
    purpose: "OCOP Verification",
    outcome: "Passed",
  },
]

export default function InspectionHistoryPage() {
  const outcomeBadge = (outcome: string) => {
    if (outcome === "Passed") {
      return (
        <Badge className="bg-[#bbf7d0] text-[#0f1e1a] border-[#86efac]/50">Đạt</Badge>
      )
    }
    return <Badge variant="destructive">Cần khắc phục</Badge>
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold gradient-text">Inspection History</h1>
          <Button className="gradient-primary glow-primary hover:glow-accent transition-all duration-300">
            <Plus className="h-4 w-4 mr-2" />
            Log New Inspection
          </Button>
        </div>

        {/* Inspections Table */}
        <div className="glass-card glow-primary">
          <Table>
            <TableHeader>
              <TableRow className="border-white/10">
                <TableHead className="text-foreground font-semibold">Inspection Date</TableHead>
                <TableHead className="text-foreground font-semibold">Inspector/Agency</TableHead>
                <TableHead className="text-foreground font-semibold">Purpose</TableHead>
                <TableHead className="text-foreground font-semibold">Outcome</TableHead>
                <TableHead className="text-foreground font-semibold">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inspections.map((row) => (
                <TableRow key={row.id} className="border-white/10 hover:bg-white/5">
                  <TableCell className="text-muted-foreground">{row.date}</TableCell>
                  <TableCell className="text-foreground font-medium">{row.agency}</TableCell>
                  <TableCell className="text-foreground">{row.purpose}</TableCell>
                  <TableCell>{outcomeBadge(row.outcome)}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-white/10">
                      <FileText className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}
