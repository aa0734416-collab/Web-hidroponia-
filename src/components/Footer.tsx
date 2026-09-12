import React from 'react';
import { Sprout, MapPin, Mail, Phone, Heart, Award } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-stone-900 text-stone-300 pt-12 pb-8 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-stone-800">
          
          {/* Institutional Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-bold shadow-md shadow-emerald-600/30">
                <Sprout className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-extrabold text-white text-base tracking-tight font-['Outfit']">
                  UNIDAD EDUCATIVA PAQUISHA
                </h3>
                <p className="text-xs text-stone-400">Hidroponía Sostenible & Innovación Escolar</p>
              </div>
            </div>

            <p className="text-xs text-stone-400 leading-relaxed max-w-md">
              Proyecto de soberanía alimentaria, ciencia aplicada y preservación del agua en la parroquia rural <strong>La Bocana</strong>, cantón <strong>Piñas</strong>, provincia de El Oro, Ecuador. Fomentamos la agricultura del futuro mediante sistemas hidropónicos NFT, raíz flotante y energía solar fotovoltaica.
            </p>

            <div className="space-y-1.5 text-xs text-stone-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Parroquia La Bocana, Cantón Piñas, El Oro - Ecuador</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>contacto@paquisha.edu.ec / huerto@paquisha.edu.ec</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider font-['Outfit']">
              Módulos de la Plataforma
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button onClick={() => scrollTo('info')} className="hover:text-emerald-400 transition">
                  • Fundamentos y Calculadora de Sales
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('videos')} className="hover:text-emerald-400 transition">
                  • Videos y Tutoriales de YouTube
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('surveys')} className="hover:text-emerald-400 transition">
                  • Encuestas y Decisiones Comunitarias
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('drives')} className="hover:text-emerald-400 transition">
                  • Documentos y Carpetas de Google Drive
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('maps')} className="hover:text-emerald-400 transition">
                  • Ubicación en Google Maps & Campus
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('logs')} className="hover:text-emerald-400 transition">
                  • Bitácora Diaria de pH y EC
                </button>
              </li>
            </ul>
          </div>

          {/* Environmental & Educational Badges */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider font-['Outfit']">
              Compromisos Ecológicos
            </h4>
            <div className="space-y-2.5">
              <div className="p-3 rounded-xl bg-stone-800/80 border border-stone-700/60 text-xs">
                <span className="font-bold text-emerald-400 block mb-0.5">🌱 90% Ahorro de Agua</span>
                <p className="text-stone-400 text-[11px]">
                  El agua recircula de manera continua en circuito cerrado protegiendo los afluentes de Piñas.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-stone-800/80 border border-stone-700/60 text-xs">
                <span className="font-bold text-amber-400 block mb-0.5">☀️ Energía Renovable Escolar</span>
                <p className="text-stone-400 text-[11px]">
                  Bomba de agua impulsada con paneles solares sin emisiones de carbono.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-3">
          <p>
            © 2026 Unidad Educativa Paquisha · La Bocana, Cantón Piñas, Ecuador. Todos los derechos educativos reservados.
          </p>
          <div className="flex items-center gap-1 text-stone-400">
            <span>Potenciado por</span>
            <span className="font-bold text-emerald-400">Gemini 3.1 & BioPaquisha AI</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
