import { Button } from "@/components/ui/button"
import { ArrowRight, Award, Shield, Zap } from "lucide-react"


export const ShopHeroSection = () => {
  return (
    <section className="relative bg-linear-to-br from-[#0a1628] via-[#1e293b] to-[#0f172a] text-white py-16 md:py-20 overflow-hidden min-h-[85vh] flex items-center">
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />

      <div className="absolute top-20 right-10 w-96 h-96 bg-[#1e40af] rounded-full blur-3xl opacity-20 animate-pulse" />
      <div className="absolute bottom-20 left-10 w-[500px] h-[500px] bg-[#3b82f6] rounded-full blur-3xl opacity-10 animate-pulse delay-1000" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Award className="h-4 w-4 text-[#60a5fa]" />
            <span className="text-sm font-medium">Calidad Certificada</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700 leading-tight">
            Alcanza tu{" "}
            <span className="bg-linear-to-r from-[#3b82f6] to-[#60a5fa] bg-clip-text text-transparent">
              Máximo Potencial
            </span>
          </h1>

          <p className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150 leading-relaxed">
            Suplementos deportivos de la más alta calidad para atletas que buscan resultados reales. Certificados,
            probados y respaldados por profesionales.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300 mb-12">
            <a href="/productos">
              <Button
                size="lg"
                className="bg-[#1e40af] hover:bg-[#1e3a8a] text-white transition-smooth group px-8 py-6 text-lg shadow-xl hover:shadow-2xl hover:scale-105"
              >
                Ver Productos
                <ArrowRight className="ml-2 h-5 w-5 transition-smooth group-hover:translate-x-1" />
              </Button>
            </a>
            <a href="/about">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white/30 text-white hover:bg-white hover:text-[#0a1628] transition-smooth bg-transparent backdrop-blur-sm px-8 py-6 text-lg hover:scale-105"
              >
                Conocer Más
              </Button>
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500">
            <div className="flex items-center justify-center gap-3 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 transition-smooth hover:bg-white/10 hover:scale-105">
              <Shield className="h-6 w-6 text-[#60a5fa]" />
              <div className="text-left">
                <p className="font-semibold text-sm">100% Seguro</p>
                <p className="text-xs text-white/60">Certificado</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 transition-smooth hover:bg-white/10 hover:scale-105">
              <Zap className="h-6 w-6 text-[#60a5fa]" />
              <div className="text-left">
                <p className="font-semibold text-sm">Envío Rápido</p>
                <p className="text-xs text-white/60">24-48 horas</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 transition-smooth hover:bg-white/10 hover:scale-105">
              <Award className="h-6 w-6 text-[#60a5fa]" />
              <div className="text-left">
                <p className="font-semibold text-sm">Calidad Premium</p>
                <p className="text-xs text-white/60">Garantizada</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
