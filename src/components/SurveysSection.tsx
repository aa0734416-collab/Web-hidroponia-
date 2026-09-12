import React, { useState } from 'react';
import { Survey, UserProfile } from '../types';
import { Vote, Plus, CheckCircle2, Users, X, Trash2, BarChart2 } from 'lucide-react';

interface SurveysSectionProps {
  surveys: Survey[];
  onVote: (surveyId: string, optionId: string) => void;
  onCreateSurvey: (newSurvey: Survey) => void;
  currentUser: UserProfile | null;
  onOpenAuth: () => void;
}

export const SurveysSection: React.FC<SurveysSectionProps> = ({
  surveys,
  onVote,
  onCreateSurvey,
  currentUser,
  onOpenAuth,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [targetAudience, setTargetAudience] = useState<Survey['targetAudience']>('Todos');
  const [options, setOptions] = useState<string[]>(['', '']);

  const handleAddOptionField = () => {
    if (options.length < 6) {
      setOptions([...options, '']);
    }
  };

  const handleRemoveOptionField = (index: number) => {
    if (options.length > 2) {
      setOptions(options.filter((_, idx) => idx !== index));
    }
  };

  const handleOptionChange = (text: string, index: number) => {
    const updated = [...options];
    updated[index] = text;
    setOptions(updated);
  };

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validOptions = options.map((opt) => opt.trim()).filter((opt) => opt.length > 0);
    if (validOptions.length < 2) {
      alert('Debes incluir al menos dos opciones para la encuesta.');
      return;
    }

    const created: Survey = {
      id: `surv-${Date.now()}`,
      title: newTitle.trim(),
      description: newDescription.trim(),
      targetAudience,
      totalVotes: 0,
      createdAt: new Date().toISOString().split('T')[0],
      createdBy: currentUser?.name || 'Comité Ambiental Paquisha',
      status: 'activa',
      options: validOptions.map((text, idx) => ({
        id: `opt-${Date.now()}-${idx}`,
        text,
        votes: 0,
      })),
    };

    onCreateSurvey(created);
    setNewTitle('');
    setNewDescription('');
    setOptions(['', '']);
    setIsModalOpen(false);
  };

  return (
    <section id="surveys" className="py-12 sm:py-16 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold mb-2">
              <Vote className="w-3.5 h-3.5 text-emerald-600" />
              <span>Participación y Democracia Escolar</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight font-['Outfit']">
              Encuestas y Consultas Comunitarias
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-1">
              Opina y vota en tiempo real sobre las decisiones, nuevos cultivos y capacitaciones de la UE Paquisha.
            </p>
          </div>

          <button
            id="open-create-survey-modal-btn"
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
            <span>Poner Nueva Encuesta</span>
          </button>
        </div>

        {/* Survey Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {surveys.map((survey) => {
            const hasVoted = Boolean(survey.userVotedOptionId);

            return (
              <div
                key={survey.id}
                id={`survey-card-${survey.id}`}
                className="bg-stone-50/50 rounded-2xl border border-stone-200 p-5 sm:p-6 flex flex-col justify-between shadow-2xs hover:border-emerald-300 transition"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-white border border-stone-200 text-stone-600">
                      Audiencia: {survey.targetAudience}
                    </span>
                    <span className="text-[11px] text-stone-400 font-medium">
                      {survey.totalVotes} {survey.totalVotes === 1 ? 'voto' : 'votos'}
                    </span>
                  </div>

                  <h3 className="font-bold text-stone-900 text-base leading-snug mb-1.5 font-['Outfit']">
                    {survey.title}
                  </h3>
                  <p className="text-xs text-stone-500 mb-4 leading-relaxed">
                    {survey.description}
                  </p>

                  {/* Options List */}
                  <div className="space-y-2.5 mb-4">
                    {survey.options.map((option) => {
                      const percentage =
                        survey.totalVotes > 0
                          ? Math.round((option.votes / survey.totalVotes) * 100)
                          : 0;
                      const isSelected = survey.userVotedOptionId === option.id;

                      return (
                        <div
                          key={option.id}
                          id={`survey-opt-${option.id}`}
                          onClick={() => onVote(survey.id, option.id)}
                          className={`relative overflow-hidden p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                            isSelected
                              ? 'border-emerald-600 bg-emerald-50/80 font-bold'
                              : 'border-stone-200 bg-white hover:border-emerald-400 hover:bg-stone-50'
                          }`}
                        >
                          {/* Progress fill bar */}
                          <div
                            className={`absolute top-0 bottom-0 left-0 transition-all duration-500 ${
                              isSelected ? 'bg-emerald-200/50' : 'bg-stone-100'
                            }`}
                            style={{ width: `${percentage}%` }}
                          ></div>

                          <div className="relative z-10 flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <span
                                className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] border ${
                                  isSelected
                                    ? 'bg-emerald-600 border-emerald-600 text-white font-bold'
                                    : 'border-stone-300 bg-white'
                                }`}
                              >
                                {isSelected && '✓'}
                              </span>
                              <span className="text-stone-800">{option.text}</span>
                            </div>
                            <span className="font-bold text-stone-600 shrink-0">
                              {percentage}%
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-3 border-t border-stone-200 flex items-center justify-between text-[11px] text-stone-400">
                  <span>Por: {survey.createdBy}</span>
                  {hasVoted ? (
                    <span className="text-emerald-700 font-semibold inline-flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      Tu voto está registrado
                    </span>
                  ) : (
                    <span className="text-stone-500">Haz clic en una opción para votar</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Create Survey Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/60 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden">
            <div className="bg-stone-50 border-b border-stone-200 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BarChart2 className="w-5 h-5 text-emerald-600" />
                <h3 className="font-bold text-stone-900 text-sm">Poner Nueva Encuesta Escolar</h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-200 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Pregunta o Título de la Encuesta *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej. ¿Qué nuevo vegetal te gustaría incorporar al huerto hidropónico?"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Contexto o Descripción *
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="Explica brevemente el motivo para que los estudiantes y familias puedan votar con criterio..."
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                ></textarea>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Público Objetivo</label>
                <select
                  value={targetAudience}
                  onChange={(e) => setTargetAudience(e.target.value as any)}
                  className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-hidden bg-white"
                >
                  <option value="Todos">Toda la Comunidad (Estudiantes, Docentes y Familias)</option>
                  <option value="Estudiantes">Solo Estudiantes</option>
                  <option value="Docentes">Solo Docentes y Personal Educativo</option>
                  <option value="Comunidad General">Padres y Productores de La Bocana</option>
                </select>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-semibold text-stone-700">
                    Opciones de Respuesta (Mínimo 2, Máximo 6) *
                  </label>
                  {options.length < 6 && (
                    <button
                      type="button"
                      onClick={handleAddOptionField}
                      className="text-emerald-700 hover:text-emerald-800 text-xs font-semibold inline-flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Añadir Opción
                    </button>
                  )}
                </div>

                <div className="space-y-2">
                  {options.map((opt, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="text-xs font-bold text-stone-400 w-4">{idx + 1}.</span>
                      <input
                        type="text"
                        required
                        placeholder={`Opción ${idx + 1}`}
                        value={opt}
                        onChange={(e) => handleOptionChange(e.target.value, idx)}
                        className="flex-1 px-3 py-1.5 text-xs border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                      />
                      {options.length > 2 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveOptionField(idx)}
                          className="p-1.5 text-stone-400 hover:text-red-600 transition"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
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
                  Publicar Encuesta
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </section>
  );
};
