"use client"

import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

type Integration = {
  id: string
  name: string
  logo: string // path under /public
  description: string
}

const INTEGRATIONS: Integration[] = [
  {
    id: "sapb1",
    name: "ERP / SAP Business One",
    logo: "/placeholder.svg",
    description: "Đồng bộ đơn hàng, tồn kho và sổ cái với hệ thống ERP/SAP B1.",
  },
  {
    id: "blockchain",
    name: "Blockchain Ledger",
    logo: "/placeholder.svg",
    description: "Ghi nhận truy xuất nguồn gốc bất biến trên sổ cái blockchain.",
  },
  {
    id: "dna",
    name: "DNA Tagging Service",
    logo: "/placeholder.svg",
    description: "Liên kết mẫu DNA với lô sản xuất để xác thực nguồn gốc.",
  },
  {
    id: "govapi",
    name: "Government API",
    logo: "/placeholder.svg",
    description: "Kết nối API cơ quan nhà nước để tra cứu và đồng bộ hồ sơ.",
  },
]

export default function IntegrationsPage() {
  return (
    <div className="p-6">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold gradient-text mb-6">Tích hợp</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {INTEGRATIONS.map((i) => (
            <Card key={i.id} className="glass-card">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="relative h-10 w-10 rounded-md overflow-hidden border border-white/10 bg-white/10">
                    <Image src={i.logo} alt={i.name} fill sizes="40px" className="object-contain" />
                  </div>
                  <CardTitle className="leading-tight">{i.name}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground min-h-12">{i.description}</p>
                <Button className="mt-4" variant="outline">Cấu hình</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
