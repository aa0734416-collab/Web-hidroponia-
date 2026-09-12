import React, { useState } from 'react';
import { HydroponicLog, UserProfile } from '../types';
import { ClipboardList, Plus, AlertCircle, CheckCircle2, Thermometer, Droplet, Sparkles, X } from 'lucide-react';

interface LogsSectionProps {
  logs: HydroponicLog[];
  onAddLog: (log: HydroponicLog) => void;
  currentUser: UserProfile | null;
  onOpenAuth: () => void;
}

export const LogsSection: React.FC<LogsSectionProps> = ({
  logs,
  onAddLog,
  currentUser,
  onOpenAuth,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [system, setSystem] = useState<HydroponicLog['system']>('NFT Tubos PVC');
  const [ph, setPh] = useState<number>(6.0);
  const [ec, setEc] = useState<number>(1.6);
  const [waterTemp, setWaterTemp] = useState<number>(22.0);
  const [ambientTemp, setAmbientTemp] = useState<number>(24.0);
  const [notes, setNotes] = useState<string>('');

  const calculateStatus = (phVal: number, ecVal: number): HydroponicLog['status'] => {
    if (phVal < 5.4 || phVal > 6.6) return 'Alerta pH';
    if (ecVal < 1.1 || ecVal > 2.2) return 'Alerta EC';
    return 'Óptimo';
  };

  const handleCreateLog = (e: React.FormEvent) => {
    e.preventDefault();
    const status = calculateStatus(ph, ec);
    const now = new Date();

    const newLog: HydroponicLog = {
      id: `log-${Date.now()}`,
      date: now.toISOString().split('T')[0],
      time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      system,
      ph,
      ec,
      waterTemp,
      ambientTemp,
      author: currentUser?.name || 'Estudiante Paquisha',
      status,
      notes: notes.trim() || 'Medición de rutina en el huerto escolar.',
    };

    onAddLog(newLog);
    setNotes('');
    setIsModalOpen(false);
  };

  return (
    <section id="logs" className="py-12 sm:py-16 bg-stone-50/70 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/80 border border-emerald-200 text-emerald-800 text-xs font-semibold mb-2">
              <ClipboardList className="w-3.5 h-3.5 text-emerald-600" />
              <span>Monitoreo y Bitácora Escolar</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight font-['Outfit']">
              Bitácora de pH, Conductividad y Temperatura
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-1">
              Registro continuo del agua y nutrientes en los sistemas de la Unidad Educativa Paquisha.
            </p>
          </div>

          <button
            id="open-add-log-modal-btn"
            onClick={() => {
              if (!currentUser) {
                onOpenAuth();
              } else {
                setIsModalOpen(true);
              }
            }}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm transition shadow-sm self-start md:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Registrar Nueva Medición</span>
          </button>
        </div>

        {/* Logs Table / Cards */}
        <div className="bg-white rounded-2xl border border-stone-200 shadow-2xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-stone-600">
              <thead className="bg-stone-50 border-b border-stone-200 text-[11px] font-bold text-stone-700 uppercase tracking-wider">
                <tr>
                  <th className="py-3.5 px-4">Fecha / Hora</th>
                  <th className="py-3.5 px-4">Sistema</th>
                  <th className="py-3.5 px-4 text-center">pH</th>
                  <th className="py-3.5 px-4 text-center">EC (mS/cm)</th>
                  <th className="py-3.5 px-4 text-center">Temp. Agua</th>
                  <th className="py-3.5 px-4 text-center">Estado</th>
                  <th className="py-3.5 px-4">Registrado por</th>
                  <th className="py-3.5 px-4">Observaciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 font-medium">
                {logs.map((log) => (
                  <tr key={log.id} className="hover:bg-stone-50/80 transition">
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="font-bold text-stone-800">{log.date}</div>
                      <div className="text-[10px] text-stone-400">{log.time}</div>
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="font-semibold text-stone-800 bg-stone-100 px-2 py-0.5 rounded-md">
                        {log.system}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-center whitespace-nowrap">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-md font-extrabold ${
                          log.ph >= 5.5 && log.ph <= 6.5
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {log.ph.toFixed(1)}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-center whitespace-nowrap">
                      <span className="font-bold text-stone-800 bg-blue-50 text-blue-800 px-2 py-0.5 rounded-md">
                        {log.ec.toFixed(1)}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-center whitespace-nowrap">
                      <span className="text-stone-700">{log.waterTemp}°C</span>
                    </td>
                    <td className="py-3.5 px-4 text-center whitespace-nowrap">
                      {log.status === 'Óptimo' ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3" />
                          Óptimo
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                          <AlertCircle className="w-3 h-3" />
                          {log.status}
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap text-stone-700 font-semibold">
                      {log.author}
                    </td>
                    <td className="py-3.5 px-4 text-stone-500 max-w-xs truncate" title={log.notes}>
                      {log.notes}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* Add Log Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/60 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden">
            <div className="bg-stone-50 border-b border-stone-200 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ClipboardList className="w-5 h-5 text-emerald-600" />
                <h3 className="font-bold text-stone-900 text-sm">Registrar Lectura en Bitácora</h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-200 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateLog} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Módulo o Sistema *</label>
                <select
                  value={system}
                  onChange={(e) => setSystem(e.target.value as any)}
                  className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-hidden bg-white"
                >
                  <option value="NFT Tubos PVC">NFT Tubos PVC (Invernadero Principal)</option>
                  <option value="Raíz Flotante">Raíz Flotante (Planchas Plumafón)</option>
                  <option value="Sustratos Inertes">Sustratos Inertes (Cascarilla / Macetas)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    pH Medido (5.0 - 8.0) *
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="3.0"
                    max="10.0"
                    required
                    value={ph}
                    onChange={(e) => setPh(parseFloat(e.target.value))}
                    className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-hidden font-bold"
                  />
                  <span className="text-[10px] text-stone-400">Rango ideal: 5.5 a 6.5</span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Conductividad EC (mS/cm) *
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="0.2"
                    max="4.0"
                    required
                    value={ec}
                    onChange={(e) => setEc(parseFloat(e.target.value))}
                    className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-hidden font-bold"
                  />
                  <span className="text-[10px] text-stone-400">Rango escolar: 1.2 a 2.0</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Temp. Agua (°C)</label>
                  <input
                    type="number"
                    step="0.5"
                    value={waterTemp}
                    onChange={(e) => setWaterTemp(parseFloat(e.target.value))}
                    className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Temp. Ambiente (°C)</label>
                  <input
                    type="number"
                    step="0.5"
                    value={ambientTemp}
                    onChange={(e) => setAmbientTemp(parseFloat(e.target.value))}
                    className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Observaciones / Acciones Realizadas</label>
                <textarea
                  rows={2}
                  placeholder="Ej. Se rellenaron 20L de agua, se añadieron 5ml de ácido cítrico, raíces blancas y vigorosas..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                ></textarea>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-stone-200 text-stone-600 text-xs font-medium hover:bg-stone-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs transition"
                >
                  Guardar en Bitácora
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </section>
  );
};
