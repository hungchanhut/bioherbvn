"use client"

import Image from "next/image"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"

interface CertItem {
  key: string
  title: string
  logo: string
  status: "Active" | "Pending Renewal"
  expiry: string
  pdf: string
}

const certs: CertItem[] = [
  { key: "organic", title: "ORGANIC", logo: "/certs/logos/organic.svg", status: "Active", expiry: "2026-03-31", pdf: "/certs/organic.pdf" },
  { key: "vietgap", title: "VietGAP", logo: "/certs/logos/vietgap.svg", status: "Active", expiry: "2025-12-15", pdf: "/certs/vietgap.pdf" },
  { key: "gacp", title: "GACP", logo: "/certs/logos/gacp.svg", status: "Pending Renewal", expiry: "2025-09-30", pdf: "/certs/gacp.pdf" },
  { key: "ocop", title: "OCOP", logo: "/certs/logos/ocop.svg", status: "Active", expiry: "2027-01-10", pdf: "/certs/ocop.pdf" },
]

export default function CertificationsHubPage() {
  const [open, setOpen] = useState(false)
  const [activeCert, setActiveCert] = useState<CertItem | null>(null)

  const openCert = (c: CertItem) => {
    setActiveCert(c)
    setOpen(true)
  }

  const statusClass = (s: CertItem["status"]) =>
    s === "Active" ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/20" : "bg-amber-500/15 text-amber-400 border-amber-500/20"

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto max-w-7xl space-y-6">
        <h1 className="text-3xl font-bold gradient-text">Trung tâm chứng nhận</h1>

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {certs.map((c) => (
            <button
              key={c.key}
              onClick={() => openCert(c)}
              className="text-left"
              aria-label={`Mở chứng chỉ ${c.title}`}
            >
              <Card className="glass-card hover:glow-accent transition-all border border-white/10 p-5 h-full">
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16">
                    <Image src={c.logo} alt={`${c.title} logo`} fill className="object-contain" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-semibold text-foreground">{c.title}</h3>
                      <Badge className={`border ${statusClass(c.status)}`}>
                        {c.status === "Active" ? "Đang hiệu lực" : "Chờ gia hạn"}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Hết hạn: {c.expiry}</p>
                  </div>
                </div>
              </Card>
            </button>
          ))}
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="max-w-4xl w-[95vw]">
            <DialogHeader>
              <DialogTitle>{activeCert?.title} — Chứng chỉ chính thức</DialogTitle>
            </DialogHeader>
            <div className="w-full h-[70vh]">
              {activeCert && (
                <iframe
                  title={`Chứng chỉ ${activeCert.title}`}
                  src={activeCert.pdf}
                  className="w-full h-full rounded-md border border-white/10"
                />
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
