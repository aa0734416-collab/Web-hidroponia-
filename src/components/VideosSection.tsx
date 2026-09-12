import React, { useState } from 'react';
import { YouTubeVideo, UserProfile } from '../types';
import { Youtube, Plus, Search, Play, X, Filter, ExternalLink, Trash2 } from 'lucide-react';

interface VideosSectionProps {
  videos: YouTubeVideo[];
  onAddVideo: (video: YouTubeVideo) => void;
  onDeleteVideo?: (id: string) => void;
  currentUser: UserProfile | null;
  onOpenAuth: () => void;
}

export const VideosSection: React.FC<VideosSectionProps> = ({
  videos,
  onAddVideo,
  onDeleteVideo,
  currentUser,
  onOpenAuth,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<YouTubeVideo | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');

  // Form State
  const [videoUrl, setVideoUrl] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<YouTubeVideo['category']>('Proyecto Paquisha');
  const [author, setAuthor] = useState('');

  // Extract YouTube ID helper
  const extractYouTubeId = (url: string): string | null => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const handleCreateVideo = (e: React.FormEvent) => {
    e.preventDefault();
    const ytId = extractYouTubeId(videoUrl);
    if (!ytId) {
      alert('Por favor introduce un enlace de YouTube válido (ej. https://www.youtube.com/watch?v=...)');
      return;
    }

    const newVid: YouTubeVideo = {
      id: `vid-${Date.now()}`,
      title: title.trim(),
      description: description.trim(),
      youtubeUrl: videoUrl.trim(),
      youtubeId: ytId,
      category,
      author: author.trim() || currentUser?.name || 'Estudiante UE Paquisha',
      addedAt: new Date().toISOString().split('T')[0],
      views: 1,
    };

    onAddVideo(newVid);
    setVideoUrl('');
    setTitle('');
    setDescription('');
    setAuthor('');
    setIsModalOpen(false);
  };

  const filteredVideos = videos.filter((v) => {
    const matchesCategory = selectedCategory === 'Todas' || v.category === selectedCategory;
    const matchesSearch =
      v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories = ['Todas', 'Proyecto Paquisha', 'Sistemas NFT', 'Raíz Flotante', 'Nutrición y pH', 'Automatización'];

  return (
    <section id="videos" className="py-12 sm:py-16 bg-stone-50/70 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100/80 border border-red-200 text-red-800 text-xs font-semibold mb-2">
              <Youtube className="w-3.5 h-3.5 text-red-600" />
              <span>Videoteca Multimedia de YouTube</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight font-['Outfit']">
              Videos y Tutoriales de Hidroponía
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-1">
              Colección audiovisual de experiencias, armado de bancales y capacitaciones en la UE Paquisha.
            </p>
          </div>

          <button
            id="open-add-video-modal-btn"
            onClick={() => {
              if (!currentUser) {
                onOpenAuth();
              } else {
                setAuthor(currentUser.name);
                setIsModalOpen(true);
              }
            }}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold text-xs sm:text-sm transition shadow-sm self-start md:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Colocar Video de YouTube</span>
          </button>
        </div>

        {/* Filters and Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-8 bg-white p-3 rounded-2xl border border-stone-200 shadow-2xs">
          
          {/* Category Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                  selectedCategory === cat
                    ? 'bg-red-50 text-red-700 border border-red-200 font-bold'
                    : 'text-stone-600 hover:bg-stone-100 border border-transparent'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Buscar videos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-red-400"
            />
          </div>
        </div>

        {/* Video Grid */}
        {filteredVideos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredVideos.map((video) => (
              <div
                key={video.id}
                id={`video-card-${video.id}`}
                className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col group"
              >
                {/* Thumbnail / Play Trigger */}
                <div 
                  className="relative aspect-video bg-stone-900 cursor-pointer overflow-hidden"
                  onClick={() => setSelectedVideo(video)}
                >
                  <img
                    src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300 opacity-90 group-hover:opacity-100"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-stone-950/20 group-hover:bg-transparent transition flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg transform group-hover:scale-110 transition">
                      <Play className="w-5 h-5 fill-current ml-0.5" />
                    </div>
                  </div>
                  <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/80 text-white text-[10px] font-semibold">
                    YouTube
                  </span>
                </div>

                {/* Content */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-1 mb-1.5">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-stone-100 text-stone-600">
                        {video.category}
                      </span>
                      <span className="text-[10px] text-stone-400">{video.addedAt}</span>
                    </div>
                    <h3 className="font-bold text-stone-900 text-sm line-clamp-2 group-hover:text-red-700 transition">
                      {video.title}
                    </h3>
                    <p className="text-xs text-stone-500 line-clamp-2 mt-1.5">
                      {video.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                    <span className="truncate max-w-[150px]">Por: <strong>{video.author}</strong></span>
                    <button
                      onClick={() => setSelectedVideo(video)}
                      className="text-red-600 font-semibold hover:underline inline-flex items-center gap-1"
                    >
                      Ver
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-stone-300">
            <Youtube className="w-10 h-10 text-stone-300 mx-auto mb-2" />
            <p className="text-sm font-semibold text-stone-700">No se encontraron videos con ese filtro</p>
            <p className="text-xs text-stone-400 mt-1">Sé el primero en agregar un video sobre hidroponía en Paquisha</p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-xl text-xs font-semibold hover:bg-red-700 transition"
            >
              Agregar Video Ahora
            </button>
          </div>
        )}

      </div>

      {/* Video Player Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/80 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="relative w-full max-w-3xl bg-black rounded-2xl overflow-hidden shadow-2xl">
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/60 text-white hover:bg-black/90 transition"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="aspect-video w-full bg-black">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${selectedVideo.youtubeId}?autoplay=1&rel=0`}
                title={selectedVideo.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="p-4 bg-stone-900 text-white flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold truncate max-w-lg">{selectedVideo.title}</h4>
                <p className="text-xs text-stone-400">Publicado por {selectedVideo.author}</p>
              </div>
              <a
                href={selectedVideo.youtubeUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-xs text-stone-200 transition"
              >
                <span>Abrir en YouTube</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Add Video Form Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/60 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden">
            <div className="bg-stone-50 border-b border-stone-200 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Youtube className="w-5 h-5 text-red-600" />
                <h3 className="font-bold text-stone-900 text-sm">Colocar Nuevo Video de YouTube</h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-200 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateVideo} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Enlace de YouTube (URL) *
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://www.youtube.com/watch?v=... o https://youtu.be/..."
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:outline-hidden"
                />
                <span className="text-[11px] text-stone-400">Pega el link directo de cualquier video de YouTube</span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Título del Video *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Cosecha de Lechugas Hidropónicas en Paquisha"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Categoría</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:outline-hidden bg-white"
                  >
                    <option value="Proyecto Paquisha">Proyecto Paquisha</option>
                    <option value="Sistemas NFT">Sistemas NFT</option>
                    <option value="Raíz Flotante">Raíz Flotante</option>
                    <option value="Nutrición y pH">Nutrición y pH</option>
                    <option value="Automatización">Automatización</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Autor / Responsable</label>
                  <input
                    type="text"
                    placeholder="Tu nombre o curso"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Descripción Breve</label>
                <textarea
                  rows={2}
                  placeholder="De qué trata el video y qué aprendizaje aporta al huerto escolar..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:outline-hidden"
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
                  className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-semibold shadow-xs transition"
                >
                  Guardar Video
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </section>
  );
};
