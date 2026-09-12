import React from 'react';
import { UserProfile } from '../types';
import { Droplet, Sun, Leaf, Users, ArrowRight, Camera, Sparkles, MapPin, CheckCircle2 } from 'lucide-react';

interface HeroBannerProps {
  currentUser: UserProfile | null;
  onOpenAuth: () => void;
  onOpenChat: () => void;
  onOpenDiagnosis: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  currentUser,
  onOpenAuth,
  onOpenChat,
  onOpenDiagnosis,
}) => {
  return (
    <section id="hero" className="relative pt-6 pb-12 sm:pb-16 bg-gradient-to-b from-emerald-50/70 via-stone-50 to-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Personalized Session Indicator if logged in */}
        {currentUser && (
          <div className="mb-6 p-4 rounded-2xl bg-white border border-emerald-200 shadow-xs flex flex-wrap items-center justify-between gap-3 animate-in fade-in">
            <div className="flex items-center gap-3">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-10 h-10 rounded-full object-cover ring-2 ring-emerald-500"
              />
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md capitalize">
                    {currentUser.role.replace('_', ' ')}
                  </span>
                  <span className="text-xs text-stone-500 hidden sm:inline">{currentUser.email}</span>
                </div>
                <h4 className="text-sm sm:text-base font-bold text-stone-900">
                  ¡Hola, {currentUser.name}! Tu sesión en la UE Paquisha está activa.
                </h4>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Votos y aportes sincronizados
              </span>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Main Text Content */}
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100/80 border border-emerald-300 text-emerald-900 text-xs font-semibold">
              <span className="flex h-2 w-2 rounded-full bg-emerald-600 animate-pulse"></span>
              <span>Proyecto Educativo de Ciencias y Sostenibilidad</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 tracking-tight leading-[1.15] font-['Outfit']">
              Hidroponía Sostenible en la <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-700">
                Unidad Educativa Paquisha
              </span>
            </h1>

            <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-2xl">
              Innovación agrícola escolar en la parroquia rural <strong>La Bocana</strong>, cantón <strong>Piñas</strong>, provincia de El Oro, Ecuador. Fomentamos soberanía alimentaria, ciencia aplicada y ahorro hídrico a través de sistemas NFT, raíz flotante y energía solar limpia.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-3 pt-2">
              <button
                id="hero-chat-cta"
                onClick={onOpenChat}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm shadow-md shadow-emerald-600/20 transition-all hover:scale-[1.02]"
              >
                <Sparkles className="w-4 h-4" />
                <span>Consultar con BioPaquisha AI</span>
              </button>

              <button
                id="hero-diag-cta"
                onClick={onOpenDiagnosis}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white hover:bg-stone-50 text-stone-800 border border-stone-300 font-semibold text-sm transition-all hover:scale-[1.02] shadow-2xs"
              >
                <Camera className="w-4 h-4 text-emerald-600" />
                <span>Diagnóstico Fotográfico</span>
              </button>

              {!currentUser && (
                <button
                  id="hero-login-cta"
                  onClick={onOpenAuth}
                  className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-semibold text-sm transition"
                >
                  <span>Iniciar con Google</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Geographic pills */}
            <div className="pt-2 flex flex-wrap items-center gap-2 text-xs text-stone-500 font-medium">
              <span className="inline-flex items-center gap-1 bg-stone-100 px-2.5 py-1 rounded-lg">
                <MapPin className="w-3.5 h-3.5 text-stone-500" />
                La Bocana, Cantón Piñas
              </span>
              <span className="inline-flex items-center gap-1 bg-stone-100 px-2.5 py-1 rounded-lg">
                ⛰️ 480 m.s.n.m. Clima Subtropical
              </span>
              <span className="inline-flex items-center gap-1 bg-stone-100 px-2.5 py-1 rounded-lg">
                💧 Cuenca del Río Piñas
              </span>
            </div>
          </div>

          {/* Metric Highlights Card */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200 shadow-xl shadow-stone-200/50 relative overflow-hidden">
              
              {/* Subtle accent corner */}
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-emerald-100/60 rounded-full blur-2xl pointer-events-none"></div>

              <div className="flex items-center justify-between pb-4 border-b border-stone-100">
                <div>
                  <h3 className="text-base font-bold text-stone-900 font-['Outfit']">Impacto del Huerto Escolar</h3>
                  <p className="text-xs text-stone-500">Métricas en tiempo real en la UE Paquisha</p>
                </div>
                <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Ciclo 2026
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-5">
                
                {/* Metric 1 */}
                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-100">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-700 mb-2">
                    <Droplet className="w-4 h-4" />
                  </div>
                  <div className="text-2xl font-black text-stone-900 font-['Outfit']">90%</div>
                  <div className="text-xs font-semibold text-stone-500">Ahorro de Agua</div>
                  <p className="text-[11px] text-stone-400 mt-1">Recirculación en circuito cerrado</p>
                </div>

                {/* Metric 2 */}
                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-100">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-700 mb-2">
                    <Leaf className="w-4 h-4" />
                  </div>
                  <div className="text-2xl font-black text-stone-900 font-['Outfit']">+650</div>
                  <div className="text-xs font-semibold text-stone-500">Plantas Vivas</div>
                  <p className="text-[11px] text-stone-400 mt-1">Lechugas, acelgas y albahaca</p>
                </div>

                {/* Metric 3 */}
                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-100">
                  <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center text-amber-700 mb-2">
                    <Sun className="w-4 h-4" />
                  </div>
                  <div className="text-2xl font-black text-stone-900 font-['Outfit']">100%</div>
                  <div className="text-xs font-semibold text-stone-500">Bomba Solar</div>
                  <p className="text-[11px] text-stone-400 mt-1">Energía fotovoltaica limpia</p>
                </div>

                {/* Metric 4 */}
                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-100">
                  <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center text-purple-700 mb-2">
                    <Users className="w-4 h-4" />
                  </div>
                  <div className="text-2xl font-black text-stone-900 font-['Outfit']">180+</div>
                  <div className="text-xs font-semibold text-stone-500">Estudiantes</div>
                  <p className="text-[11px] text-stone-400 mt-1">Participación activa en talleres</p>
                </div>

              </div>

              {/* Status footer inside card */}
              <div className="mt-5 p-3 rounded-xl bg-emerald-50/70 border border-emerald-200/60 flex items-center justify-between text-xs">
                <span className="text-emerald-900 font-medium">Estado del Invernadero Hoy:</span>
                <span className="font-bold text-emerald-700 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                  Circulación Activa (pH 5.9 · EC 1.6)
                </span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
