"use client"

import { useEffect } from "react"
import dynamic from "next/dynamic"
import "leaflet/dist/leaflet.css"

// Dynamic import of React Leaflet components to avoid SSR issues
const MapContainer = dynamic(() => import("react-leaflet").then(m => m.MapContainer), { ssr: false })
const TileLayer = dynamic(() => import("react-leaflet").then(m => m.TileLayer), { ssr: false })
const Polygon = dynamic(() => import("react-leaflet").then(m => m.Polygon), { ssr: false })
const Marker = dynamic(() => import("react-leaflet").then(m => m.Marker), { ssr: false })
const Popup = dynamic(() => import("react-leaflet").then(m => m.Popup), { ssr: false })

import L from "leaflet"

// Fix default icon paths for Leaflet in Next.js bundling context
// (Leaflet expects images to be in /, we point them to CDN or leave default; provide simple circle marker as fallback)

delete (L.Icon.Default as any).prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
})

// Small mock polygon (~10 ha) near Phú Lương, Thái Nguyên.
// 10 hectares ~ 0.1 km^2. We'll create a tiny rectangle (roughly 316m x 316m) in lat/long.
// Latitude degrees ~111km; Longitude degrees at this latitude ~ 111km * cos(lat).
// We'll approximate offsets ~0.00285 degrees (~316m) for simplicity.
const plotCenter: [number, number] = [21.6005, 105.6835]
const offset = 0.00285 / 2 // half-size each direction
const plotPolygon: [number, number][] = [
  [plotCenter[0] + offset, plotCenter[1] - offset],
  [plotCenter[0] + offset, plotCenter[1] + offset],
  [plotCenter[0] - offset, plotCenter[1] + offset],
  [plotCenter[0] - offset, plotCenter[1] - offset],
]

// Marker at plot center
const plotLocation: [number, number] = plotCenter

interface InteractiveMapProps {
  height?: string
  className?: string
}

export function InteractiveMap({ height = "16rem", className = "" }: InteractiveMapProps) {
  // Could add side-effects or data fetch here
  useEffect(() => {}, [])

  return (
    <div
      className={`relative rounded-lg overflow-hidden border border-white/10 focus:outline-none focus:ring-2 focus:ring-accent/50 ${className}`}
      style={{ height }}
      aria-label="Bản đồ tương tác vườn trồng"
      role="region"
    >
      <MapContainer
  center={plotCenter}
  zoom={15}
  scrollWheelZoom={true}
  style={{ height: "100%", width: "100%" }}
  className="leaflet-map"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Polygon
          positions={plotPolygon}
          pathOptions={{ color: "#bbf7d0", weight: 2, fillColor: '#bbf7d0', fillOpacity: 0.25 }}
        />
        <Marker position={plotLocation}>
          <Popup>
            <div className="text-sm">
              <div className="font-semibold mb-1">Lô trồng thí điểm (~10ha)</div>
              <div>Khu vực: Phú Lương, Thái Nguyên</div>
              <div>Tọa độ: {plotLocation[0].toFixed(5)}, {plotLocation[1].toFixed(5)}</div>
              <div className="mt-1 text-xs text-muted-foreground">Dữ liệu mô phỏng</div>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  )
}

export default InteractiveMap
