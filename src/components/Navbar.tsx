import React from 'react';
import { UserProfile } from '../types';
import { Sprout, LogIn, Sparkles, Camera, MapPin } from 'lucide-react';

interface NavbarProps {
  currentUser: UserProfile | null;
  onOpenAuth: () => void;
  onOpenDiagnosis: () => void;
  onOpenChat: () => void;
  activeSection: string;
  setActiveSection: (sec: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentUser,
  onOpenAuth,
  onOpenDiagnosis,
  onOpenChat,
  activeSection,
  setActiveSection,
}) => {
  const navItems = [
    { id: 'info', label: 'Conocimiento' },
    { id: 'videos', label: 'Videos YouTube' },
    { id: 'surveys', label: 'Encuestas' },
    { id: 'drives', label: 'Google Drives' },
    { id: 'maps', label: 'Ubicación & Campus' },
    { id: 'logs', label: 'Bitácora' },
  ];

  const scrollTo = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Brand */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollTo('hero')}>
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 flex items-center justify-center text-white shadow-md shadow-emerald-600/20 ring-2 ring-emerald-400/30">
              <Sprout className="w-6 h-6 sm:w-7 sm:h-7" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-stone-900 text-base sm:text-lg tracking-tight font-['Outfit']">
                  UE PAQUISHA
                </span>
                <span className="hidden md:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-800">
                  <MapPin className="w-3 h-3 text-emerald-600" />
                  La Bocana · Piñas
                </span>
              </div>
              <p className="text-xs text-stone-500 font-medium">Hidroponía Sostenible Escolar</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 bg-stone-100/80 p-1 rounded-xl border border-stone-200/80">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => scrollTo(item.id)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-white text-emerald-800 shadow-xs'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/50'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Action Buttons & Auth */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Plant Diagnosis Quick Button */}
            <button
              id="nav-diagnosis-btn"
              onClick={onOpenDiagnosis}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-amber-50 text-amber-900 border border-amber-200 hover:bg-amber-100 transition shadow-2xs"
              title="Analizar salud de planta con Gemini"
            >
              <Camera className="w-3.5 h-3.5 text-amber-600" />
              <span>Diagnosticar Hoja</span>
            </button>

            {/* AI Assistant Quick Button */}
            <button
              id="nav-chat-btn"
              onClick={onOpenChat}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 transition shadow-2xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span className="hidden sm:inline">BioPaquisha AI</span>
              <span className="sm:hidden">IA</span>
            </button>

            {/* Google User Profile Button */}
            {currentUser ? (
              <button
                id="nav-user-profile-btn"
                onClick={onOpenAuth}
                className="flex items-center gap-2 pl-2 pr-3 py-1 rounded-xl border border-stone-200 bg-white hover:border-emerald-400 hover:bg-stone-50 transition shadow-2xs"
              >
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-7 h-7 rounded-full object-cover ring-1 ring-emerald-500"
                />
                <div className="text-left hidden md:block">
                  <p className="text-xs font-bold text-stone-800 truncate max-w-[110px] leading-tight">
                    {currentUser.name.split(' ')[0]}
                  </p>
                  <p className="text-[10px] text-emerald-700 font-medium capitalize leading-tight">
                    {currentUser.role.replace('_', ' ')}
                  </p>
                </div>
              </button>
            ) : (
              <button
                id="nav-login-btn"
                onClick={onOpenAuth}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold transition shadow-sm"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17Z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.24v3.15C3.26 21.36 7.33 24 12 24Z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.24C.45 8.15 0 9.94 0 12s.45 3.85 1.24 5.42l4.04-3.15Z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.24 6.58l4.04 3.15c.95-2.83 3.6-4.98 6.72-4.98Z"
                  />
                </svg>
                <span className="hidden sm:inline">Ingresar con Google</span>
                <span className="sm:hidden">Ingresar</span>
              </button>
            )}
          </div>
        </div>

        {/* Mobile secondary nav strip */}
        <div className="lg:hidden flex overflow-x-auto py-2 border-t border-stone-100 gap-2 no-scrollbar text-xs">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`whitespace-nowrap px-3 py-1 rounded-full font-medium ${
                activeSection === item.id
                  ? 'bg-emerald-700 text-white'
                  : 'bg-stone-100 text-stone-600'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};
