import React, { useState } from 'react';
import { 
  MapPin, 
  Compass, 
  ExternalLink, 
  ThermometerSun, 
  Droplet, 
  Mountain, 
  Layers, 
  Edit3, 
  Check, 
  X,
  Building2
} from 'lucide-react';

export const MapsSection: React.FC = () => {
  // Default embed for La Bocana, Piñas, El Oro, Ecuador
  const defaultEmbed = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31846.541785501865!2d-79.79979258288574!3d-3.7088924976771123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x90333d7b4b3b19eb%3A0x6b107e3a9c9f2b1d!2sLa%20Bocana%2C%20Ecuador!5e0!3m2!1ses!2sec!4v1710000000000!5m2!1ses!2sec';

  const [mapEmbedUrl, setMapEmbedUrl] = useState<string>(() => {
    return localStorage.getItem('paquisha_maps_url') || defaultEmbed;
  });

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [tempEmbedUrl, setTempEmbedUrl] = useState(mapEmbedUrl);
  const [activeZone, setActiveZone] = useState<string>('invernadero');

  const handleSaveMap = (e: React.FormEvent) => {
    e.preventDefault();
    setMapEmbedUrl(tempEmbedUrl);
    localStorage.setItem('paquisha_maps_url', tempEmbedUrl);
    setIsEditModalOpen(false);
  };

  const schoolZones = [
    {
      id: 'invernadero',
      title: 'Invernadero Principal NFT',
      tag: 'Producción de Follaje',
      desc: 'Bancales con pendiente del 1.5% y tubos sanitarios de PVC de 3" perforados cada 20 cm. Diseñado para lechuga crespa, acelga y espinaca.',
      metrics: '450 plantas activas · Caudal 1.8 L/min',
    },
    {
      id: 'raiz-flotante',
      title: 'Estanques de Raíz Flotante (DWC)',
      tag: 'Semilleros y Aromáticas',
      desc: 'Dos piletas de madera impermeabilizadas con geomembrana de polietileno de 500 micras. Planchas de plumafón de 1" con canastillas para albahaca y apio.',
      metrics: '200 plántulas en germinación · Oxigenación continua',
    },
    {
      id: 'bombeo-solar',
      title: 'Estación de Bombeo Solar',
      tag: 'Energía Fotovoltaica',
      desc: 'Módulo solar monocristalino de 150W conectado a un regulador de carga y batería AGM de 12V 45Ah que abastece la bomba sumergible sin gasto de red.',
      metrics: '0 emisión CO2 · Funcionamiento diurno ininterrumpido',
    },
    {
      id: 'laboratorio',
      title: 'Laboratorio de Monitoreo de Agua',
      tag: 'Ciencia y Calidad',
      desc: 'Área equipada con medidores combo Hanna de pH y EC, soluciones buffer de calibración 4.01 y 6.86, sales de La Molina y balanza de precisión.',
      metrics: 'Controles diarios 08:30 AM y 03:00 PM',
    },
  ];

  return (
    <section id="maps" className="py-12 sm:py-16 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold mb-2">
              <MapPin className="w-3.5 h-3.5 text-emerald-600" />
              <span>Geolocalización & Entorno Natural</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight font-['Outfit']">
              Ubicación en Google Maps y Campus Escolar
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-1">
              Unidad Educativa Paquisha, Parroquia Rural La Bocana, Cantón Piñas, Provincia de El Oro, Ecuador.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="edit-map-url-btn"
              onClick={() => {
                setTempEmbedUrl(mapEmbedUrl);
                setIsEditModalOpen(true);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-stone-200 hover:bg-stone-50 text-stone-700 text-xs font-semibold transition"
            >
              <Edit3 className="w-3.5 h-3.5 text-stone-500" />
              <span>Editar Mapa</span>
            </button>
            <a
              href="https://maps.google.com/?q=La+Bocana,+Pinas,+Ecuador"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold transition"
            >
              <span>Abrir en Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Geographic Summary Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200">
            <div className="flex items-center gap-2 text-stone-500 text-xs mb-1">
              <Compass className="w-4 h-4 text-emerald-600" />
              <span className="font-semibold">Parroquia</span>
            </div>
            <div className="font-bold text-stone-900 text-sm">La Bocana</div>
            <div className="text-[11px] text-stone-400">Cantón Piñas, El Oro</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200">
            <div className="flex items-center gap-2 text-stone-500 text-xs mb-1">
              <Mountain className="w-4 h-4 text-blue-600" />
              <span className="font-semibold">Altitud</span>
            </div>
            <div className="font-bold text-stone-900 text-sm">~480 m.s.n.m.</div>
            <div className="text-[11px] text-stone-400">Piso subtropical cálido-templado</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200">
            <div className="flex items-center gap-2 text-stone-500 text-xs mb-1">
              <ThermometerSun className="w-4 h-4 text-amber-600" />
              <span className="font-semibold">Temperatura</span>
            </div>
            <div className="font-bold text-stone-900 text-sm">22°C - 26°C</div>
            <div className="text-[11px] text-stone-400">Ideal para lechuga y hortalizas</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200">
            <div className="flex items-center gap-2 text-stone-500 text-xs mb-1">
              <Droplet className="w-4 h-4 text-cyan-600" />
              <span className="font-semibold">Fuente Hídrica</span>
            </div>
            <div className="font-bold text-stone-900 text-sm">Cuenca Río Piñas</div>
            <div className="text-[11px] text-stone-400">Filtrado en arena y decantación</div>
          </div>
        </div>

        {/* Map and Campus Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Google Maps Container */}
          <div className="lg:col-span-7 bg-stone-100 rounded-3xl overflow-hidden border border-stone-200 shadow-xs flex flex-col">
            <div className="p-3 bg-stone-50 border-b border-stone-200 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 font-semibold text-stone-800">
                <Building2 className="w-4 h-4 text-emerald-600" />
                <span>Unidad Educativa Paquisha · La Bocana</span>
              </div>
              <span className="text-[11px] text-stone-500">Google Maps Interactivo</span>
            </div>
            <div className="w-full h-80 sm:h-96 relative">
              <iframe
                title="Google Maps La Bocana Pinas UE Paquisha"
                src={mapEmbedUrl}
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          {/* School Campus Zones Details */}
          <div className="lg:col-span-5 space-y-3">
            <div className="mb-2">
              <h3 className="font-bold text-base text-stone-900 font-['Outfit']">
                Zonas del Proyecto Hidropónico en el Colegio
              </h3>
              <p className="text-xs text-stone-500">
                Haz clic en cada estación para conocer los componentes físicos implementados.
              </p>
            </div>

            <div className="space-y-2.5">
              {schoolZones.map((zone) => {
                const isSelected = activeZone === zone.id;
                return (
                  <div
                    key={zone.id}
                    onClick={() => setActiveZone(zone.id)}
                    className={`p-4 rounded-2xl border text-xs cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-emerald-50/80 border-emerald-500 shadow-2xs'
                        : 'bg-stone-50/50 border-stone-200 hover:border-emerald-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-bold text-stone-900 text-sm">{zone.title}</h4>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-white border border-stone-200 text-emerald-800">
                        {zone.tag}
                      </span>
                    </div>
                    <p className="text-stone-600 leading-relaxed mb-2">
                      {zone.desc}
                    </p>
                    <div className="text-[11px] font-semibold text-emerald-700">
                      ⚡ {zone.metrics}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>

      {/* Edit Map Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/60 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden">
            <div className="bg-stone-50 border-b border-stone-200 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-emerald-600" />
                <h3 className="font-bold text-stone-900 text-sm">Configurar Enlace de Google Maps</h3>
              </div>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="p-1 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-200 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveMap} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  URL de Inserción (iframe src) de Google Maps *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Pega aquí el enlace de inserción de Google Maps (https://www.google.com/maps/embed?...)"
                  value={tempEmbedUrl}
                  onChange={(e) => setTempEmbedUrl(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-hidden font-mono"
                ></textarea>
                <p className="text-[11px] text-stone-500 mt-1">
                  En Google Maps: Compartir → Insertar un mapa → Copia el atributo <code>src="..."</code> del iframe.
                </p>
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setTempEmbedUrl(defaultEmbed)}
                  className="text-xs text-stone-500 hover:text-stone-800 underline"
                >
                  Restaurar mapa de La Bocana por defecto
                </button>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setIsEditModalOpen(false)}
                    className="px-4 py-2 rounded-xl border border-stone-200 text-stone-600 text-xs font-medium hover:bg-stone-50"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs transition"
                  >
                    Guardar Mapa
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

    </section>
  );
};
