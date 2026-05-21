import { useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Button } from "@/components/ui/button";

export const AiChatPage = () => {
  const [peso, setPeso] = useState("");
  const [altura, setAltura] = useState("");
  const [edad, setEdad] = useState("");
  const [objetivo, setObjetivo] = useState("");
  const [respuesta, setRespuesta] = useState("");
  const [loading, setLoading] = useState(false);

  const eventSourceRef = useRef<EventSource | null>(null);

  const handleEnviar = () => {
    if (!peso || !altura || !edad || !objetivo) return;

    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      eventSourceRef.current = null;
    }

    setRespuesta("");
    setLoading(true);

    const mensaje = `
    Tengo ${edad} años, peso ${peso} kg, mido ${altura} cm.
    Mi objetivo es: ${objetivo}.
    Recomiéndame suplementos deportivos adecuados.
    `;

    const url = `http://localhost:8082/api/ai/preguntar?mensaje=${encodeURIComponent(
      mensaje,
    )}`;

    const es = new EventSource(url);
    eventSourceRef.current = es;

    es.onmessage = (event) => {
      setRespuesta((prev) => prev + event.data);
    };

    es.onerror = () => {
      es.close();
      eventSourceRef.current = null;
      setLoading(false);
    };
  };

  return (
    <div className="min-h-screen  text-white">
      {/* HERO */}
      <section className="bg-linear-to-br from-black via-[#1a1a1a] to-black py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Asesor IA de <span className="text-blue-500">Suplementos</span>
        </h1>
        <p className="text-gray-400 max-w-xl mx-auto">
          Ingresa tus datos y recibe recomendaciones personalizadas para mejorar
          tu rendimiento deportivo
        </p>
      </section>

      {/* CONTENIDO */}
      <section className="container mx-auto px-4 py-12 flex flex-col lg:flex-row gap-8">
        {/* FORMULARIO */}
        <div className="text-blue-950 p-6 rounded-xl w-full lg:w-1/3 shadow-lg">
          <h2 className="text-xl font-semibold mb-6">Tus datos</h2>

          <div className="space-y-4">
            <input
              type="number"
              placeholder="Peso (kg)"
              value={peso}
              onChange={(e) => setPeso(e.target.value)}
              className="w-full p-3 rounded-lg  border border-gray-700 focus:outline-none"
            />

            <input
              type="number"
              placeholder="Altura (cm)"
              value={altura}
              onChange={(e) => setAltura(e.target.value)}
              className="w-full p-3 rounded-lg  border border-gray-700 focus:outline-none"
            />

            <input
              type="number"
              placeholder="Edad"
              value={edad}
              onChange={(e) => setEdad(e.target.value)}
              className="w-full p-3 rounded-lg  border border-gray-700 focus:outline-none"
            />

            <select
              value={objetivo}
              onChange={(e) => setObjetivo(e.target.value)}
              className="w-full p-3 rounded-lg  border border-gray-700"
            >
              <option value="">Selecciona tu objetivo</option>
              <option value="ganar masa muscular">Ganar masa muscular</option>
              <option value="perder grasa">Perder grasa</option>
              <option value="mejorar resistencia">Mejorar resistencia</option>
              <option value="rendimiento deportivo">
                Rendimiento deportivo
              </option>
            </select>

            <Button
              onClick={handleEnviar}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              Obtener recomendación
            </Button>
          </div>
        </div>

        {/* RESPUESTA */}
        <div className="flex-1 p-6 rounded-xl shadow-lg flex flex-col">
          <h2 className="text-xl font-semibold mb-4 text-blue-900">
            Recomendación IA
          </h2>

          <div className="flex-1 overflow-y-auto">
            {loading && (
              <p className="text-gray-400 italic mb-4">
                Generando recomendación...
              </p>
            )}
            {!respuesta && (
              <p className="text-gray-400 italic mb-4">No hay respuesta</p>
            )}

            <div className="prose prose-invert max-w-none text-black">
              <ReactMarkdown>{respuesta}</ReactMarkdown>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
