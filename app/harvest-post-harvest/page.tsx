"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { FileText } from "lucide-react"

// Mock lots data
const lots = [
  {
    id: "LOT-2025-001",
    harvestDate: "2025-08-18",
    yieldKgPerHa: 1450,
    qualityStatus: "Passed",
  },
  {
    id: "LOT-2025-002",
    harvestDate: "2025-08-21",
    yieldKgPerHa: 1310,
    qualityStatus: "Pending",
  },
  {
    id: "LOT-2025-003",
    harvestDate: "2025-09-02",
    yieldKgPerHa: 1505,
    qualityStatus: "Corrective Action Required",
  },
]

export default function HarvestPostHarvestPage() {
  const qualityBadge = (status: string) => {
    if (status === "Passed") {
      return (
        <Badge className="bg-[#bbf7d0] text-[#0f1e1a] border-[#86efac]/50">Đạt</Badge>
      )
    }
    if (status === "Pending") {
      return <Badge className="bg-yellow-400 text-black border-transparent">Chờ xử lý</Badge>
    }
    return <Badge variant="destructive">Cần khắc phục</Badge>
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold gradient-text">Harvest & Post-Harvest</h1>
        </div>

        {/* Lots Table */}
        <div className="glass-card glow-primary">
          <Table>
            <TableHeader>
              <TableRow className="border-white/10">
                <TableHead className="text-foreground font-semibold">Lot ID</TableHead>
                <TableHead className="text-foreground font-semibold">Harvest Date</TableHead>
                <TableHead className="text-foreground font-semibold">Yield (kg/ha)</TableHead>
                <TableHead className="text-foreground font-semibold">Quality Status</TableHead>
                <TableHead className="text-foreground font-semibold">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {lots.map((lot) => (
                <TableRow key={lot.id} className="border-white/10 hover:bg-white/5">
                  <TableCell className="text-foreground font-medium">{lot.id}</TableCell>
                  <TableCell className="text-muted-foreground">{lot.harvestDate}</TableCell>
                  <TableCell className="text-foreground">{lot.yieldKgPerHa}</TableCell>
                  <TableCell>{qualityBadge(lot.qualityStatus)}</TableCell>
                  <TableCell>
                    <Link href={`/harvest-post-harvest/${lot.id}`}>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-white/10">
                        <FileText className="h-4 w-4" />
                      </Button>
                    </Link>
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
