import React, { useState } from 'react';
import { DriveResource, UserProfile } from '../types';
import { 
  FolderGit2, 
  FileText, 
  FileSpreadsheet, 
  Presentation, 
  Folder, 
  Plus, 
  ExternalLink, 
  Search, 
  X,
  DownloadCloud
} from 'lucide-react';

interface DrivesSectionProps {
  resources: DriveResource[];
  onAddResource: (res: DriveResource) => void;
  currentUser: UserProfile | null;
  onOpenAuth: () => void;
}

export const DrivesSection: React.FC<DrivesSectionProps> = ({
  resources,
  onAddResource,
  currentUser,
  onOpenAuth,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');
  const [searchQuery, setSearchQuery] = useState('');

  // Form state
  const [title, setTitle] = useState('');
  const [driveUrl, setDriveUrl] = useState('');
  const [type, setType] = useState<DriveResource['type']>('docs');
  const [category, setCategory] = useState<DriveResource['category']>('Guías de Aprendizaje');
  const [description, setDescription] = useState('');
  const [author, setAuthor] = useState('');

  const handleCreateResource = (e: React.FormEvent) => {
    e.preventDefault();
    if (!driveUrl.trim() || !title.trim()) return;

    const newRes: DriveResource = {
      id: `drive-${Date.now()}`,
      title: title.trim(),
      description: description.trim(),
      driveUrl: driveUrl.trim(),
      type,
      category,
      author: author.trim() || currentUser?.name || 'Comunidad UE Paquisha',
      updatedAt: new Date().toISOString().split('T')[0],
      fileSize: 'Google Drive',
    };

    onAddResource(newRes);
    setTitle('');
    setDriveUrl('');
    setDescription('');
    setAuthor('');
    setIsModalOpen(false);
  };

  const getResourceIcon = (resType: DriveResource['type']) => {
    switch (resType) {
      case 'docs':
        return <FileText className="w-5 h-5 text-blue-600" />;
      case 'sheets':
        return <FileSpreadsheet className="w-5 h-5 text-emerald-600" />;
      case 'slides':
        return <Presentation className="w-5 h-5 text-amber-600" />;
      case 'folder':
        return <Folder className="w-5 h-5 text-indigo-600" />;
      default:
        return <FileText className="w-5 h-5 text-stone-600" />;
    }
  };

  const getTypeLabel = (resType: DriveResource['type']) => {
    switch (resType) {
      case 'docs':
        return 'Google Docs';
      case 'sheets':
        return 'Google Sheets';
      case 'slides':
        return 'Google Slides';
      case 'folder':
        return 'Carpeta Drive';
      default:
        return 'Archivo Drive';
    }
  };

  const filteredResources = resources.filter((res) => {
    const matchesCategory = selectedCategory === 'Todas' || res.category === selectedCategory;
    const matchesSearch =
      res.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories = ['Todas', 'Guías de Aprendizaje', 'Bitácoras y Registros', 'Proyectos Escolares', 'Normativas y Planes'];

  return (
    <section id="drives" className="py-12 sm:py-16 bg-stone-50/70 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-semibold mb-2">
              <FolderGit2 className="w-3.5 h-3.5 text-blue-600" />
              <span>Repositorio en la Nube de Google Drive</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight font-['Outfit']">
              Documentos y Carpetas de Google Drive
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-1">
              Accede y comparte manuales en PDF, hojas de cálculo de mediciones, presentaciones y carpetas del huerto.
            </p>
          </div>

          <button
            id="open-add-drive-modal-btn"
            onClick={() => {
              if (!currentUser) {
                onOpenAuth();
              } else {
                setAuthor(currentUser.name);
                setIsModalOpen(true);
              }
            }}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm transition shadow-sm self-start md:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Colocar Drive o Documento</span>
          </button>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-8 bg-white p-3 rounded-2xl border border-stone-200 shadow-2xs">
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                  selectedCategory === cat
                    ? 'bg-blue-50 text-blue-700 border border-blue-200 font-bold'
                    : 'text-stone-600 hover:bg-stone-100 border border-transparent'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Buscar en Drives..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredResources.map((res) => (
            <div
              key={res.id}
              id={`drive-card-${res.id}`}
              className="bg-white rounded-2xl border border-stone-200 p-5 flex flex-col justify-between shadow-2xs hover:shadow-md hover:border-blue-300 transition group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-stone-50 border border-stone-200 flex items-center justify-center group-hover:scale-105 transition">
                    {getResourceIcon(res.type)}
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-stone-100 text-stone-600">
                    {getTypeLabel(res.type)}
                  </span>
                </div>

                <span className="text-[11px] font-semibold text-blue-700 block mb-1">
                  {res.category}
                </span>

                <h3 className="font-bold text-stone-900 text-sm leading-snug line-clamp-2 mb-2 group-hover:text-blue-700 transition">
                  {res.title}
                </h3>

                <p className="text-xs text-stone-500 line-clamp-3 leading-relaxed mb-4">
                  {res.description}
                </p>
              </div>

              <div>
                <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-400 mb-3">
                  <span className="truncate max-w-[140px]">Por: {res.author}</span>
                  <span>{res.updatedAt}</span>
                </div>

                <a
                  href={res.driveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2 px-3 rounded-xl bg-stone-50 hover:bg-blue-50 border border-stone-200 hover:border-blue-200 text-stone-700 hover:text-blue-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition"
                >
                  <span>Abrir en Google Drive</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Add Drive Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/60 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden">
            <div className="bg-stone-50 border-b border-stone-200 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FolderGit2 className="w-5 h-5 text-blue-600" />
                <h3 className="font-bold text-stone-900 text-sm">Colocar Enlace de Google Drive</h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-200 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateResource} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Enlace de Google Drive (URL compartida) *
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://docs.google.com/... o https://drive.google.com/drive/folders/..."
                  value={driveUrl}
                  onChange={(e) => setDriveUrl(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                />
                <span className="text-[11px] text-stone-400">Asegúrate de que el archivo tenga permisos de lectura ("Cualquier persona con el enlace")</span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Título del Recurso *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Guía de Manejo de Semilleros en Plumafón"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Tipo de Drive</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-hidden bg-white"
                  >
                    <option value="docs">Google Docs (Documento)</option>
                    <option value="sheets">Google Sheets (Hoja de Cálculo)</option>
                    <option value="slides">Google Slides (Presentación)</option>
                    <option value="folder">Carpeta Compartida de Drive</option>
                    <option value="pdf">Archivo PDF en Drive</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Categoría</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-hidden bg-white"
                  >
                    <option value="Guías de Aprendizaje">Guías de Aprendizaje</option>
                    <option value="Bitácoras y Registros">Bitácoras y Registros</option>
                    <option value="Proyectos Escolares">Proyectos Escolares</option>
                    <option value="Normativas y Planes">Normativas y Planes</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Descripción del Contenido</label>
                <textarea
                  rows={2}
                  placeholder="Resumen de lo que encontrarán los estudiantes y docentes al abrir este archivo..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
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
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition"
                >
                  Vincular a la Plataforma
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </section>
  );
};
