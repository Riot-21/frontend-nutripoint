import { Card, CardContent } from "@/components/ui/card";
import { Award, Heart, Target, Users } from "lucide-react";

export const AboutPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-linear-to-br from-[#1a1a1a] via-[#2d2d2d] to-[#1a1a1a] text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Sobre <span className="text-[#2563eb]">NutriPoint</span>
            </h1>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Somos una empresa dedicada a proporcionar suplementos deportivos
              de la más alta calidad para ayudarte a alcanzar tus objetivos
              fitness y de salud.
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Nuestra <span className="text-[#2563eb]">Misión</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-4">
                En NutriPoint, nuestra misión es proporcionar productos de
                nutrición deportiva de la más alta calidad que ayuden a nuestros
                clientes a alcanzar sus metas de fitness y bienestar.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Creemos que cada persona merece acceso a suplementos premium que
                sean seguros, efectivos y respaldados por la ciencia. Por eso,
                trabajamos solo con las mejores marcas y mantenemos los más
                altos estándares de calidad.
              </p>
            </div>
            <div className="relative aspect-square rounded-lg overflow-hidden">
              <img
                src="/fitness-gym-equipment-weights.jpg"
                alt="Nuestra Misión"
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="bg-muted py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Nuestros <span className="text-[#2563eb]">Valores</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="border-border/50">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-[#2563eb] rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">Calidad</h3>
                  <p className="text-muted-foreground text-sm">
                    Solo trabajamos con productos certificados y de las mejores
                    marcas del mercado
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border/50">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-[#dc2626] rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">Comunidad</h3>
                  <p className="text-muted-foreground text-sm">
                    Construimos una comunidad de personas comprometidas con su
                    salud y bienestar
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border/50">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-[#2563eb] rounded-full flex items-center justify-center mx-auto mb-4">
                    <Target className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">Resultados</h3>
                  <p className="text-muted-foreground text-sm">
                    Nos enfocamos en productos que realmente funcionan y
                    entregan resultados
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border/50">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-[#dc2626] rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">Pasión</h3>
                  <p className="text-muted-foreground text-sm">
                    Amamos lo que hacemos y nos apasiona ayudar a nuestros
                    clientes
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold text-[#2563eb] mb-2">
                10K+
              </div>
              <div className="text-muted-foreground">Clientes Satisfechos</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-[#dc2626] mb-2">
                500+
              </div>
              <div className="text-muted-foreground">Productos</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-[#2563eb] mb-2">
                5
              </div>
              <div className="text-muted-foreground">Años de Experiencia</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-[#dc2626] mb-2">
                98%
              </div>
              <div className="text-muted-foreground">Satisfacción</div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="bg-muted py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Nuestro <span className="text-[#2563eb]">Equipo</span>
            </h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              Un equipo de expertos en nutrición deportiva y fitness
              comprometidos con tu éxito
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="border-border/50">
                  <CardContent className="p-6 text-center">
                    <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden bg-muted">
                      <img
                        src={`/professional-person.png?height=128&width=128&query=professional person ${i}`}
                        alt={`Team Member ${i}`}
                        className="object-cover"
                      />
                    </div>
                    <h3 className="font-bold text-lg mb-1">
                      Miembro del Equipo {i}
                    </h3>
                    <p className="text-sm text-[#2563eb] mb-2">
                      Especialista en Nutrición
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Experto en suplementación deportiva con años de
                      experiencia
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};
