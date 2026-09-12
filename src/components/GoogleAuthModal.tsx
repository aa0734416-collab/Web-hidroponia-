import React, { useState } from 'react';
import { UserProfile } from '../types';
import { DEMO_USERS } from '../data/initialData';
import { X, CheckCircle, ShieldCheck, Sparkles } from 'lucide-react';

interface GoogleAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile | null;
  onLogin: (user: UserProfile) => void;
  onLogout: () => void;
}

export const GoogleAuthModal: React.FC<GoogleAuthModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onLogin,
  onLogout,
}) => {
  const [customEmail, setCustomEmail] = useState('');
  const [customName, setCustomName] = useState('');
  const [customRole, setCustomRole] = useState<UserProfile['role']>('estudiante');
  const [isCustomMode, setIsCustomMode] = useState(false);

  if (!isOpen) return null;

  const handleCustomLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customEmail.trim() || !customName.trim()) return;

    const newUser: UserProfile = {
      id: `user-${Date.now()}`,
      name: customName.trim(),
      email: customEmail.trim(),
      avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(customName)}`,
      role: customRole,
      institution: 'Unidad Educativa Paquisha - La Bocana',
      joinedDate: new Date().toISOString().split('T')[0],
    };

    onLogin(newUser);
    onClose();
  };

  return (
    <div id="google-auth-modal-overlay" className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div 
        id="google-auth-modal-content"
        className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden"
      >
        {/* Header */}
        <div className="bg-stone-50 border-b border-stone-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
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
            <span className="font-semibold text-stone-800 text-sm tracking-tight">Acceso con Google</span>
          </div>
          <button
            id="close-google-modal-btn"
            onClick={onClose}
            className="p-1 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-200 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {currentUser ? (
            <div className="text-center space-y-4">
              <div className="relative mx-auto w-20 h-20 rounded-full overflow-hidden ring-4 ring-emerald-100 shadow-md">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-0 right-0 p-1 bg-emerald-600 rounded-full text-white">
                  <CheckCircle className="w-4 h-4" />
                </span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-stone-900">{currentUser.name}</h3>
                <p className="text-sm text-stone-500">{currentUser.email}</p>
                <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Rol: {currentUser.role.replace('_', ' ').toUpperCase()}
                </div>
              </div>

              <div className="bg-stone-50 rounded-xl p-3 text-left text-xs text-stone-600 space-y-1 border border-stone-100">
                <p><strong>Institución:</strong> {currentUser.institution}</p>
                {currentUser.grade && <p><strong>Nivel:</strong> {currentUser.grade}</p>}
                <p><strong>Sesión iniciada:</strong> Hoy</p>
              </div>

              <div className="pt-2 flex flex-col gap-2">
                <button
                  id="google-logout-btn"
                  onClick={() => {
                    onLogout();
                    onClose();
                  }}
                  className="w-full py-2.5 px-4 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 text-sm font-medium transition"
                >
                  Cerrar Sesión
                </button>
                <button
                  id="google-continue-btn"
                  onClick={onClose}
                  className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium transition shadow-sm"
                >
                  Continuar en la Plataforma
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-5">
              <div className="text-center">
                <h3 className="text-lg font-bold text-stone-900">Inicia sesión para tu espacio personal</h3>
                <p className="text-xs text-stone-500 mt-1">
                  Accede a la plataforma de Hidroponía de la <strong>UE Paquisha (La Bocana, Piñas)</strong> para registrar datos, votar en encuestas y ver todo tu progreso.
                </p>
              </div>

              {!isCustomMode ? (
                <>
                  <div className="space-y-2">
                    <p className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
                      Cuentas Rápidas de la Comunidad Educativa
                    </p>
                    <div className="space-y-2">
                      {DEMO_USERS.map((user) => (
                        <button
                          key={user.id}
                          id={`select-demo-user-${user.id}`}
                          onClick={() => {
                            onLogin(user);
                            onClose();
                          }}
                          className="w-full flex items-center gap-3 p-3 rounded-xl border border-stone-200 hover:border-emerald-500 hover:bg-emerald-50/50 transition text-left group"
                        >
                          <img
                            src={user.avatar}
                            alt={user.name}
                            className="w-10 h-10 rounded-full object-cover border border-stone-200 group-hover:ring-2 group-hover:ring-emerald-400"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-stone-800 truncate">{user.name}</p>
                            <p className="text-xs text-stone-500 truncate">{user.email}</p>
                          </div>
                          <span className="text-[11px] px-2 py-0.5 rounded-md bg-stone-100 text-stone-600 font-medium capitalize">
                            {user.role.replace('_', ' ')}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="relative flex py-1 items-center">
                    <div className="flex-grow border-t border-stone-200"></div>
                    <span className="shrink-0 mx-3 text-stone-400 text-xs uppercase tracking-wider">O ingresa otra cuenta</span>
                    <div className="flex-grow border-t border-stone-200"></div>
                  </div>

                  <button
                    id="switch-custom-login-btn"
                    onClick={() => setIsCustomMode(true)}
                    className="w-full py-2.5 px-4 rounded-xl border border-stone-300 hover:bg-stone-50 text-stone-700 text-sm font-medium flex items-center justify-center gap-2 transition"
                  >
                    <Sparkles className="w-4 h-4 text-emerald-600" />
                    Ingresar con mi cuenta de Google personalizada
                  </button>
                </>
              ) : (
                <form onSubmit={handleCustomLogin} className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">Nombre Completo</label>
                    <input
                      type="text"
                      required
                      placeholder="Ej. Juan Pérez Cabrera"
                      value={customName}
                      onChange={(e) => setCustomName(e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">Correo Electrónico de Google</label>
                    <input
                      type="email"
                      required
                      placeholder="ejemplo@gmail.com"
                      value={customEmail}
                      onChange={(e) => setCustomEmail(e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">Rol en la Comunidad</label>
                    <select
                      value={customRole}
                      onChange={(e) => setCustomRole(e.target.value as any)}
                      className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-hidden bg-white"
                    >
                      <option value="estudiante">Estudiante UE Paquisha</option>
                      <option value="docente">Docente / Coordinador</option>
                      <option value="padre_familia">Padre de Familia / Representante</option>
                      <option value="directivo">Directivo del Plantel</option>
                      <option value="comunidad">Comunidad de La Bocana / Piñas</option>
                    </select>
                  </div>

                  <div className="pt-2 flex gap-2">
                    <button
                      type="button"
                      onClick={() => setIsCustomMode(false)}
                      className="flex-1 py-2 px-3 rounded-lg border border-stone-200 text-stone-600 text-xs font-medium hover:bg-stone-50"
                    >
                      Volver
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-medium transition shadow-xs"
                    >
                      Acceder con Google
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
