
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react"

export const ShopFooter = () => {
  return (
    <footer className="bg-[#0a1628] text-white mt-20 border-t border-white/10">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center mb-4">
              <span className="text-2xl font-bold text-white">Nutri</span>
              <span className="text-2xl font-bold text-[#3b82f6]">Point</span>
            </div>
            <p className="text-sm text-white/70 mb-4">
              Tu tienda de confianza para suplementos deportivos de la más alta calidad.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white/70 hover:text-[#3b82f6] transition-smooth">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-white/70 hover:text-[#3b82f6] transition-smooth">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-white/70 hover:text-[#3b82f6] transition-smooth">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4 text-white">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <a href="/productos" className="text-sm text-white/70 hover:text-[#3b82f6] transition-smooth">
                  Productos
                </a>
              </li>
              <li>
                <a href="/categories" className="text-sm text-white/70 hover:text-[#3b82f6] transition-smooth">
                  Categorías
                </a>
              </li>
              <li>
                <a href="/about" className="text-sm text-white/70 hover:text-[#3b82f6] transition-smooth">
                  Nosotros
                </a>
              </li>
              <li>
                <a href="/contact" className="text-sm text-white/70 hover:text-[#3b82f6] transition-smooth">
                  Contacto
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-semibold mb-4 text-white">Atención al Cliente</h3>
            <ul className="space-y-2">
              <li>
                <a href="/faq" className="text-sm text-white/70 hover:text-[#3b82f6] transition-smooth">
                  Preguntas Frecuentes
                </a>
              </li>
              <li>
                <a href="/shipping" className="text-sm text-white/70 hover:text-[#3b82f6] transition-smooth">
                  Envíos
                </a>
              </li>
              <li>
                <a href="/returns" className="text-sm text-white/70 hover:text-[#3b82f6] transition-smooth">
                  Devoluciones
                </a>
              </li>
              <li>
                <a href="/privacy" className="text-sm text-white/70 hover:text-[#3b82f6] transition-smooth">
                  Política de Privacidad
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4 text-white">Contacto</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2">
                <MapPin className="h-5 w-5 text-[#3b82f6] flex-shrink-0 mt-0.5" />
                <span className="text-sm text-white/70">Av. Principal 123, Ciudad, País</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-5 w-5 text-[#3b82f6] flex-shrink-0" />
                <span className="text-sm text-white/70">+1 234 567 890</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-5 w-5 text-[#3b82f6] flex-shrink-0" />
                <span className="text-sm text-white/70">info@nutripoint.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 text-center">
          <p className="text-sm text-white/50">© 2025 NutriPoint. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
