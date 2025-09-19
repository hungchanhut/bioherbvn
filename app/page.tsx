"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Cpu, Wifi, FileCheck, Twitter, Linkedin } from "lucide-react"
import { useRouter } from "next/navigation"

export default function LandingPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-background">
      {/* Header / Navigation Bar */}
      <header className="fixed top-0 w-full z-50 glass-card border-b border-white/10">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold gradient-text">BioHerb</div>
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
              Tính năng
            </a>
            <a href="#showcase" className="text-muted-foreground hover:text-foreground transition-colors">
              Cách hoạt động
            </a>
            <a href="#footer" className="text-muted-foreground hover:text-foreground transition-colors">
              Liên hệ
            </a>
            <Button className="gradient-primary glow-primary hover:glow-accent transition-all duration-300">
              Đăng nhập
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 overflow-visible gradient-text leading-[1.2] md:leading-[1.15] tracking-tight pt-1 pb-2">Quản lý vùng trồng thông minh.</h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-4xl mx-auto leading-relaxed">
            Ứng dụng IoT và AI để canh tác dược liệu với độ chính xác, tuân thủ và minh bạch vượt trội.
          </p>
          <Button
            size="lg"
            className="gradient-primary glow-primary hover:glow-accent transition-all duration-300 text-lg px-8 py-6 group"
            onClick={() => router.push("/dashboard")}
          >
            Truy cập Bảng điều khiển
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>

          {/* Background Visual */}
          <div className="mt-20 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-cyan-500/20 blur-3xl"></div>
            <div className="relative glass-card p-8 max-w-2xl mx-auto">
              <div className="text-center text-muted-foreground">
                <div className="text-lg font-medium mb-2">Trực quan nông nghiệp số</div>
                <div className="text-sm">Mạng neural AI giám sát cây trồng của bạn</div>
                <div className="mt-4 grid grid-cols-3 gap-4">
                  <div className="h-16 bg-gradient-to-br from-cyan-500/30 to-purple-500/30 rounded-lg animate-pulse"></div>
                  <div className="h-16 bg-gradient-to-br from-purple-500/30 to-cyan-500/30 rounded-lg animate-pulse delay-150"></div>
                  <div className="h-16 bg-gradient-to-br from-cyan-500/30 to-purple-500/30 rounded-lg animate-pulse delay-300"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-foreground">Tại sao chọn BioHerb?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="glass-card glow-primary hover:glow-accent transition-all duration-300 group">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-3 rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20 w-fit group-hover:scale-110 transition-transform">
                  <Cpu className="h-8 w-8 text-accent" />
                </div>
                <CardTitle className="text-xl font-semibold">Phân tích bằng AI</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-muted-foreground leading-relaxed">
                  Các thuật toán học máy tiên tiến phân tích dữ liệu cây trồng để đưa ra dự báo và tự động tối ưu hóa
                  điều kiện sinh trưởng.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="glass-card glow-primary hover:glow-accent transition-all duration-300 group">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-3 rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20 w-fit group-hover:scale-110 transition-transform">
                  <Wifi className="h-8 w-8 text-accent" />
                </div>
                <CardTitle className="text-xl font-semibold">Giám sát IoT thời gian thực</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-muted-foreground leading-relaxed">
                  Các cảm biến kết nối khắp trang trại cung cấp giám sát 24/7 về điều kiện đất, nhiệt độ, độ ẩm và
                  các chỉ số sức khỏe cây trồng.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="glass-card glow-primary hover:glow-accent transition-all duration-300 group">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-3 rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20 w-fit group-hover:scale-110 transition-transform">
                  <FileCheck className="h-8 w-8 text-accent" />
                </div>
                <CardTitle className="text-xl font-semibold">Báo cáo GACP tự động</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-muted-foreground leading-relaxed">
                  Đảm bảo tuân thủ Thực hành Nông nghiệp và Thu hái tốt (GACP) thông qua hệ thống tự động lập hồ sơ và
                  báo cáo.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Visual Showcase Section */}
      <section id="showcase" className="py-20 px-6">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-foreground">Trung tâm điều khiển trang trại của bạn.</h2>
          <div className="relative max-w-6xl mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-cyan-500/20 blur-2xl"></div>
            <div className="relative glass-card p-8 glow-primary">
              <div className="aspect-video bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-lg border border-white/10 flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <div className="text-2xl font-bold mb-2">Xem trước Bảng điều khiển BioHerb</div>
                  <div className="text-lg">Giao diện quản lý trang trại theo thời gian thực</div>
                  <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
                    <div className="h-20 bg-gradient-to-br from-cyan-500/30 to-purple-500/30 rounded-lg flex items-center justify-center">
                      <span className="text-sm font-medium">Thửa</span>
                    </div>
                    <div className="h-20 bg-gradient-to-br from-purple-500/30 to-cyan-500/30 rounded-lg flex items-center justify-center">
                      <span className="text-sm font-medium">Cảm biến</span>
                    </div>
                    <div className="h-20 bg-gradient-to-br from-cyan-500/30 to-purple-500/30 rounded-lg flex items-center justify-center">
                      <span className="text-sm font-medium">Phân tích</span>
                    </div>
                    <div className="h-20 bg-gradient-to-br from-purple-500/30 to-cyan-500/30 rounded-lg flex items-center justify-center">
                      <span className="text-sm font-medium">Báo cáo</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="footer" className="py-12 px-6 border-t border-white/10">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
              <div className="flex items-center space-x-8">
              <div className="text-xl font-bold gradient-text">BioHerb</div>
              <div className="text-sm text-muted-foreground">© 2025 BioHerb. Bảo lưu mọi quyền.</div>
            </div>

            <div className="flex items-center space-x-6">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                Chính sách bảo mật
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                Điều khoản dịch vụ
              </a>
              <div className="flex items-center space-x-4">
                <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
